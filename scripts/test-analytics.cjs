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
    exports: {}, URL, Event, window: windowMock,
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
  ['/analytics?email=private@example.com', '/', '/analytics'],
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
  const savedChoices = new Map();
  const consentListeners = new Map();
  const cookieDeletes = [];
  let storageWriteFails = false, storageReadFails = false;
  windowMock.localStorage = {
    getItem(key) { if (storageReadFails) throw new Error('blocked'); return savedChoices.get(key) ?? null; },
    setItem(key, value) { if (storageWriteFails) throw new Error('blocked'); savedChoices.set(key, value); },
    removeItem(key) { savedChoices.delete(key); },
  };
  windowMock.addEventListener = (name, listener) => {
    if (!consentListeners.has(name)) consentListeners.set(name, new Set());
    consentListeners.get(name).add(listener);
  };
  windowMock.removeEventListener = (name, listener) => consentListeners.get(name)?.delete(listener);
  windowMock.dispatchEvent = (event) => { for (const listener of consentListeners.get(event.type) ?? []) listener(event); return true; };
  const googleAnalytics = load('lib/analytics.ts', {
    '@vercel/analytics': { track() { throw new Error('Mock Vercel unavailable'); } },
  }, {
    document: {
      referrer: 'https://www.google.com/search?q=private@example.com#name',
      get cookie() { return '_ga=mock-client; _ga_TEST123456=mock-session; unrelated=keep'; },
      set cookie(value) { cookieDeletes.push(value); },
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

  googleAnalytics.initializeGoogleAnalytics(mockId, '/');
  assert.equal(scripts.length, 0);
  assert.equal(windowMock.dataLayer, undefined);
  assert.equal(googleAnalytics.readAnalyticsConsent(), null);
  googleAnalytics.setAnalyticsConsent('denied');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/');
  assert.equal(scripts.length, 0);
  assert.equal(windowMock.dataLayer, undefined);
  assert.equal(windowMock[`ga-disable-${mockId}`], true);
  assert.equal(googleAnalytics.readAnalyticsConsent(), 'denied');
  assert.equal(googleAnalytics.setAnalyticsConsent('granted'), true);
  pass('Unselected or denied consent installs no script and queues no Google commands; explicit grant is persisted first');

  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact?email=private@example.com#name');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact');
  assert.equal(scripts.length, 1);
  let commands = windowMock.dataLayer.map(item => Array.from(item));
  assert.equal(commands.filter(command => command[0] === 'config').length, 1);
  const config = commands.find(command => command[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  const consent = commands.find(command => command[0] === 'consent')[2];
  assert.equal(consent.analytics_storage, 'granted');
  for (const key of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.equal(consent[key], 'denied');
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
  const eventsBeforeRevocation = commands.filter(command => command[0] === 'event').length;
  googleAnalytics.setAnalyticsConsent('denied');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact');
  googleAnalytics.trackMaterialRequestSuccess('/api/culture-material', '/download');
  assert.equal(windowMock[`ga-disable-${mockId}`], true);
  assert.equal(windowMock.kyuteAnalytics.active, false);
  assert.equal(windowMock.dataLayer.filter(command => command[0] === 'event').length, eventsBeforeRevocation);
  assert.ok(cookieDeletes.some(value => value.startsWith('_ga=') && value.includes('Max-Age=0')));
  assert.ok(cookieDeletes.some(value => value.startsWith('_ga_TEST123456=') && value.includes('domain=kyute.jp')));
  assert.ok(cookieDeletes.every(value => !value.startsWith('unrelated=')));
  googleAnalytics.setAnalyticsConsent('granted');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/contact');
  assert.equal(windowMock[`ga-disable-${mockId}`], false);
  assert.equal(scripts.length, 1);
  const resumedConfig = windowMock.dataLayer.filter(command => command[0] === 'config').at(-1)[2];
  assert.equal(resumedConfig.page_location, 'https://www.kyute.jp/contact');
  assert.equal(resumedConfig.send_page_view, false);
  assert.equal(windowMock.dataLayer.filter(command => command[0] === 'event').length, eventsBeforeRevocation + 1);
  pass('Revocation stops custom and automatic Google collection, deletes only GA cookies, and regrant reuses one script with one pageview');

  let notified = 0;
  const unsubscribe = googleAnalytics.subscribeAnalyticsConsent(() => notified++);
  savedChoices.set(googleAnalytics.ANALYTICS_CONSENT_KEY, 'denied');
  windowMock.dispatchEvent({ type: 'storage', key: googleAnalytics.ANALYTICS_CONSENT_KEY });
  assert.equal(notified, 1);
  assert.equal(windowMock[`ga-disable-${mockId}`], true);
  assert.equal(windowMock.kyuteAnalytics.active, false);
  savedChoices.delete(googleAnalytics.ANALYTICS_CONSENT_KEY);
  windowMock.dispatchEvent({ type: 'storage', key: null });
  assert.equal(googleAnalytics.readAnalyticsConsent(), null);
  unsubscribe();
  assert.ok([...consentListeners.values()].every(set => set.size === 0));
  pass('Other-tab denial or storage clearing stops measurement, and preference subscriptions clean up');

  googleAnalytics.setAnalyticsConsent('granted');
  googleAnalytics.initializeGoogleAnalytics(mockId, '/');
  storageReadFails = true;
  const beforeFailure = windowMock.dataLayer.length;
  googleAnalytics.trackMaterialRequestSuccess('/api/culture-material', '/download');
  assert.equal(windowMock.dataLayer.length, beforeFailure);
  assert.equal(windowMock[`ga-disable-${mockId}`], true);
  storageReadFails = false;
  storageWriteFails = true;
  assert.equal(googleAnalytics.setAnalyticsConsent('granted'), false);
  googleAnalytics.initializeGoogleAnalytics(mockId, '/download');
  assert.equal(windowMock.dataLayer.length, beforeFailure);
  assert.equal(googleAnalytics.readAnalyticsConsent(), null);
  assert.equal(windowMock[`ga-disable-${mockId}`], true);
  storageWriteFails = false;
  assert.equal(googleAnalytics.setAnalyticsConsent('denied'), true);
  pass('Storage read or write failures fail closed and cannot leave an earlier grant collecting events');
  const component = (id, hydrate = false) => {
    const jsx = (type, props) => ({ type, props });
    return load('components/analytics/GoogleAnalytics.tsx', {
      react: {
        useEffect(effect) { effect(); }, useState(initial) { return [initial, () => {}]; },
        useSyncExternalStore(_subscribe, getSnapshot, getServerSnapshot) { return hydrate ? getServerSnapshot() : getSnapshot(); },
      },
      'react/jsx-runtime': { jsx, jsxs: jsx }, 'next/link': { default: 'link' },
      'next/navigation': { usePathname: () => '/download' }, '@/lib/analytics': googleAnalytics,
    }, { process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: id } } });
  };
  googleAnalytics.setAnalyticsConsent('granted');
  const cookiesBeforeHydration = cookieDeletes.length;
  component(mockId, true).GoogleAnalytics();
  assert.equal(cookieDeletes.length, cookiesBeforeHydration);
  assert.equal(windowMock.kyuteAnalytics.active, true);
  assert.equal(component(mockId).GoogleAnalytics(), null);
  googleAnalytics.setAnalyticsConsent('denied');
  assert.equal(component(mockId).GoogleAnalytics(), null);
  savedChoices.delete(googleAnalytics.ANALYTICS_CONSENT_KEY);
  assert.equal(component(mockId).GoogleAnalytics().type, 'aside');
  assert.equal(component(undefined).GoogleAnalytics(), null);
  windowMock.location.hostname = 'preview.vercel.app';
  assert.equal(component(mockId).GoogleAnalytics(), null);
  pass('Hydration preserves a stored grant; the choice panel appears only with a real production ID and no saved choice');
  const hasSettingsLink = (node) => {
    if (!node || typeof node !== 'object') return false;
    if (node.props?.href === '/analytics') return true;
    const children = node.props?.children;
    return (Array.isArray(children) ? children : [children]).some(hasSettingsLink);
  };
  for (const route of ['/lp', '/lp/day-in-the-life', '/lp/undo-job', '/lp/recruit-video', '/lp/recruit-youtube']) {
    const jsx = (type, props) => ({ type, props });
    const chrome = load('components/SiteChrome.tsx', {
      'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
      'next/navigation': { usePathname: () => route }, 'next/link': { default: 'link' },
      '@/components/site/Header': { Header: 'header' }, '@/components/site/Footer': { Footer: 'footer', MobileBar: 'mobile-bar' },
      '@/components/analytics/SiteCtaTracker': { SiteCtaTracker: 'tracker' },
    });
    assert.equal(hasSettingsLink(chrome.SiteChrome({ children: 'LP content' })), true, route);
  }
  pass('All React LPs retain an in-flow analytics settings link independently of the dismissed consent panel');
  console.log(`${checks} analytics checks passed (all transports mocked).`);
})().catch(error => { console.error(error); process.exitCode = 1; });
