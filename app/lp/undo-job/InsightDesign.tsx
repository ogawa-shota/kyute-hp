const cases = [
  {
    key: 'team', label: '仲間と目標', number: '01',
    fact: '人間関係と、相談しやすい環境への関心。',
    evidence: '体育会学生の企業選びでは人間関係・職場の雰囲気に注目。働きたい環境には、相談のしやすさも挙げられています。',
    source: 'アーシャルデザイン（2024年11月〜2025年1月・n=102）／スポーツフィールド（2026年2月・調査全体n=1,225）。上記63%・68%の調査。',
    href: '#uj-evidence',
    thought: <>ただ仲が良い、の奥に。<br />本気で同じ目標を<br />追える仲間がいるか。</>,
    interpretation: '苦しい時間も共有した経験がある。だから、チームの真価を知りたいのでは。',
    before: '「御社の雰囲気は？」から、一歩深く。',
    question: <>チームで一番きつかった瞬間、<br />誰が、何をしてくれましたか？</>,
    shoot: '振り返りの会話と、仲間が支える瞬間。',
    edit: 'つまずきから、チームで立て直すまで。',
  },
  {
    key: 'growth', label: '切磋琢磨と成長', number: '02',
    fact: '企業選択で、成長できる環境が上位に。',
    evidence: '20卒体育会学生の調査では、企業選択の第1希望で「自分が成長できる環境がある」が17.4%。人間関係に次ぐ2位でした。',
    source: 'スポーツフィールド／2019年3月・就職イベント参加者約4,000名。過去の調査であり、現在の学生全体の傾向を示す数値ではありません。',
    href: '#uj-research',
    thought: <>「昨日より、できる」。<br />あの成長実感を、<br />仕事でも持てるだろうか。</>,
    interpretation: '昨日より上手くなる喜びを知っている。だから、成長の過程まで見たいのでは。',
    before: '「成長できる環境ですか？」から、一歩深く。',
    question: <>最近、同僚に「かなわない」と<br />思ったのは、どんな場面ですか？</>,
    shoot: '先輩の助言と、それを受けたやり直し。',
    edit: 'できなかったことが、できるようになる過程。',
  },
  {
    key: 'passion', label: '仕事への没頭', number: '03',
    fact: '仕事への情熱と、挑戦の機会を選んだ人がいる。',
    evidence: 'ONE CAREERの社員座談会では、柔道経験者が熱意ある同僚や、手を挙げて任される機会を企業選びの軸として語っています。',
    source: 'ONE CAREER／体育会出身社員3名の定性記事（初出2024年10月、掲載2025年10月）。一社の個別事例であり、全体傾向ではありません。',
    href: 'https://note.onecareer.co.jp/n/n26c6edadd416',
    thought: <>競技を終えた、その先で。<br />また何かに本気になれる<br />自分を、想像できるか。</>,
    interpretation: '時間を忘れて打ち込んだ経験がある。だから、次に夢中になれる理由を探すのでは。',
    before: '競技の経験も、成功談だけで終えない。',
    question: <>競技の経験は、仕事でどう生きた？<br />通用しなかったこともありますか？</>,
    shoot: '判断に迷う場面と、仕事の進め方を変えた工夫。',
    edit: '経験の限界から、いまの価値観と続ける理由へ。',
  },
];

export default function InsightDesign() {
  return <section className="uj-section uj-method" id="uj-method">
    <div className="uj-wrap">
      <p className="uj-tag"><span>04</span>企画設計を、具体例で</p>
      <div className="uj-section-head"><h2 data-uj-reveal>候補者の疑問から、<br /><em>問いと場面を決める。</em></h2><p>採用したい人物の期待と不安を整理。<br />伝える社員・質問・仕事の場面へ。</p></div>
      <div className="uj-method-path" aria-label="動画企画の考え方"><span>DATA <small>調査・語り</small></span><b aria-hidden="true">→</b><span>INSIGHT <small>候補者理解の仮説</small></span><b aria-hidden="true">→</b><strong>だから、こう撮る。</strong></div>
      <div className="uj-topic-switch" role="group" aria-label="採用動画の企画テーマ"><p>届けたい魅力から、<br />企画の違いを見る</p>{cases.map((item,i)=><button key={item.key} id={`uj-topic-${item.key}`} type="button" data-uj-topic={item.key} aria-pressed={i===0} aria-controls={`uj-design-${item.key}`}><span>{item.number}</span>{item.label}<b aria-hidden="true">↗</b></button>)}</div>
      {cases.map((item,i)=><article className="uj-design-case" key={item.key} id={`uj-design-${item.key}`} data-uj-design={item.key} hidden={i!==0} aria-labelledby={`uj-topic-${item.key}`}>
        <div className="uj-research-to-insight">
          <div className="uj-case-fact"><p className="uj-step-label"><b>DATA</b><span>確認できた事実</span></p><h3>{item.fact}</h3><p>{item.evidence}</p><details className="uj-case-source"><summary>出典・調査条件</summary><a href={item.href} {...(item.href.startsWith('https')?{target:'_blank',rel:'noreferrer'}:{})}>{item.source} ↗</a></details></div>
          <div className="uj-case-insight"><p className="uj-step-label"><b>INSIGHT</b><span>候補者理解の仮説</span></p><h3>{item.thought}</h3><p>{item.interpretation}</p></div>
        </div>
        <div className="uj-shoot-plan"><div className="uj-shoot-header"><p className="uj-step-label"><b>VIDEO</b><span>だから、こう撮る。</span></p><span>企画・質問の例</span></div><p className="uj-question-before">{item.before}</p><h3>{item.question}</h3><div className="uj-shot-edit"><div><span>撮る場面</span><p>{item.shoot}</p></div><div><span>編集の視点</span><p>{item.edit}</p></div></div></div>
      </article>)}
      <p className="uj-method-ethic"><strong>答えを決めつけず、その人の言葉から。</strong></p>
    </div>
  </section>;
}
