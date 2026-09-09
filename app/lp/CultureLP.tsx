/* eslint-disable @next/next/no-img-element -- Native remote YouTube posters keep source attribution and avoid rehosting. */
"use client";

import { useEffect, useRef, useState } from "react";

const films = [
  { id: "QzPRS_T-D4Q", title: "外資コンサルから、\nカフェ開業へ。", original: "【密着】慶應卒 外資コンサルから脱サラしてカフェ開業した20代女性のリアル1日", duration: "18:41", subject: "カフェを営む起業家", intent: "仕事の選択と、日常の姿を重ねて伝える。", issue: "仕事内容だけでは伝わらない、働く人の価値観。", detail: "キャリアの転機と、カフェで働く一日。人の想いを、仕事の風景とともに届ける密着映像です。" },
  { id: "QT5ZYECnOUM", title: "ピッチの先に、\n自分の仕事があった。", original: "【密着】筑波大蹴球部 プロ断念からオンライン塾で起業した24歳の1日に密着", duration: "30:47", subject: "オンライン塾を営む起業家", intent: "歩んできた道から、いまの仕事への想いを描く。", issue: "肩書きだけでは見えない、仕事に向き合う理由。", detail: "プロを目指した日々から、教育の現場へ。ひとりの選択を追い、仕事の背景にある価値観を映します。" },
  { id: "wtRbJX3bq4o", title: "会社を離れ、\n自分で事業をつくる。", original: "【密着】慶大法学部から新卒短期離職を経て起業した26歳男のリアルな1日", duration: "25:42", subject: "新卒短期離職を経た起業家", intent: "キャリアの決断を、日々の行動から伝える。", issue: "経歴の文字情報だけでは見えない、本人の考え方。", detail: "就職、離職、そして起業。言葉だけでは分からない、その人らしい仕事のスタイルに近づくドキュメンタリーです。" },
];
const poster = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const Arrow = () => <span aria-hidden="true">↗</span>;
const Play = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>;
function Label({ number, children }: { number: string; children: React.ReactNode }) { return <p className="c-label"><span>{number}</span>{children}</p>; }
function DownloadLink({ className = "", children = "サービス資料をダウンロード" }: { className?: string; children?: React.ReactNode }) { return <a className={`c-button ${className}`} href="/culture-assets/kyute-culture-guide.pdf" download="KYUTE_採用YouTube_サービスガイド.pdf">{children}<Arrow /></a>; }

export default function CultureLP() {
  const [active, setActive] = useState(0);
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const film = films[active];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("#culture-lp [data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("c-visible"); observer.unobserve(entry.target); } }), { threshold: 0.1 });
    if (!reduced) elements.forEach(el => { el.classList.add("c-will-reveal"); observer.observe(el); });
    const update = () => { const target = document.getElementById("download"); setShowSticky(window.scrollY > 700 && (target?.getBoundingClientRect().top ?? 0) > window.innerHeight); };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, []);
  useEffect(() => {
    const el = dialog.current;
    if (playing !== null && el && !el.open) { el.showModal(); const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; }
  }, [playing]);
  function openFilm(index: number) { trigger.current = document.activeElement as HTMLElement; setPlaying(index); }
  function closeFilm() { dialog.current?.close(); setPlaying(null); trigger.current?.focus(); }

  return <div id="culture-lp">
    <a className="c-skip" href="#main">本文へスキップ</a>
    <header className="c-header">
      <a href="#top" className="c-logo" aria-label="KYUTE トップへ">KYUTE<span className="c-logo-dot">.</span></a>
      <nav aria-label="メインナビゲーション"><a href="#works">制作事例</a><a href="#approach">特徴</a><DownloadLink>資料ダウンロード</DownloadLink></nav>
    </header>
    <main id="main">
      <section id="top" className="c-hero">
        <div className="c-hero-topline"><span>RECRUITMENT YOUTUBE</span><span>はたらく、その素顔を。</span></div>
        <div className="c-hero-stage">
          <div className="c-hero-image"><img src="/culture-assets/office.webp" width="1536" height="1024" alt="オフィスのテーブルを囲み、笑顔で話す社員たちを描いたコンセプト画像" fetchPriority="high" /><span className="c-rec"><i /> CULTURE, IN FRAME.</span><span className="c-concept">AI生成・コンセプト映像イメージ</span></div>
          <div className="c-hero-copy"><p className="c-kicker">その会社らしさを、採用の力に。</p><h1><span>カルチャー訴求特化の、</span>採用YouTube<br />運用代行<span className="c-period">。</span></h1><p className="c-hero-sub">求人票では伝わらない、<br />人・仕事・会社の空気まで。<br />企画から撮影・編集・運用まで、<br />採用YouTubeをまるごと支援。</p><DownloadLink /><a className="c-text-link" href="#works"><span className="c-mini-play"><Play /></span>制作事例を見る<span aria-hidden="true">↓</span></a></div>
          <p className="c-photo-caption">ふとした会話に、<br />会社らしさが映っている。</p>
        </div>
        <div className="c-hero-foot"><p>人柄。仕事への想い。いつもの関係性。<br className="c-mobile-only" />その全部が、入社の理由になる。</p><a href="#gap">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
      </section>

      <section id="gap" className="c-section c-gap">
        <div className="c-wrap"><Label number="01">THE INVISIBLE CULTURE</Label><div className="c-section-head" data-reveal><h2>いい会社なのに。<br />その「いい」が、<em>伝わらない。</em></h2><p>カルチャーは、なかなか伝わらない。<br />条件は届いている。けれど、<br />一緒に働くイメージまでは、届いていない。</p></div>
          <div className="c-gap-visual" data-reveal><div className="c-job-sheet"><span className="c-sheet-label">求人情報で見える会社</span><h3>募集要項</h3><dl><div><dt>仕事内容</dt><dd>新規事業の企画・推進</dd></div><div><dt>給与</dt><dd>経験・能力に応じて決定</dd></div><div><dt>福利厚生</dt><dd>社会保険・各種手当</dd></div><div><dt>働き方</dt><dd>フレックスタイム制度</dd></div></dl><p>条件は分かる。<br /><strong>でも、どんな人と働くんだろう。</strong></p><small>説明用の架空の募集要項</small></div>
          <div className="c-gap-photo"><img src="/culture-assets/office.webp" alt="仕事の合間に会話する社員たちのコンセプト画像" width="1536" height="1024" loading="lazy" /><span className="c-on-photo-label">会社の中にある、もうひとつの情報</span><div className="c-questions"><span>どんな会話をしている？</span><span>困ったとき、誰に頼る？</span><span>自分も、ここに馴染めそう？</span></div><small>AI生成・コンセプト映像イメージ</small></div></div>
          <p className="c-bridge">言葉にしきれない会社の魅力を、<span>見えるものに。</span><span className="c-down-arrow" aria-hidden="true">↓</span></p>
        </div>
      </section>

      <section className="c-section c-dark c-video-story" id="video-story">
        <div className="c-wrap"><Label number="02">LET YOUR CULTURE SPEAK</Label><div className="c-section-head" data-reveal><h2>だから、<br /><em>採用YouTube。</em></h2><p>表情も、声も、仕事のリズムも。<br />「ここで働く自分」を想像できる情報が、<br />映像にはある。</p></div>
          <div className="c-scene-tabs" role="tablist" aria-label="映像で伝わること">{["人柄と価値観", "仕事への想い", "働く日常"].map((name, i) => <button key={name} id={`scene-tab-${i}`} role="tab" aria-selected={scene === i} aria-controls="scene-panel" tabIndex={scene === i ? 0 : -1} onClick={() => setScene(i)} onKeyDown={e => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) { e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 2 : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3; setScene(next); document.getElementById(`scene-tab-${next}`)?.focus(); } }}><span>0{i + 1}</span>{name}</button>)}</div>
          <div className="c-scene-panel" id="scene-panel" role="tabpanel" aria-labelledby={`scene-tab-${scene}`}><button className="c-scene-screen" onClick={() => openFilm(scene)} aria-label={`${films[scene].original}を再生`}><img key={scene} src={poster(films[scene].id)} width="1280" height="720" alt={films[scene].original} loading="lazy" /><span className="c-play"><Play /></span><span className="c-watch">映像で見てみる</span></button><div className="c-scene-note"><span className="c-time">{["01", "02", "03"][scene]} / 03</span><h3>{[<>話す言葉だけでなく、<br />その人らしさまで。</>, <>何をするかだけでなく、<br />なぜ、その仕事なのか。</>, <>肩書きだけでなく、<br />日々の仕事の進め方まで。</>][scene]}</h3><p>KYUTE自社メディア<br />「運動部のシゴト。」より</p><div className="c-timeline" aria-hidden="true"><i /><i /><i /><i /><i /></div></div></div>
        </div>
      </section>

      <section id="works" className="c-section c-dark c-works"><div className="c-wrap"><Label number="03">SELECTED FILMS</Label><div className="c-section-head" data-reveal><h2>会社の数だけ、<br /><em>見たくなる物語がある。</em></h2><p>まずは、私たちの映像をご覧ください。<br />自社メディアで培った、人に近づく取材と表現。</p></div><p className="c-proof-note">自社メディア制作映像です。顧客企業の採用導入実績・成果を示すものではありません。</p>
          <div className="c-featured" data-reveal><button className="c-featured-poster" onClick={() => openFilm(active)} aria-label={`${film.original}を再生`}><img src={poster(film.id)} alt={film.original} loading="lazy" width="1280" height="720" /><span className="c-play"><Play /></span><span className="c-duration">{film.duration}</span></button><div className="c-film-detail"><p className="c-film-genre">1日密着 / ドキュメンタリー</p><h3>{film.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h3><p className="c-film-subject">{film.subject}</p><p>{film.detail}</p><dl><div><dt>制作・運営</dt><dd>KYUTE合同会社<br />自社メディア「運動部のシゴト。」</dd></div><div><dt>採用広報での活用視点</dt><dd>{film.issue}</dd></div><div><dt>企画の読み解き</dt><dd>{film.intent}</dd></div></dl><small>活用視点・企画の読み解きは本LPでの提案です。</small><button className="c-text-link" onClick={() => openFilm(active)}>この映像を見る<Arrow /></button></div></div>
          <div className="c-film-shelf" aria-label="制作映像を選ぶ">{films.map((item, i) => <button key={item.id} className={i === active ? "c-selected" : ""} aria-pressed={i === active} onClick={() => setActive(i)}><span className="c-shelf-number">0{i + 1}</span><img src={poster(item.id)} width="1280" height="720" alt="" loading="lazy" /><span><small>1日密着・{item.duration}</small><strong>{item.title.replace("\n", "")}</strong></span><Arrow /></button>)}</div>
          <div className="c-formats"><p>あなたの会社なら、<br /><strong>どんな物語を届けますか。</strong></p><div><span>社員密着</span><span>オフィスツアー</span><span>社員インタビュー</span><span>仕事紹介</span><span>経営者インタビュー</span><span>対談・座談会</span></div></div>
        </div></section>

      <section id="evidence" className="c-section c-evidence"><div className="c-wrap"><Label number="04">WHY CULTURE MATTERS</Label><div className="c-section-head" data-reveal><h2>「誰と働くか」は、<br /><em>会社を選ぶ理由になる。</em></h2><p>人・カルチャーは、会社選びの重要な判断軸。<br />その相性を、入社前に知ってもらうために。</p></div><div className="c-data-grid" data-reveal><article className="c-data-primary"><p>入社予定先を決めた理由</p><div className="c-big-number">42.4<span>%</span></div><h3>社員の雰囲気・人柄が<br />自分に合っている。</h3><p className="c-data-companion"><strong>37.5<span>%</span></strong>は「社風が自分に合っている」</p><p className="c-source">2024年6月調査・2025年卒の入社先決定者1,898人／複数回答・ウエイトバック集計<br />マイナビ「2025年卒 大学生 活動実態調査（6月15日）」<br /><a href="https://career-research.mynavi.jp/wp-content/uploads/2024/06/s-nainaitei-0615.pdf" target="_blank" rel="noopener noreferrer">調査の詳細・出典を見る ↗</a></p></article><article className="c-data-secondary"><p>採用動画を見たいタイミング</p><div className="c-big-number">69<span>%</span></div><h3>応募前に、見たい。</h3><p>まず会社の中を知り、<br />自分に合いそうかを考えたい。</p><p className="c-source">エン転職ユーザー調査／2025年4月<br />調査全体1,393人／複数回答<br /><a href="https://corp.en-japan.com/newsrelease/2025/41694.html" target="_blank" rel="noopener noreferrer">調査の詳細・出典を見る ↗</a></p></article></div><p className="c-research-note">異なる対象・設問の調査です。数値同士の単純比較や、採用YouTubeによる効果の保証を意図していません。</p></div></section>

      <section className="c-section c-journey"><div className="c-wrap"><Label number="05">FROM KNOWING TO BELONGING</Label><div className="c-section-head" data-reveal><h2>応募の前に、<br /><em>「ここで働きたい」を。</em></h2><p>応募数を増やすだけではなく、<br />入社前に理解を深める採用へ。</p></div><div className="c-paths" data-reveal><div className="c-path c-path-before"><h3>条件を中心に知る</h3><ol><li>会社を知る</li><li>求人を見る</li><li>条件を見る</li><li>応募</li><li className="c-path-late">面接で初めて<br />カルチャーを知る</li><li>入社</li></ol></div><div className="c-path c-path-after"><h3><span>KYUTE</span>カルチャーまで知って選ぶ</h3><ol><li>会社を知る</li><li>YouTubeを見る</li><li>社員を知る</li><li>カルチャーを知る</li><li className="c-path-feeling">ここで<br />働きたい</li><li>応募<span className="c-path-last">→ 入社</span></li></ol></div></div><p className="c-journey-bottom">お互いの理解を深めて、<br className="c-mobile-only" /><strong>入社後の「思っていたのと違う」を減らす土台に。</strong></p><p className="c-research-note">採用コミュニケーションの設計例です。個別企業の採用成果・定着率の改善を保証するものではありません。</p></div></section>

      <section id="approach" className="c-section c-approach"><div className="c-wrap"><Label number="06">YOUR CULTURE, CONTINUOUSLY</Label><div className="c-section-head" data-reveal><h2>その会社らしさを、<br /><em>途切れず、届ける。</em></h2><p>動画1本で、終わらせない。<br />採用課題からチャンネルを設計し、<br />企画から改善まで、まるごと伴走します。</p></div><div className="c-process" data-reveal>{[{n:"01",title:"見つける",sub:"採用課題・チャンネル設計",text:"誰に、どんな魅力を届けるか。候補者が知りたいことから企画をつくる。"},{n:"02",title:"映し出す",sub:"企画・取材・撮影",text:"社員の一日や、いつもの会話。会社の中に入り、らしさのある瞬間を捉える。"},{n:"03",title:"届ける",sub:"編集・サムネイル・投稿",text:"思わず見たくなる入口と、最後まで見たくなる物語に。継続的に公開する。"},{n:"04",title:"育てる",sub:"振り返り・改善",text:"視聴データと採用現場の反応をもとに、次に伝えるテーマを磨いていく。"}].map(step=><article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><h4>{step.sub}</h4><p>{step.text}</p></article>)}</div><div className="c-approach-bottom"><p>チャンネル企画 / コンテンツ企画 / 撮影 / 編集 /<br className="c-mobile-only" /> サムネイル / 投稿 / 改善</p><DownloadLink className="c-button-dark">支援内容を資料で見る</DownloadLink></div></div></section>

      <section className="c-manifesto"><img src="/culture-assets/office.webp" alt="社員たちの自然な会話を描いたコンセプト画像" width="1536" height="1024" loading="lazy" /><div className="c-manifesto-shade" /><div data-reveal><p>伝わらないカルチャーを、リアルに届ける。</p><h2>「第一志望企業」に、<br /><em>躍り出よう。</em></h2><span>LET THEM SEE WHAT MAKES YOU, YOU.</span></div><small>AI生成・コンセプト映像イメージ</small></section>

      <section id="download" className="c-section c-download"><div className="c-wrap c-download-grid"><div className="c-download-copy"><Label number="07">LET’S START YOUR STORY</Label><h2>カルチャーが伝わる<br />採用YouTubeを、<br /><em>はじめませんか？</em></h2><p>支援内容と、はじめるまでの流れを<br />ひとつの資料にまとめました。</p><div className="c-guide"><div className="c-guide-cover"><span>KYUTE.</span><p>CULTURE<br />IN FRAME.</p><small>採用YouTube運用代行<br />サービスガイド</small><span className="c-guide-line" /></div><ol><li>採用YouTubeで届ける価値</li><li>企画から運用までの支援内容</li><li>導入に向けた進め方</li></ol></div><p className="c-pdf-meta">PDF / 無料 / 入力不要</p></div><div className="c-form-panel c-direct-download"><p className="c-form-eyebrow">SERVICE GUIDE</p><h3>入力不要で、<br />資料をすぐにダウンロード。</h3><p className="c-form-intro">個人情報の入力はありません。サービス内容と導入までの流れを、そのままご確認いただけます。</p><DownloadLink /><a className="c-text-link" href="/contact">導入について相談する<Arrow /></a></div></div></section>
    </main>
    <footer className="c-footer"><a href="#top" className="c-logo">KYUTE<span className="c-logo-dot">.</span></a><p>伝わらないカルチャーを、リアルに届ける。</p><a href="https://kyute.jp/about" target="_blank" rel="noopener noreferrer">運営会社<Arrow /></a><small>© KYUTE LLC.</small></footer>
    <div className={`c-mobile-cta ${showSticky ? "c-mobile-cta-visible" : ""}`} aria-hidden={!showSticky}><a className="c-button" href="/culture-assets/kyute-culture-guide.pdf" download="KYUTE_採用YouTube_サービスガイド.pdf" tabIndex={showSticky ? 0 : -1}>サービス資料をダウンロード<Arrow /></a></div>
    <dialog className="c-dialog" ref={dialog} aria-labelledby="video-dialog-title" onCancel={e=>{e.preventDefault();closeFilm();}} onClick={e=>{if(e.target===e.currentTarget)closeFilm();}}><div className="c-dialog-inner"><div className="c-dialog-top"><p id="video-dialog-title">{playing !== null ? films[playing].original : "制作映像"}</p><button onClick={closeFilm} aria-label="動画を閉じる" autoFocus>×</button></div>{playing !== null && <><iframe key={playing} src={`https://www.youtube-nocookie.com/embed/${films[playing].id}?autoplay=1&rel=0`} title={films[playing].original} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><div className="c-dialog-bottom"><span>運動部のシゴト。 / KYUTE自社メディア</span><a href={`https://www.youtube.com/watch?v=${films[playing].id}`} target="_blank" rel="noopener noreferrer">再生できない場合はYouTubeで見る ↗</a></div></>}</div></dialog>
  </div>;
}
