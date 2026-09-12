const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const project = require('node:path').resolve(__dirname, '..');
const req = createRequire(project + '/package.json');
const ts = req('typescript');
const env = { RESEND_API_KEY: 'mock-key-never-used-external-' + '0'.repeat(32), CONTACT_FROM_EMAIL: 'KYUTE <noreply@kyute.jp>', MATERIAL_APPROVAL_SECRET: 'mock-secret-' + '1'.repeat(32), MATERIAL_SLACK_BOT_TOKEN: 'mock-bot', MATERIAL_SLACK_CHANNEL_ID: 'MOCK-KYUTE-CHANNEL' };
let calls = [], failure = '', logs = [];
const providerSeen = new Map();
const mockFetch = async (url, options) => {
  const body = JSON.parse(options.body);
  calls.push({ url, body, key: options.headers['Idempotency-Key'], signal: options.signal });
  if (failure === 'network') throw new Error('mock-network-error');
  if (url === 'https://api.resend.com/emails' && failure === '') {
    const key = options.headers['Idempotency-Key']; const payload = JSON.stringify(body);
    if (providerSeen.has(key) && providerSeen.get(key) !== payload) return new Response('{}', {status:409});
    providerSeen.set(key, payload);
  }
  if (failure === 'delivery' && body.tags?.[0].value === 'undo_job_material_delivery') return new Response('{}', { status: 500 });
  if ((failure === 'notification' || failure === 'both-notifications') && body.tags?.[0].value === 'undo_job_material_notification') return new Response('{}', { status: 500 });
  if (url === 'https://slack.com/api/chat.postMessage') return Response.json((failure === 'slack' || failure === 'both-notifications') ? { ok: false, error: 'mock_failure' } : { ok: true });
  assert.equal(url, 'https://api.resend.com/emails', 'No unexpected network destinations');
  return Response.json({ id: 'mock-email' });
};
function load(file, imports = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, require: name => imports[name] || req(name), Request, Response, URL, URLSearchParams, Uint8Array, TextDecoder, TextEncoder, Buffer, AbortController, AbortSignal, setTimeout, clearTimeout, process: { env }, fetch: mockFetch, console: { error: (...args) => logs.push(args) } };
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const lib = load(project + '/app/api/material-request/lib.ts');
const undoJob = load(project + '/app/api/undo-job-material/route.ts', { '../material-request/lib': lib });
const existingCulture = load(project + '/app/api/culture-material/route.ts', { '../material-request/lib': lib });
const approval = load(project + '/app/api/material-request/approve/route.ts', { '../lib': lib });
const slackApproval = load(project + '/app/api/slack/material-request/route.ts', { '../../material-request/lib': lib });
const documentary = load(project + '/app/api/material-request/route.ts', { './lib': lib });
const valid = { company: '検証株式会社 <安全>', name: 'テスト担当', email: 'test@example.com', website: '', consent: true, requestId: 'bf6f421a-7158-45fd-b793-a9ff6b1501f6' };
function request(payload = valid, extra = {}, route = 'undo-job-material') {
  return new Request('https://www.kyute.jp/api/' + route, { method: 'POST', headers: { origin: 'https://www.kyute.jp', 'content-type': 'application/json', ...extra }, body: typeof payload === 'string' ? payload : JSON.stringify(payload) });
}
let count = 0;
function pass(label) { count++; console.log('PASS: ' + label); }
(async () => {
  let response = await undoJob.POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, slackNotified: true });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[0].body.to, ['test@example.com']);
  assert.equal(calls[0].body.attachments[0].path, 'https://www.kyute.jp/undo-job-assets/undo-job-service-guide.pdf');
  assert.match(calls[0].body.html, /&lt;安全&gt;/);
  assert.equal(calls[1].body.to[0], 'contact@kyute.jp');
  assert.equal(calls[2].body.channel, 'MOCK-KYUTE-CHANNEL');
  assert.match(calls[2].body.text, /運動部のシゴト/);
  assert.ok(!calls.some(call => call.body.tags?.[0].value === 'schedule_followup'));
  const action = calls[2].body.blocks.find(block => block.type === 'actions').elements[0];
  const lead = lib.readApprovalToken(action.value);
  assert.equal(lead.service, 'undo-job');
  assert.equal(lead.email, valid.email);
  pass('PDF attachment + contact email + correct Slack notification, no automatic scheduling email');

  const firstMails = calls.slice(0, 2).map(({ body, key }) => ({ body, key }));
  calls = [];
  await undoJob.POST(request());
  assert.deepEqual(calls.slice(0, 2).map(({ body, key }) => ({ body, key })), firstMails);
  pass('Retry keeps stable delivery and internal-mail idempotency payloads');

  calls = [];
  await lib.sendScheduleEmail(lead);
  assert.equal(calls.length, 1);
  assert.match(calls[0].body.subject, /運動部のシゴト/);
  assert.match(calls[0].body.text, /企画・制作・掲載/);
  assert.doesNotMatch(calls[0].body.text, /採用密着動画制作サービス/);
  assert.equal(calls[0].key, 'undo-job-schedule-' + valid.requestId);
  pass('Approved scheduling email stays specific to 運動部のシゴト。');

  const docLead = { company: valid.company, name: valid.name, email: valid.email, requestId: valid.requestId, expiresAt: Date.now() + 100000 };
  const docTemplate = lib.buildScheduleEmail(docLead);
  assert.equal(docTemplate.subject, '【KYUTE】採用密着動画のご相談｜日程調整のお願い');
  assert.match(docTemplate.text, /採用密着動画制作サービス/);
  assert.match(docTemplate.text, /密着動画の活用方法、制作の進め方、費用の目安/);
  assert.doesNotMatch(docTemplate.text, /運動部のシゴト/);
  calls = [];
  const docResponse = await documentary.POST(request(valid, {}, 'material-request'));
  assert.equal(docResponse.status, 200);
  assert.equal(calls[0].body.attachments[0].path, 'https://www.kyute.jp/lp-assets/service-guide-v10.pdf');
  assert.match(calls[2].body.text, /採用密着動画LP/);
  assert.equal(calls[0].key, 'material-' + valid.requestId);
  pass('Existing documentary request, PDF, notification and scheduling templates unchanged');

  const invalid = [
    ['missing company', { ...valid, company: '' }, {}, 400],
    ['missing name', { ...valid, name: '' }, {}, 400],
    ['invalid email', { ...valid, email: 'bad' }, {}, 400],
    ['missing consent', { ...valid, consent: false }, {}, 400],
    ['honeypot', { ...valid, website: 'bot' }, {}, 400],
    ['long company', { ...valid, company: 'x'.repeat(121) }, {}, 400],
    ['control characters', { ...valid, name: 'A\r\nB' }, {}, 400],
    ['missing request id', { ...valid, requestId: '' }, {}, 400],
    ['invalid request id', { ...valid, requestId: '-'.repeat(36) }, {}, 400],
    ['cross origin', valid, { origin: 'https://evil.example' }, 403],
    ['cross site', valid, { 'sec-fetch-site': 'cross-site' }, 403],
    ['missing origin', valid, { origin: '' }, 403],
    ['wrong content type', valid, { 'content-type': 'text/plain' }, 415],
    ['oversized declared body', valid, { 'content-length': '4097' }, 413],
    ['oversized streamed body', { ...valid, company: 'あ'.repeat(4096) }, {}, 413],
    ['array JSON', [], {}, 400], ['null JSON', null, {}, 400], ['malformed JSON', '{', {}, 400],
  ];
  for (const [label, body, headers, expected] of invalid) {
    calls = [];
    const res = await undoJob.POST(request(body, headers));
    assert.equal(res.status, expected, label);
    assert.equal(calls.length, 0, label);
    pass(label + ' rejected without sending');
  }
  const originCases = [
    ['loopback alias 127 to localhost', 'http://localhost:4323', 'http://127.0.0.1:4323', '', 200],
    ['loopback alias localhost to 127', 'http://127.0.0.1:4323', 'http://localhost:4323', '', 200],
    ['different loopback port', 'http://localhost:4323', 'http://127.0.0.1:4324', '', 403],
    ['loopback alias marked cross-site', 'http://localhost:4323', 'http://127.0.0.1:4323', 'cross-site', 403],
    ['other local host', 'http://localhost:4323', 'http://example.test:4323', '', 403],
    ['local origin to production', 'https://www.kyute.jp', 'http://localhost', '', 403],
    ['different production host', 'https://www.kyute.jp', 'https://kyute.jp', '', 403],
    ['HTTPS loopback aliases', 'https://localhost:4323', 'https://127.0.0.1:4323', '', 403],
    ['loopback origin with path', 'http://localhost:4323', 'http://127.0.0.1:4323/path', '', 403],
    ['malformed origin', 'http://localhost:4323', 'null', '', 403],
  ];
  for (const [label, target, origin, site, expected] of originCases) {
    calls = [];
    response = await undoJob.POST(new Request(target + '/api/undo-job-material', {method:'POST',headers:{origin,'content-type':'application/json','sec-fetch-site':site},body:JSON.stringify(valid)}));
    assert.equal(response.status, expected, label);
    assert.equal(calls.length, expected === 200 ? 3 : 0, label);
    pass(label + (expected === 200 ? ' permitted with mocked delivery' : ' rejected without sending'));
  }
  for (const setting of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'MATERIAL_SLACK_BOT_TOKEN', 'MATERIAL_SLACK_CHANNEL_ID']) {
    const saved = env[setting]; delete env[setting]; calls = [];
    assert.equal((await undoJob.POST(request())).status, 503);
    assert.equal(calls.length, 0);
    env[setting] = saved;
    pass('Missing ' + setting + ' does not fake success');
  }
  failure = 'delivery'; calls = [];
  assert.equal((await undoJob.POST(request())).status, 502);
  assert.equal(calls.length, 1);
  pass('Delivery failure does not announce PDF delivery');
  failure = 'slack'; calls = [];
  response = await undoJob.POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, slackNotified: false });
  assert.equal(calls.length, 3);
  assert.ok(logs.some(log => log[0].includes('Slack notification failed')));
  pass('Slack failure is logged while delivered PDF remains successful');
  failure = 'notification'; calls = [];
  response = await undoJob.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).slackNotified, true);
  assert.equal(calls.length, 3);
  pass('Internal email failure does not suppress Slack');
  failure = 'both-notifications'; calls = [];
  response = await undoJob.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 3);
  pass('Both notification failures never ask visitor to resend delivered PDF');

  failure = 'network'; calls = [];
  assert.equal((await undoJob.POST(request())).status, 502);
  assert.equal(calls.length, 1);
  pass('Uncertain delivery has no false-success notification');

  failure = ''; calls = [];
  assert.equal((await undoJob.POST(request())).status, 200);
  const stablePayload = JSON.stringify(calls[0].body);
  calls = [];
  assert.equal((await undoJob.POST(request({...valid, company:'Changed', requestId:valid.requestId}))).status, 502);
  assert.equal(calls.length, 1);
  pass('Provider idempotency conflict cannot trigger notifications or false delivery claim');
  calls = [];
  assert.equal((await undoJob.POST(request({...valid, company:'Changed', requestId:'ccddccdd-7158-45fd-b793-a9ff6b1501f6'}))).status, 200);
  assert.notEqual(JSON.stringify(calls[0].body), stablePayload);
  pass('Changed payload with new request id sends correct new request');

  calls = [];
  assert.equal((await existingCulture.POST(request(valid, {}, 'culture-material'))).status, 200);
  assert.equal(calls[0].body.attachments[0].path, 'https://www.kyute.jp/culture-assets/kyute-culture-guide.pdf');
  assert.match(calls[2].body.text, /採用YouTube/);
  const cultureAction = calls[2].body.blocks.find(block => block.type === 'actions').elements[0];
  const cultureLead = lib.readApprovalToken(cultureAction.value);
  calls = [];
  await lib.sendScheduleEmail(cultureLead);
  assert.equal(calls[0].key, 'culture-schedule-' + valid.requestId);
  assert.match(calls[0].body.subject, /採用YouTube/);
  assert.match(calls[0].body.text, /企画・制作・運用/);
  pass('Culture route, PDF, Slack service and approved scheduling remain unchanged');

  calls = [];
  await lib.sendScheduleEmail(docLead);
  assert.equal(calls[0].key, 'schedule-' + valid.requestId);
  assert.match(calls[0].body.subject, /採用密着動画/);
  pass('Documentary scheduling idempotency key unchanged');
  calls = [];
  const approvalRequest = new Request('https://www.kyute.jp/api/material-request/approve?token=' + encodeURIComponent(action.value));
  response = await approval.GET(approvalRequest);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /運動部のシゴト/);
  assert.equal(calls.length, 0);
  const confirm = () => new Request('https://www.kyute.jp/api/material-request/approve', {method:'POST',body:new URLSearchParams({token:action.value})});
  response = await approval.POST(confirm());
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].key, 'undo-job-schedule-' + valid.requestId);
  const approvedMessage = JSON.stringify(calls[0].body);
  response = await approval.POST(confirm());
  assert.equal(response.status, 200);
  assert.equal(JSON.stringify(calls[1].body), approvedMessage);
  assert.equal(calls[1].key, calls[0].key);
  pass('Existing approval GET previews without sending; confirmed POST/retry use undo-job template and stable key');

  calls = [];
  env.MATERIAL_SLACK_SIGNING_SECRET = 'mock-signature-secret';
  const timestamp = String(Math.floor(Date.now()/1000));
  const rawBody = new URLSearchParams({payload:JSON.stringify({actions:[{action_id:'send_schedule_followup', value:action.value}]})}).toString();
  const signature = 'v0=' + req('node:crypto').createHmac('sha256',env.MATERIAL_SLACK_SIGNING_SECRET).update('v0:' + timestamp + ':' + rawBody).digest('hex');
  const slackRequest = signatureValue => new Request('https://www.kyute.jp/api/slack/material-request',{method:'POST', headers:{'x-slack-request-timestamp':timestamp,'x-slack-signature':signatureValue},body:rawBody});
  assert.equal((await slackApproval.POST(slackRequest('bad'))).status,401);
  assert.equal(calls.length,0);
  assert.equal((await slackApproval.POST(slackRequest(signature))).status,200);
  assert.equal(calls.length,1);
  assert.equal(calls[0].key,'undo-job-schedule-' + valid.requestId);
  assert.match(calls[0].body.subject,/運動部のシゴト/);
  pass('Existing signed Slack approval sends correct service; invalid signatures never send');
  console.log(count + ' checks passed. All fetch calls were mocked; no real emails or Slack posts.');
})().catch(error => { console.error(error); process.exitCode = 1; });
