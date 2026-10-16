// Runs real tracking/component code in a VM with mocked analytics and fetch.
// No analytics, email, Slack, or Google Forms requests leave this process.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let events = [], throwAnalytics = false;
const windowMock = { location: { pathname: '/service/recruit-video' } };
function load(file, imports = {}, globals = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const context = {
    exports: {}, URL, window: windowMock,
    require(name) { if (name in imports) return imports[name]; throw new Error('Unexpected import: ' + name); },
    ...globals,
  };
  vm.runInNewContext(compiled, context, { filename: file });
  return context.exports;
}
const analytics = load('lib/analytics.ts', {
  '@vercel/analytics': { track(name, properties) {
    if (throwAnalytics) throw new Error('Mock analytics unavailable');
    events.push(JSON.parse(JSON.stringify({ name, properties })));
  } },
});
let checks = 0;
function pass(label) { checks++; console.log('PASS: ' + label); }

for (const [value, base, expected] of [
  ['/contact?email=private@example.com#name', '/', '/contact'],
  ['#download', '/service/recruit-video', '/service/recruit-video'],
  ['https://www.kyute.jp/service/recruit-youtube?name=private#download', '/', '/service/recruit-youtube'],
  ['/column/cost-guide/', '/', '/column/cost-guide'],
  ['/column/category/recruit-youtube', '/', '/column/category/recruit-youtube'],
  ['https://outside.example.com/private?email=private', '/', ''],
  ['mailto:private@example.com', '/', ''],
  ['javascript:alert(1)', '/', ''],
  ['//outside.example.com/contact', '/', ''],
  ['/api/material-request/approve?token=private', '/', ''],
  ['/contact/private@example.com', '/', ''],
  ['/column/private%40example.com', '/', ''],
  ['/unknown/private', '/', ''],
]) assert.equal(analytics.analyticsPath(value, base), expected, value);
pass('Only public paths survive; query, fragment, external URLs, API and personal path forms are dropped');

assert.equal(analytics.redactAnalyticsUrl({ type: 'pageview', url: 'https://www.kyute.jp/contact?email=private#name' }).url, 'https://www.kyute.jp/contact');
assert.equal(analytics.redactAnalyticsUrl({ type: 'event', url: 'https://www.kyute.jp/api/material-request/approve?token=private' }), null);
assert.equal(analytics.redactAnalyticsUrl({ type: 'event', url: 'not-a-url' }), null);
pass('Transport URL redaction removes query/hash and excludes non-public pages');

const columnInput = { path: '/column/cost-guide', href: '/service/recruit-video?email=private#price', cta: 'column-inline-price-recruit-video' };
assert.equal(analytics.ctaEvent(columnInput), null);
analytics.sendAnalyticsEvent(analytics.ctaEvent({ ...columnInput, column: { slug: 'cost-guide', service: 'recruit-video' } }));
assert.deepEqual(events, [{ name: 'column_cta_click', properties: {
  slug: 'cost-guide', service: 'recruit-video', cta: 'column-inline-price-recruit-video', position: 'inline', href: '/service/recruit-video',
} }]);
assert.equal(analytics.ctaEvent({ ...columnInput, path: '/', cta: 'private@example.com' }), null);
assert.equal(analytics.ctaEvent({ path: '/', href: '', cta: 'contact-form' }), null);
pass('Existing column contract retained with safe href, exclusive event ownership and no wrapper-form false click');

events = [];
const listeners = new Set();
const cleanups = [];
class MockElement {
  constructor(cta, href) { this.dataset = { cta }; this.href = href; }
  closest(selector) { assert.equal(selector, 'a[data-cta]'); return this; }
  getAttribute(name) { return name === 'href' ? this.href : null; }
}
const trackerGlobals = {
  Element: MockElement,
  document: { addEventListener(name, fn) { assert.equal(name, 'click'); listeners.add(fn); }, removeEventListener(_name, fn) { listeners.delete(fn); } },
};
const trackerImports = { react: { useEffect(effect) { cleanups.push(effect()); } }, '@/lib/analytics': analytics };
load('components/analytics/SiteCtaTracker.tsx', trackerImports, trackerGlobals).SiteCtaTracker();
load('components/column/CtaTracker.tsx', trackerImports, trackerGlobals).ColumnCtaTracker({ slug: 'cost-guide', service: 'recruit-video' });
windowMock.location.pathname = '/column/cost-guide';
for (const listener of listeners) listener({ target: new MockElement('header-download', '/download?email=private#name') });
assert.equal(events.length, 1);
assert.equal(events[0].name, 'column_cta_click');
for (const cleanup of cleanups.splice(0)) cleanup();
assert.equal(listeners.size, 0);
load('components/analytics/SiteCtaTracker.tsx', trackerImports, trackerGlobals).SiteCtaTracker();
windowMock.location.pathname = '/service/recruit-video';
for (const listener of listeners) listener({ target: null });
for (const listener of listeners) listener({ target: new MockElement('video-fv-download', '#download') });
assert.equal(events.length, 2);
assert.deepEqual(events[1], { name: 'site_cta_click', properties: { path: '/service/recruit-video', cta: 'video-fv-download', position: 'body', href: '/service/recruit-video', service: 'recruit-video' } });
for (const cleanup of cleanups) cleanup();
pass('Mounted article + site listeners emit once, tolerate non-elements and clean up on unmount');

function formHarness({ response = { ok: true, body: { ok: true } }, valid = true, deferred = false, endpoint = '/api/material-request' } = {}) {
  const state = [], refs = [];
  let calls = [], release;
  const jsx = (type, props) => ({ type, props });
  const fixture = { company: 'PRIVATE COMPANY', name: 'PRIVATE NAME', email: 'private@example.com', website: '', consent: 'on' };
  const formModule = load('components/site/MaterialForm.tsx', {
    react: {
      useState(initial) { const index = state.length; state.push(initial); return [initial, (value) => { state[index] = value; }]; },
      useRef(initial) { const ref = { current: initial }; refs.push(ref); return ref; },
      useId: () => 'mock-form', useEffect: () => {},
    },
    'react/jsx-runtime': { jsx, jsxs: jsx },
    '@/lib/analytics': analytics,
  }, {
    crypto: { randomUUID: () => 'mock-request-uuid-never-in-analytics' },
    FormData: class { get(key) { return fixture[key]; } },
    AbortSignal: { timeout: () => ({}) },
    fetch: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      if (deferred) await new Promise(resolve => { release = resolve; });
      if (response instanceof Error) throw response;
      return { ok: response.ok, json: async () => response.body };
    },
  });
  const rendered = formModule.MaterialForm({ endpoint, service: '採用動画制作' });
  const submit = () => rendered.props.onSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => valid } });
  return { submit, state, calls, release: () => release() };
}

(async () => {
  events = [];
  windowMock.location.pathname = '/service/recruit-video';
  const form = formHarness({ deferred: true });
  const first = form.submit();
  await form.submit();
  assert.equal(form.calls.length, 1);
  assert.equal(events.length, 0);
  form.release();
  await first;
  assert.equal(form.state[0], 'done');
  assert.deepEqual(events, [{ name: 'material_request_success', properties: { path: '/service/recruit-video', service: 'recruit-video', form_id: 'material-request' } }]);
  assert.equal(JSON.stringify(events).includes('private'), false);
  assert.equal(JSON.stringify(events).includes('uuid'), false);
  pass('Material success fires only after confirmed response; simultaneous submit is locked and payload has no form data or request ID');

  events = [];
  for (const response of [{ ok: false, body: { ok: false } }, { ok: true, body: {} }, new Error('mock network failure')]) {
    const failed = formHarness({ response });
    await failed.submit();
    assert.equal(failed.state[0], 'idle');
  }
  const invalid = formHarness({ valid: false });
  await invalid.submit();
  assert.equal(invalid.calls.length, 0);
  assert.equal(events.length, 0);
  pass('Validation errors, HTTP errors, malformed success and network failures never count as conversions');

  const dedup = formHarness();
  await dedup.submit();
  await dedup.submit(); // Deliberately exercise a stale handler with the same idempotency key.
  assert.equal(events.length, 1);
  assert.equal(dedup.calls[0].body.requestId, dedup.calls[1].body.requestId);
  pass('Retry success for the same in-memory form attempt emits only once');

  events = [];
  windowMock.location.pathname = '/download';
  await formHarness({ endpoint: '/api/culture-material' }).submit();
  assert.equal(events[0].properties.service, 'recruit-youtube');
  assert.equal(events[0].properties.form_id, 'culture-material');
  throwAnalytics = true;
  const unavailable = formHarness();
  await unavailable.submit();
  assert.equal(unavailable.state[0], 'done');
  assert.equal(unavailable.state[1], '');
  pass('Both form services are distinguished and analytics failures cannot break successful submissions');

  const scripts = [];
  const googleAnalytics = load('lib/analytics.ts', {
    '@vercel/analytics': { track() { throw new Error('Mock Vercel unavailable'); } },
  }, {
    document: {
      referrer: 'https://www.google.com/search?q=private@example.com#name',
      createElement(tag) { assert.equal(tag, 'script'); return {}; },
      head: { appendChild(script) { scripts.push(script); } },
    },
  });
  // This ID is a mock used only in this VM; no script can load in this test.
  const mockId = 'G-TEST123456';
  windowMock.location.hostname = 'www.kyute.jp';
  googleAnalytics.initializeGoogleAnalytics(undefined, '/');
  googleAnalytics.initializeGoogleAnalytics('G-bad-input', '/');
  assert.equal(scripts.length, 0);
  windowMock.location.hostname = 'preview.vercel.app';
  googleAnalytics.initializeGoogleAnalytics(mockId, '/');
  assert.equal(scripts.length, 0);
  windowMock.location.hostname = 'www.kyute.jp';
  googleAnalytics.initializeGoogleAnalytics(mockId, '/api/material-request/approve');
  assert.equal(scripts.length, 0);
  pass('GA4 stays fully disabled without a valid ID, on preview/local hosts and on non-public routes');

  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact?email=private@example.com#name');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact');
  assert.equal(scripts.length, 1);
  let commands = windowMock.dataLayer.map(item => Array.from(item));
  assert.equal(commands.filter(command => command[0] === 'config').length, 1);
  const config = commands.find(command => command[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.page_referrer, 'https://www.google.com');
  assert.equal(config.page_location, 'https://www.kyute.jp/contact');
  assert.equal(commands.filter(command => command[1] === 'page_view').length, 1);
  googleAnalytics.initializeGoogleAnalytics(mockId, '/download');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/download#form');
  commands = windowMock.dataLayer.map(item => Array.from(item));
  assert.equal(commands.filter(command => command[1] === 'page_view').length, 2);
  assert.equal(JSON.stringify(commands).includes('private'), false);
  pass('GA4 loads once, disables automatic config pageviews/ads, emits one view per pathname and strips referrer/query/hash');

  windowMock.location.pathname = '/download';
  googleAnalytics.trackMaterialRequestSuccess('/api/culture-material', '/download');
  commands = windowMock.dataLayer.map(item => Array.from(item));
  const leadCommands = commands.filter(command => command[1] === 'generate_lead');
  assert.equal(leadCommands.length, 1);
  assert.equal(leadCommands[0][2].form_id, 'culture-material');
  assert.equal(leadCommands[0][2].send_to, mockId);
  assert.equal(commands.filter(command => command[1] === 'material_request_success').length, 0);
  assert.equal(JSON.stringify(leadCommands).includes('private'), false);
  pass('GA4 maps a successful request to one generate_lead even when the Vercel sink fails');
  console.log(`${checks} analytics checks passed (all transports mocked).`);
})().catch(error => { console.error(error); process.exitCode = 1; });
