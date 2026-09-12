const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const project = require('node:path').resolve(__dirname, '..');
const req = createRequire(project + '/package.json');
const ts = req('typescript');
const env = { RESEND_API_KEY: 'mock-key-never-used-external-' + '0'.repeat(32), CONTACT_FROM_EMAIL: 'KYUTE <noreply@kyute.jp>', MATERIAL_APPROVAL_SECRET: 'mock-secret-' + '1'.repeat(32), MATERIAL_SLACK_BOT_TOKEN: 'mock-bot', MATERIAL_SLACK_CHANNEL_ID: 'MOCK-KYUTE-CHANNEL' };
let calls = [], failure = '', logs = [];
const mockFetch = async (url, options) => {
  const body = JSON.parse(options.body);
  calls.push({ url, body, key: options.headers['Idempotency-Key'], signal: options.signal });
  if (failure === 'delivery' && body.tags?.[0].value === 'culture_material_delivery') return new Response('{}', { status: 500 });
  if (failure === 'notification' && body.tags?.[0].value === 'culture_material_notification') return new Response('{}', { status: 500 });
  if (url === 'https://slack.com/api/chat.postMessage') return Response.json(failure === 'slack' ? { ok: false, error: 'mock_failure' } : { ok: true });
  assert.equal(url, 'https://api.resend.com/emails', 'No unexpected network destinations');
  return Response.json({ id: 'mock-email' });
};
function load(file, imports = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, require: name => imports[name] || req(name), Request, Response, URL, Uint8Array, TextDecoder, TextEncoder, Buffer, AbortController, AbortSignal, setTimeout, clearTimeout, process: { env }, fetch: mockFetch, console: { error: (...args) => logs.push(args) } };
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const lib = load(project + '/app/api/material-request/lib.ts');
const culture = load(project + '/app/api/culture-material/route.ts', { '../material-request/lib': lib });
const documentary = load(project + '/app/api/material-request/route.ts', { './lib': lib });
const valid = { company: '検証株式会社 <安全>', name: 'テスト担当', email: 'test@example.com', website: '', consent: true, requestId: 'bf6f421a-7158-45fd-b793-a9ff6b1501f6' };
function request(payload = valid, extra = {}, route = 'culture-material') {
  return new Request('https://www.kyute.jp/api/' + route, { method: 'POST', headers: { origin: 'https://www.kyute.jp', 'content-type': 'application/json', ...extra }, body: typeof payload === 'string' ? payload : JSON.stringify(payload) });
}
let count = 0;
function pass(label) { count++; console.log('PASS: ' + label); }
(async () => {
  let response = await culture.POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, slackNotified: true });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[0].body.to, ['test@example.com']);
  assert.equal(calls[0].body.attachments[0].path, 'https://www.kyute.jp/culture-assets/kyute-culture-guide.pdf');
  assert.match(calls[0].body.html, /&lt;安全&gt;/);
  assert.equal(calls[1].body.to[0], 'contact@kyute.jp');
  assert.equal(calls[2].body.channel, 'MOCK-KYUTE-CHANNEL');
  assert.match(calls[2].body.text, /採用YouTube/);
  assert.ok(!calls.some(call => call.body.tags?.[0].value === 'schedule_followup'));
  const action = calls[2].body.blocks.find(block => block.type === 'actions').elements[0];
  const lead = lib.readApprovalToken(action.value);
  assert.equal(lead.service, 'culture');
  assert.equal(lead.email, valid.email);
  pass('PDF attachment + contact email + correct Slack notification, no automatic scheduling email');

  const firstMails = calls.slice(0, 2).map(({ body, key }) => ({ body, key }));
  calls = [];
  await culture.POST(request());
  assert.deepEqual(calls.slice(0, 2).map(({ body, key }) => ({ body, key })), firstMails);
  pass('Retry keeps stable delivery and internal-mail idempotency payloads');

  calls = [];
  await lib.sendScheduleEmail(lead);
  assert.equal(calls.length, 1);
  assert.match(calls[0].body.subject, /採用YouTube/);
  assert.match(calls[0].body.text, /企画・制作・運用/);
  assert.doesNotMatch(calls[0].body.text, /採用密着動画制作サービス/);
  assert.equal(calls[0].key, 'culture-schedule-' + valid.requestId);
  pass('Approved scheduling email stays specific to recruitment YouTube');

  const docLead = { company: valid.company, name: valid.name, email: valid.email, requestId: valid.requestId, expiresAt: Date.now() + 100000 };
  const docTemplate = lib.buildScheduleEmail(docLead);
  assert.equal(docTemplate.subject, '【KYUTE】採用密着動画のご相談｜日程調整のお願い');
  assert.match(docTemplate.text, /採用密着動画制作サービス/);
  assert.match(docTemplate.text, /密着動画の活用方法、制作の進め方、費用の目安/);
  assert.doesNotMatch(docTemplate.text, /採用YouTube/);
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
    const res = await culture.POST(request(body, headers));
    assert.equal(res.status, expected, label);
    assert.equal(calls.length, 0, label);
    pass(label + ' rejected without sending');
  }
  for (const setting of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'MATERIAL_SLACK_BOT_TOKEN', 'MATERIAL_SLACK_CHANNEL_ID']) {
    const saved = env[setting]; delete env[setting]; calls = [];
    assert.equal((await culture.POST(request())).status, 503);
    assert.equal(calls.length, 0);
    env[setting] = saved;
    pass('Missing ' + setting + ' does not fake success');
  }
  failure = 'delivery'; calls = [];
  assert.equal((await culture.POST(request())).status, 502);
  assert.equal(calls.length, 1);
  pass('Delivery failure does not announce PDF delivery');
  failure = 'slack'; calls = [];
  response = await culture.POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, slackNotified: false });
  assert.equal(calls.length, 3);
  assert.ok(logs.some(log => log[0].includes('Slack notification failed')));
  pass('Slack failure is logged while delivered PDF remains successful');
  failure = 'notification'; calls = [];
  response = await culture.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).slackNotified, true);
  assert.equal(calls.length, 3);
  pass('Internal email failure does not suppress Slack');
  console.log(count + ' checks passed. All fetch calls were mocked; no real emails or Slack posts.');
})().catch(error => { console.error(error); process.exitCode = 1; });
