import type { Metadata } from 'next';
import Image from 'next/image';
import Runtime from './Runtime';
import HeroFilm from './HeroFilm';
import InsightDesign from './InsightDesign';
import './undo-job.css';

const ASSET = '/lp-assets/studio/';
const GUIDE = '/undo-job-assets/undo-job-service-guide.pdf';
const CONTACT = 'https://www.kyute.jp/contact';
export const metadata: Metadata = {
  title: '運動部のシゴト。｜元体育会・元運動部に刺さる採用プロモーション動画',
  description: '体育会出身者が企画・制作する、体育会に特化した採用動画。候補者と出演者の両方を理解し、御社で働く理由を1日密着で映します。',
  alternates: { canonical: 'https://www.kyute.jp/lp/undo-job' },
  openGraph: { title: '元体育会・元運動部に刺さる、採用プロモーション動画を作ります。', description: '体育会出身者がつくる、体育会特化の採用動画。', url: 'https://www.kyute.jp/lp/undo-job', images: [{ url: '/lp-assets/studio/okada-2.webp', width: 1112, height: 626 }], locale: 'ja_JP', type: 'website' },
};
function Arrow({ down = false }: { down?: boolean }) { return <span aria-hidden="true">{down ? '↓' : '↗'}</span>; }
function CTAs({ light = false }: { light?: boolean }) { return <div className={`uj-ctas ${light ? 'uj-ctas-light' : ''}`}><a className="uj-btn uj-btn-gold" href={GUIDE} download="運動部のシゴト_サービスガイド.pdf">サービス資料をダウンロード <Arrow /></a><a className="uj-btn uj-btn-line" href={CONTACT}>制作・掲載について相談する <Arrow /></a></div>; }
function Tag({ n, children }: { n: string; children: React.ReactNode }) { return <p className="uj-tag"><span>{n}</span>{children}</p>; }
function Photo({ name, alt, priority = false, sizes = '(max-width: 760px) 100vw, 55vw' }: { name: string; alt: string; priority?: boolean; sizes?: string }) { return <Image src={`${ASSET}${name}.webp`} alt={alt} width={1112} height={626} sizes={sizes} priority={priority} />; }
function FilmButton({ name, alt, id, start = 0, title, className = '' }: { name: string; alt: string; id: string; start?: number; title: string; className?: string }) { return <button className={`uj-film-button ${className}`} type="button" data-uj-video={id} data-start={start} data-title={title} aria-label={`${title}を再生`}><Photo name={name} alt={alt} /><span className="uj-play"><span aria-hidden="true">▶</span><span>映像を見る</span></span></button>; }

export default function UndoJobPage() {
return <div className="uj" id="uj-top">
  <a className="uj-skip" href="#uj-main">本文へ進む</a>
  <header className="uj-header">
    <a className="uj-logo" href="#uj-top" aria-label="運動部のシゴト。 ページの先頭へ"><Image src="/undo-job-assets/channel-logo.jpg" width={58} height={58} alt="" priority /><span>運動部のシゴト。<small>企業向け採用動画制作</small></span></a>
    <nav aria-label="メインナビゲーション"><a href="#uj-method">インサイトから、こう撮る</a><a href="#uj-films">制作映像</a><a href="#uj-use">採用での活用</a></nav>
    <a className="uj-header-cta" href={GUIDE} download="運動部のシゴト_サービスガイド.pdf">サービス資料 <Arrow /></a>
  </header>
  <main id="uj-main">
    <section className="uj-hero" aria-labelledby="uj-hero-title">
      <div className="uj-hero-copy">
        <p className="uj-eyebrow"><i />体育会経験者を採用したい企業へ</p>
        <h1 id="uj-hero-title"><span className="uj-hero-target">元体育会・元運動部に刺さる、</span><span>採用プロモーション<br />動画を<span className="uj-mark">作ります。</span></span></h1>
        <p className="uj-hero-lead uj-hero-strength">体育会出身者がつくる、<br />体育会特化の採用動画。</p>
        <CTAs />
      </div>
      <div className="uj-hero-visual"><HeroFilm /><div className="uj-film-edge" aria-hidden="true">PEOPLE. WORK. REAL.</div><a href="#uj-films" className="uj-hero-watch"><span className="uj-round-arrow">↗</span><span>「この人たち、分かっている」<br /><strong>そう思える一本を。</strong></span></a></div>
      <div className="uj-hero-bottom"><span>あの頃、大切にしていたこと。<br className="uj-mobile" />これから、仕事で大切にしたいこと。</span><a href="#uj-problem">その接点を、映像に。 <Arrow down /></a></div>
    </section>

    <section className="uj-section uj-problem" id="uj-problem">
      <div className="uj-wrap"><Tag n="01">採用担当者の皆さまへ</Tag>
        <h2 data-uj-reveal>多くの企業が求める、<br />体育会人材。<br /><em>仕事選びには、<br className="uj-mobile" />原体験がある。</em></h2>
        <div className="uj-origin"><p>競技生活で経験してきた、</p><strong>本気になれる目標。<br className="uj-mobile" />切磋琢磨できる仲間。<br className="uj-mobile" />努力が報われる実感。</strong><p>その原体験から、心が動く仕事の伝え方を考えます。</p></div>
        <div className="uj-gap uj-gap-deep">
          <div className="uj-company-words"><span className="uj-mini-label">企業が伝えていること</span><p>体育会歓迎。</p><p>若手が活躍。</p><p>チームワーク。</p><p>成長できる環境。</p></div>
          <div className="uj-gap-arrow" aria-hidden="true">→<span>その言葉の、<br />もう一つ奥へ。</span></div>
          <div className="uj-candidate-words"><span className="uj-mini-label">仕事選びのインサイト</span><p>あの頃みたいに、<br />仕事にも本気に<br />なれるだろうか。</p><ul><li>本気になれる目標はある？</li><li>自分を高めてくれる仲間はいる？</li><li>努力の先に、成長を感じられる？</li></ul></div>
        </div>
        <div className="uj-problem-bridge"><p>「体育会歓迎」の、その先へ。<br /><strong>同じ経験を持つ私たちが、<br className="uj-mobile" />御社の魅力を映します。</strong></p></div>
      </div>
    </section>

    <section className="uj-section uj-evidence" id="uj-evidence"><div className="uj-wrap">
      <Tag n="02">DATA ／ 調査で確認できること</Tag>
      <div className="uj-section-head"><h2 data-uj-reveal>データにも表れる、<br /><em>人と、環境へのこだわり。</em></h2></div>
      <div className="uj-data-grid">
        <article className="uj-stat"><p className="uj-stat-population">2026年卒 体育会学生・102名</p><div className="uj-stat-number" role="img" aria-label="63パーセント"><span data-uj-count="63" aria-hidden="true">63</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'63%'}} /></div><h3>人間関係・職場の雰囲気に注目。</h3><p>就職先を選ぶ際、特に見るポイント。</p><a className="uj-source-link" href="#uj-research">調査・出典を見る ↗</a></article>
        <article className="uj-stat"><p className="uj-stat-population">運動部所属大学生・調査全体1,225名</p><div className="uj-stat-number" role="img" aria-label="68パーセント"><span data-uj-count="68" aria-hidden="true">68</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'68%'}} /></div><h3>相談しやすく、安心して働きたい。</h3><p>働きたい環境に「相談しやすく、心理的安全性が高い」を選択。</p><a className="uj-source-link" href="#uj-research">調査・出典を見る ↗</a></article>
      </div>
    </div></section>

    <InsightDesign />

    <section className="uj-section uj-reality" id="uj-reality"><div className="uj-wrap">
      <Tag n="04">言葉と映像で、伝わり方は変わる</Tag><h2 data-uj-reveal>「仕事に本気」を、<br /><em>その人の一日で見せる。</em></h2>
      <div className="uj-compare-open">
        <div className="uj-compare-words"><p className="uj-compare-label">01　求人票の言葉</p><div className="uj-job-sheet"><p className="uj-job-top">RECRUITMENT <span>表現例</span></p><h3>仕事に本気で、<br />向き合える会社です。</h3><div className="uj-job-pills"><span>体育会歓迎</span><span>若手活躍</span><span>チームで成長</span></div></div><p className="uj-compare-question">その「本気」は、どんな姿だろう。</p></div>
        <div className="uj-compare-arrow" aria-hidden="true">→</div>
        <div className="uj-compare-film"><p className="uj-compare-label">02　密着した一日</p><FilmButton name="okada-5" alt="一人ひとりに向き合い、オンラインで個別指導を行う実際の仕事風景" id="QT5ZYECnOUM" start={790} title="密着した一日。準備から指導へ、本気の姿を見る" /><h3>準備する。考える。<br />一人ひとりと、向き合う。</h3><button className="uj-compare-cta" type="button" data-uj-video="QT5ZYECnOUM" data-start="790" data-title="密着した一日。準備から指導へ">この場面を、映像で見る <span aria-hidden="true">▶</span></button></div>
      </div>
    </div></section>

    <section className="uj-documentary"><div className="uj-wrap"><Tag n="05">だから、1日密着ドキュメンタリー</Tag><h2 data-uj-reveal>会社説明から、<br /><span>「この人たちと<br className="uj-mobile" />働きたい」へ。</span></h2><p className="uj-doc-text">目標に向かう姿も、仲間との会話も。<br />御社で働く自分を想像できる、1日密着。</p></div></section>

    <section className="uj-section uj-films" id="uj-films"><div className="uj-wrap"><Tag n="06">「運動部のシゴト。」の制作映像</Tag><div className="uj-section-head"><h2 data-uj-reveal>経歴を紹介する、その先へ。<br /><em>いま、何に心を動かしているか。</em></h2><a className="uj-text-link" href="https://www.youtube.com/@undo-job/videos" target="_blank" rel="noreferrer">公式YouTubeを見る <Arrow /></a></div>
      <article className="uj-feature-film"><div className="uj-feature-visual"><FilmButton name="okada-2" alt="パソコンを前に、分析について語る教育事業の起業家" id="QT5ZYECnOUM" title="筑波大蹴球部からオンライン塾を起業した24歳の一日" /><span className="uj-film-index" aria-hidden="true">01</span></div><div className="uj-feature-story"><p className="uj-mini-label">筑波大蹴球部 → 教育事業</p><h3>追いかける目標は、<br />変わっても。</h3><p>プロを断念し、オンライン塾で起業。<br />競技と向き合った経験は、<br />いま、誰かを教える仕事の中にある。</p><div className="uj-chapter"><span>この作品で見せていること</span><p>指導の前に、どこまで準備するのか。<br />競技の経験が、いまの仕事でどう生きているのか。</p><button type="button" data-uj-video="QT5ZYECnOUM" data-start="790" data-title="準備から個別指導へ" className="uj-text-link">13:10〜の場面を見る <Arrow /></button></div><a className="uj-original" href="https://www.youtube.com/watch?v=QT5ZYECnOUM" target="_blank" rel="noreferrer">YouTubeで本編を見る（30:47） ↗</a></div></article>
      <div className="uj-film-rail"><article><FilmButton name="cafe-5" alt="カフェを開業した理由について語る女性経営者" id="QzPRS_T-D4Q" title="外資コンサルからカフェを開業した女性の一日" /><div className="uj-film-meta"><span>02</span><p>外資コンサル → カフェ開業</p></div><h3>自分が大切にしたいことを、<br />仕事にする。</h3><p>肩書きからは分からない、仕事を選んだ理由。<br />何を大切にしたい人なのか、その背景に近づく。</p><button className="uj-text-link" type="button" data-uj-video="QzPRS_T-D4Q" data-start="761" data-title="カフェ開業への想い">12:41〜 想いを語る場面 <Arrow /></button></article><article><FilmButton name="uosaki-2" alt="普段の会話を通して、自分の考えを話す起業家" id="wtRbJX3bq4o" title="慶大法学部から新卒短期離職を経て起業した26歳の一日" /><div className="uj-film-meta"><span>03</span><p>新卒での短期離職 → 起業</p></div><h3>肩書きの先に、<br />その人らしい働き方がある。</h3><p>用意した自己紹介に収まらない人柄。<br />何気ない場面の選択や会話から、その人を知る。</p><button className="uj-text-link" type="button" data-uj-video="wtRbJX3bq4o" data-start="399" data-title="何気ない会話から人柄を知る">06:39〜 会話の場面 <Arrow /></button></article></div>
      <p className="uj-note uj-work-note">自社メディアの制作作品です。顧客企業の採用成果事例ではありません。</p>
    </div></section>

    <section className="uj-section uj-use" id="uj-use"><div className="uj-wrap"><Tag n="07">理解を、応募前から届ける</Tag><div className="uj-section-head"><h2 data-uj-reveal>「自分にも、重なる」。<br /><em>その気持ちを、採用の接点へ。</em></h2></div>
      <div className="uj-journey" aria-label="候補者の体験"><div><small>出会う</small><strong>認知・求人<br />スカウト</strong></div><span aria-hidden="true">→</span><div className="uj-journey-key"><small>知る</small><strong>動画を見る</strong><p>人・仕事・カルチャーを理解</p></div><span aria-hidden="true">→</span><div><small>重ねる</small><strong>自分に<br />合いそう</strong></div><span aria-hidden="true">→</span><div><small>進む</small><strong>応募・面接<br />入社へ</strong></div></div>
      <div className="uj-use-list"><div><b>応募前</b><h3>採用サイト・求人・スカウト</h3><p>条件に加え、仕事への姿勢や仲間を知ってもらう。</p></div><div><b>選考中</b><h3>説明会・カジュアル面談・面接</h3><p>「どの場面に惹かれたか」から、価値観を話す。</p></div><div><b>内定後</b><h3>内定者フォロー</h3><p>自分がどんな役割で力を発揮するか、具体的に。</p></div></div>
      <div className="uj-before-apply"><div className="uj-small-stat" role="img" aria-label="69パーセント"><span data-uj-count="69" aria-hidden="true">69</span><small aria-hidden="true">%</small></div><div><p className="uj-mini-label">エン転職ユーザー調査</p><h3>採用動画を見たいのは、<br />「応募する前」。</h3><p className="uj-source-brief">エン転職ユーザー調査・全体1,393名<br /><a href="#uj-research">調査・出典を見る ↗</a></p></div></div>
    </div></section>

    <section className="uj-research" id="uj-research"><div className="uj-wrap"><details><summary><span>調査・出典</span><span>根拠と調査条件を確認する ＋</span></summary><div className="uj-research-content"><p>仕事選びのインサイトは企画仮説です。体育会経験者にも価値観の違いがあり、学生調査を中途人材全体や採用効果へ一般化するものではありません。</p><ol>
<li><a href="https://www.sports-f.co.jp/survey-report/2026-07-15-4/" target="_blank" rel="noreferrer">スポーツフィールド｜27卒2月 体育会学生の就職活動状況調査 ↗</a><p>2026年2月1〜28日・調査全体1,225名、複数回答、個別設問n未公表。働きたい環境に「相談しやすく、心理的安全性が高い」を選択した68%を掲載。</p></li>
<li><a href="https://note.onecareer.co.jp/n/n26c6edadd416" target="_blank" rel="noreferrer">ONE CAREER｜学生時代を超える挑戦と成長を。 ↗</a><p>体育会出身社員3名の座談会。熱意ある同僚や挑戦の機会を選んだ語りを、没頭や成長の仮説に生かしています。一社の個別事例であり、社員間にも価値観の違いがあります。</p></li>
<li><a href="https://prtimes.jp/main/html/rd/p/000000099.000036999.html" target="_blank" rel="noreferrer">アーシャルデザイン｜体育会系学生の就職活動実態調査 ↗</a><p>2024年11月11日〜2025年1月29日・イベント参加学生102名、複数回答。仕事内容70%、人間関係・職場の雰囲気63%など。スポーツ経験を就活でアピールできるとする回答は97%。強みとしてチームワークや目標への努力も挙がっています。</p></li>
<li><a href="https://www.sports-f.co.jp/news/20190704-1/" target="_blank" rel="noreferrer">スポーツフィールド｜20卒体育会学生の就職活動レポート ↗</a><p>2019年3月・イベント参加者約4,000名。企業選択の第1希望は人間関係18.3%、成長環境17.4%。過去の傾向を示す補助資料として参照しています。</p></li>
<li><a href="https://athlete-p.co.jp/news_release/pdf/20210615.pdf" target="_blank" rel="noreferrer">アスリートプランニング｜2021年 体育会学生の企業選びに関する調査 ↗</a><p>2021年4月・回答315件。図中のn=879を879名とは扱いません。「レベルの高い仲間」は成長・研修との複合選択肢です。旧PDFは現在トップページへ転送され、公式PDFの検索収録テキストで部分確認。数値の主要根拠には用いていません。</p></li>
<li><a href="https://www.jstage.jst.go.jp/article/jspehssconf/72/0/72_198/_article/-char/ja/" target="_blank" rel="noreferrer">宮﨑・松尾｜キャリア形成をめぐる体育会文化に関する実証的研究 ↗</a><p>2022年・競技を引退した大学4年生7名の質的研究。競技経験と自己理解の関係を考える思想背景です。特定の企業への選好や動画の効果を示す証拠ではありません。<a href="https://jssspe.org/wp-content/uploads/b27a4f8bc3f44815500470fff7ebadf0.pdf" target="_blank" rel="noreferrer">学会公式の長版抄録 ↗</a></p></li>
<li><a href="https://corp.en-japan.com/newsrelease/2025/41694.html" target="_blank" rel="noreferrer">エン・ジャパン｜採用動画調査 ↗</a><p>2025年4月1〜30日・エン転職ユーザー、調査全体1,393名。視聴希望のタイミングに「応募前」を選択した69%を掲載。複数回答、個別設問n未公表。体育会限定の調査ではありません。</p></li><li><a href="https://www2.jpx.co.jp/disc/70800/140120260511523654.pdf" target="_blank" rel="noreferrer">スポーツフィールド｜2026年 第1四半期決算説明資料 ↗</a><p>体育会学生中心の採用イベントへの企業需要と、スポナビ27卒向け紹介企業1,413社（2026年3月末時点、重複なし）を確認。「多くの企業が求める」の背景資料です。一事業者の実績であり、企業全体の割合ではありません。</p></li></ol></div></details></div></section>

    <section className="uj-positioning uj-positioning-v3"><div className="uj-wrap"><p className="uj-mini-label">私たちが大切にする、採用表現</p><h2 data-uj-reveal>あの熱量を知る私たちが、<br /><em>次に本気になれる仕事を、<br />映し出す。</em></h2><p className="uj-brand-statement">候補者の「知りたい」も、<br className="uj-mobile" />出演者の「伝えたい」も。<br />両方が分かる、体育会出身のつくり手がいる。</p><div className="uj-brand-proof"><span>体育会出身者が<br /><strong>企画・制作</strong></span><b aria-hidden="true">×</b><span>体育会に特化した<br /><strong>自社メディア</strong></span></div><p className="uj-brand-close">だから、体育会採用に。<br /><strong>運動部のシゴト。</strong></p></div></section>

    <section className="uj-final" id="uj-download"><div className="uj-wrap"><p className="uj-tag"><span>次は、御社の一日を。</span></p><h2 data-uj-reveal>採りたい人の気持ちから、<br /><em>採用動画をつくろう。</em></h2><div className="uj-final-bottom"><p>「運動部のシゴト。」と、<br />御社が選ばれる理由を、映像にしませんか？</p><div><CTAs light /></div></div></div></section>
  </main>
  <footer className="uj-footer"><a className="uj-wordmark" href="#uj-top">運動部のシゴト。<i /></a><p>企画・制作・運営　KYUTE合同会社</p><div><a href="https://www.kyute.jp/about">運営会社 ↗</a><a href={CONTACT}>お問い合わせ ↗</a><a href="#uj-top">TOP ↑</a></div><small>© KYUTE</small></footer>
  <div className="uj-mobile-cta"><a href={GUIDE} download="運動部のシゴト_サービスガイド.pdf">サービス資料をDL <Arrow /></a><a href={CONTACT}>制作を相談する <Arrow /></a></div>
  <Runtime />
</div>;
}
