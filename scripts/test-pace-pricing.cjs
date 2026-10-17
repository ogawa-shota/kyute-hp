// Exercise the shipped simulator script without a browser or external requests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '../public/pace/index.html'), 'utf8');
const source = html.match(/const plans = \{[\s\S]*?(?=\s*const revealObserver =)/)?.[0];
assert.ok(source, 'The actual PACE simulator script must be present');

function attributes(tag) {
  return Object.fromEntries(Array.from(tag.matchAll(/([\w-]+)="([^"]*)"/g), match => [match[1], match[2]]));
}

class Element {
  constructor() {
    this.textContent = '';
    this.hidden = false;
    this.value = '';
    this.listeners = new Map();
    this.classes = new Set();
    this.children = new Map();
    this.style = { setProperty(name, value) { this[name] = value; } };
    this.classList = {
      add: name => this.classes.add(name),
      remove: name => this.classes.delete(name),
      contains: name => this.classes.has(name),
      toggle: (name, force = !this.classes.has(name)) => {
        if (force) this.classes.add(name);
        else this.classes.delete(name);
        return force;
      },
    };
  }
  set innerHTML(markup) {
    this.options = Array.from(markup.matchAll(/<option\b([^>]*)>([^<]*)<\/option>/g), match => ({
      value: attributes(match[1]).value,
      textContent: match[2],
      selected: /\bselected\b/.test(match[1]),
    }));
    this.value = (this.options.find(option => option.selected) || this.options[0])?.value || '';
  }
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }
  dispatch(type) {
    assert.ok(this.listeners.has(type), `A ${type} listener must be bound`);
    this.listeners.get(type).forEach(listener => listener({ target: this }));
  }
  querySelector(selector) {
    assert.ok(['small', 'span'].includes(selector), `Unexpected child selector: ${selector}`);
    if (!this.children.has(selector)) this.children.set(selector, new Element());
    return this.children.get(selector);
  }
}

const elements = new Map(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => [match[1], new Element()]));
const get = id => {
  assert.ok(elements.has(id), `Required element #${id} must exist in the actual HTML`);
  return elements.get(id);
};
get('interviewCount').innerHTML = html.match(/<select\b[^>]*id="interviewCount"[^>]*>([\s\S]*?)<\/select>/)?.[1] || '';

const inputs = Array.from(html.matchAll(/<input\b[^>]*>/g), match => ({ tag: match[0], attrs: attributes(match[0]) }))
  .filter(({ attrs }) => attrs.name === 'scopePlan')
  .map(({ tag, attrs }) => Object.assign(new Element(), { value: attrs.value, checked: /\bchecked\b/.test(tag) }));
assert.deepEqual(inputs.map(input => input.value), ['standard', 'plus', 'complete']);
const cards = inputs.map(input => Object.assign(new Element(), { contains: candidate => input === candidate }));
const windowMock = new Element();
vm.runInNewContext(source, {
  document: {
    getElementById: get,
    querySelector(selector) {
      assert.equal(selector, 'input[name="scopePlan"]:checked');
      return inputs.find(input => input.checked);
    },
    querySelectorAll(selector) {
      if (selector === 'input[name="scopePlan"]') return inputs;
      if (selector === '.sim-option') return cards;
      throw new Error(`Unexpected selector: ${selector}`);
    },
  },
  window: windowMock,
  requestAnimationFrame: callback => callback(),
}, { filename: 'public/pace/index.html (simulator)', timeout: 1000 });

const counts = [10, 20, 30, 40, 51];
const bands = ['0〜10名', '11〜20名', '21〜30名', '31〜50名', '51名以上'];
assert.deepEqual(get('interviewCount').options.map(option => Number(option.value)), counts);
assert.deepEqual(get('interviewCount').options.map(option => option.textContent), bands);

// Independent numeric fixtures preserve the existing internal-effort assumptions.
const fixtures = {
  standard: { fee: 49800, name: '選考まるごとプラン', hours: [32.5, 60, 87.5, 115, 145.25], costs: [113750, 210000, 306250, 402500, 508375] },
  plus: { fee: 79800, name: 'スカウト対応付きプラン', hours: [45.5, 78, 110.5, 143, 178.75], costs: [159250, 273000, 386750, 500500, 625625] },
  complete: { fee: 99800, name: 'エージェント対応付きプラン', hours: [56.5, 94, 131.5, 169, 210.25], costs: [197750, 329000, 460250, 591500, 735875] },
};
const number = id => Number(get(id).textContent.replace(/[^\d.-]/g, ''));
const display = value => value.toLocaleString('ja-JP');
let checks = 0;

function verify(plan, index) {
  const expected = fixtures[plan];
  const context = `${plan} / ${counts[index]} interview reference`;
  assert.equal(number('simPrice'), expected.fee, `${context}: fixed monthly fee`);
  assert.equal(get('simUnit').textContent, '円 / 月', context);
  assert.equal(number('internalCostTotal'), expected.costs[index], `${context}: internal cost changes`);
  assert.equal(get('hoursSummary').textContent, `内製工数の目安 ${display(expected.hours[index])}時間 / 月`, context);
  assert.equal(number('savingAmount'), expected.costs[index] - expected.fee, `${context}: difference updates`);
  assert.ok(get('simPlan').textContent.includes(expected.name), context);
  assert.ok(get('simPlan').textContent.includes(bands[index]), context);
  assert.ok(get('simPlan').textContent.includes(String(counts[index])), `${context}: reference count disclosed`);
  assert.ok(get('simCaution').textContent.includes(String(counts[index])), `${context}: reference assumption disclosed`);
  assert.ok(!/個別見積|個別試算/.test(get('simPrice').textContent + get('hoursSummary').textContent + get('savingAmount').textContent), context);
  assert.equal(get('costComparison').classList.contains('is-over'), false, `${context}: chart remains visible`);
  assert.equal(get('savingBubble').classList.contains('is-negative'), false, context);
  assert.equal(get('savingBubble').querySelector('small').textContent, '月額', context);
  assert.equal(get('savingBubble').querySelector('span').textContent, '円の差額目安', context);
  assert.equal(get('savingRate').textContent, `内製試算比 約${Math.round((expected.costs[index] - expected.fee) / expected.costs[index] * 100)}%`, context);
  assert.equal(Number(get('internalStack').style['--internal-ratio']), 1, context);
  assert.equal(Number(get('paceStack').style['--pace-ratio']), expected.fee / expected.costs[index], context);
  for (const key of ['candidate', 'admin']) assert.equal(get(`${key}Segment`).hidden, false, context);
  assert.equal(get('scoutSegment').hidden, plan === 'standard', context);
  assert.equal(get('agentSegment').hidden, plan !== 'complete', context);
  cards.forEach((card, cardIndex) => assert.equal(card.classList.contains('active'), inputs[cardIndex].value === plan, context));
  checks++;
}

function choosePlan(plan) {
  inputs.forEach(input => { input.checked = input.value === plan; });
  inputs.find(input => input.checked).dispatch('change');
}
function chooseCount(count) {
  const select = get('interviewCount');
  assert.ok(select.options.some(option => option.value === String(count)));
  select.value = String(count);
  select.dispatch('change');
}

verify('standard', 0); // The actual initial update must render a usable result.
for (const plan of Object.keys(fixtures)) {
  choosePlan(plan);
  counts.forEach((count, index) => { chooseCount(count); verify(plan, index); });
  chooseCount(10); // Return from 51+ without stale labels, amounts, or hidden charts.
  verify(plan, 0);
}
chooseCount(51);
for (const plan of ['standard', 'complete', 'plus', 'standard']) {
  choosePlan(plan);
  verify(plan, 4);
}
windowMock.dispatch('resize');
verify('standard', 4);
console.log(`PASS: PACE fixed monthly pricing (${checks} simulator states; all 15 plan/count combinations, reverse transitions, plan switches, resize)`);
