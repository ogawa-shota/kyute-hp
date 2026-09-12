import type { Metadata } from 'next';
import Image from 'next/image';
import Runtime from './Runtime';
import HeroFilm from './HeroFilm';
import Strengths from './Strengths';
import ConceptIcon from './ConceptIcon';
import UsePreview from './UsePreview';
import MaterialRequestForm from './MaterialRequestForm';
import './undo-job.css';

const ASSET = '/lp-assets/studio/';
const GUIDE = '#request-material';
const CONTACT = 'https://www.kyute.jp/contact';
export const metadata: Metadata = {
  title: '運動部のシゴト。｜挑戦したい人に刺さる、採用PR動画を制作します。',
  description: '体育会人材を採用したい企業のための1日密着型採用メディア。採用広報・YouTube・体育会理解を組み合わせ、人・仕事・チームを伝える採用動画を企画・制作・公開します。',
  alternates: { canonical: 'https://www.kyute.jp/lp/undo-job' },
  openGraph: { title: '挑戦したい人に刺さる、採用PR動画を制作します。', description: '採用のプロと体育会出身の制作陣が、挑戦したい人に刺さる1日密着型採用動画をつくります。', url: 'https://www.kyute.jp/lp/undo-job', images: [{ url: '/lp-assets/studio/okada-2.webp', width: 1112, height: 626 }], locale: 'ja_JP', type: 'website' },
};
function Arrow({ down = false }: { down?: boolean }) { return <span aria-hidden="true">{down ? '↓' : '↗'}</span>; }
function CTAs({ light = false }: { light?: boolean }) { return <div className={`uj-ctas ${light ? 'uj-ctas-light' : ''}`}><a className="uj-btn uj-btn-gold" href={GUIDE}>サービス資料をダウンロード <Arrow /></a><a className="uj-btn uj-btn-line" href={CONTACT}>制作・掲載について相談する <Arrow /></a></div>; }
function Tag({ n, children }: { n: string; children: React.ReactNode }) { return <p className="uj-tag"><span>{n}</span>{children}</p>; }
function Photo({ name, alt, priority = false, sizes = '(max-width: 760px) 100vw, 55vw' }: { name: string; alt: string; priority?: boolean; sizes?: string }) { return <Image src={`${ASSET}${name}.webp`} alt={alt} width={1112} height={626} sizes={sizes} priority={priority} />; }
function FilmButton({ name, alt, id, start = 0, title, className = '' }: { name: string; alt: string; id: string; start?: number; title: string; className?: string }) { return <button className={`uj-film-button ${className}`} type="button" data-uj-video={id} data-start={start} data-title={title} aria-label={`${title}を再生`}><Photo name={name} alt={alt} /><span className="uj-play"><span aria-hidden="true">▶</span><span>映像を見る</span></span></button>; }

export default function UndoJobPage() {
return <div className="uj" id="uj-top">
  <a className="uj-skip" href="#uj-main">本文へ進む</a>
  <header className="uj-header">
    <a className="uj-logo" href="#uj-top" aria-label="運動部のシゴト。 ページの先頭へ"><Image src="/undo-job-assets/channel-logo.jpg" width={58} height={58} alt="" priority /><span>運動部のシゴト。<small>1日密着型採用メディア</small></span></a>
    <nav aria-label="メインナビゲーション"><a href="#uj-strengths">3つの強み</a><a href="#uj-reality">制作映像</a><a href="#uj-use">採用での活用</a></nav>
    <a className="uj-header-cta" href={GUIDE}>サービス資料 <Arrow /></a>
  </header>
  <main id="uj-main">
    <section className="uj-hero" aria-labelledby="uj-hero-title">
      <div className="uj-hero-copy">
        <p className="uj-eyebrow"><i />体育会経験者を採用したい企業へ</p>
        <h1 id="uj-hero-title" className="uj-concept-title uj-title-v5">挑戦したい人に<br />刺さる、<br />採用PR動画を<br /><span className="uj-mark">制作します。</span></h1>
        <p className="uj-hero-lead uj-concept-lead">体育会人材を採用したい企業のための、<br /><strong>1日密着型採用メディア。</strong></p>
        <CTAs />
      </div>
      <div className="uj-hero-visual"><HeroFilm /><div className="uj-film-edge" aria-hidden="true">PEOPLE. WORK. REAL.</div><a href="#uj-reality" className="uj-hero-watch"><span className="uj-round-arrow">↗</span><span>なぜ、この会社で働くのか。<br /><strong>実際の制作映像を見る。</strong></span></a></div>
    </section>

    <section className="uj-section uj-problem" id="uj-problem">
      <div className="uj-wrap"><Tag n="01">採用担当者の皆さまへ</Tag>
        <h2 data-uj-reveal>多くの企業が求める、<br />体育会人材。<br /><em>何かに熱中してきた人は、<br /><span className="uj-dream-line">「また夢中になれる<br className="uj-mobile" />環境」を求めています。</span></em></h2>
        <div className="uj-gap uj-gap-deep">
          <div className="uj-company-words"><span className="uj-mini-label">企業が伝えていること</span><p>体育会歓迎。</p><p>若手が活躍。</p><p>チームワーク。</p><p>成長できる環境。</p></div>
          <div className="uj-gap-arrow" aria-hidden="true">→<span>その言葉の、<br />もう一つ奥へ。</span></div>
          <div className="uj-candidate-words"><p>あの頃みたいに、<br />仕事にも本気に<br />なれるだろうか。</p><ul><li>どんな仕事と責任を任される？</li><li>自分を高めてくれる仲間はいる？</li><li>大変なとき、どう向き合うチーム？</li></ul></div>
        </div>
      </div>
    </section>

    <section className="uj-section uj-reality" id="uj-reality"><div className="uj-wrap">
      <Tag n="02">多くの企業が苦戦する、カルチャー理解の促進。</Tag><h2 data-uj-reveal>テキストでは伝わらない<br />「挑戦できる環境」が、<br /><em>1日密着動画なら伝わる。</em></h2>
      <div className="uj-compare-open">
        <div className="uj-compare-words"><p className="uj-compare-label">01　求人票の言葉</p><div className="uj-job-sheet"><p className="uj-job-top">RECRUITMENT <span>表現例</span></p><h3>仕事に本気で、<br />向き合える会社です。</h3><div className="uj-job-pills"><span>体育会歓迎</span><span>若手活躍</span><span>チームで成長</span></div></div><p className="uj-compare-question">その「本気」は、どんな姿だろう。</p></div>
        <div className="uj-compare-arrow" aria-hidden="true">→</div>
        <div className="uj-compare-film"><p className="uj-compare-label">02　密着した一日</p><FilmButton name="okada-5" alt="一人ひとりに向き合い、オンラインで個別指導を行う実際の仕事風景" id="QT5ZYECnOUM" start={790} title="密着した一日。準備から指導へ、本気の姿を見る" /><h3>準備する。考える。<br />一人ひとりと、向き合う。</h3><button className="uj-compare-cta" type="button" data-uj-video="QT5ZYECnOUM" data-start="790" data-title="密着した一日。準備から指導へ">この場面を、映像で見る <span aria-hidden="true">▶</span></button></div>
      </div>
    </div></section>

    <Strengths />

    <section className="uj-section uj-evidence" id="uj-evidence"><div className="uj-wrap">
      <Tag n="04">DATA ／ 調査で確認できること</Tag>
      <div className="uj-section-head"><h2 data-uj-reveal>データにも表れる、<br /><em>人と、環境へのこだわり。</em></h2></div>
      <div className="uj-data-grid">
        <article className="uj-stat"><p className="uj-stat-population">2026年卒 体育会学生・102名</p><div className="uj-stat-number" role="img" aria-label="63パーセント"><span data-uj-count="63" aria-hidden="true">63</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'63%'}} /></div><h3>人間関係・職場の雰囲気に注目。</h3><p>就職先を選ぶ際、特に見るポイント。</p><a className="uj-source-link" href="#uj-research">調査・出典を見る ↗</a></article>
        <article className="uj-stat"><p className="uj-stat-population">運動部所属大学生・調査全体1,225名</p><div className="uj-stat-number" role="img" aria-label="68パーセント"><span data-uj-count="68" aria-hidden="true">68</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'68%'}} /></div><h3>相談しやすく、安心して働きたい。</h3><p>働きたい環境に「相談しやすく、心理的安全性が高い」を選択。</p><a className="uj-source-link" href="#uj-research">調査・出典を見る ↗</a></article>
      </div>
    </div></section>

    <section className="uj-section uj-three-lenses" id="uj-content"><div className="uj-wrap"><p className="uj-tag"><span>人・仕事・チーム</span>一日の中で伝える3つ</p><h2 data-uj-reveal>働く姿を見れば、<br /><em>会社の輪郭が見えてくる。</em></h2><div className="uj-lenses-grid"><article><div className="uj-lens-identity"><ConceptIcon kind="person" /><span className="uj-lens-name">人</span></div><h3>どんな人と<br />働くのか。</h3><p>経歴だけでなく、選択と行動。<br />なぜ、この会社と仕事を選んだのか。</p></article><article><div className="uj-lens-identity"><ConceptIcon kind="work" /><span className="uj-lens-name">仕事</span></div><h3>何を任され、<br />どう働くのか。</h3><p>準備、判断、責任、工夫。<br />やりがいも、難しさも、実際の場面から。</p></article><article><div className="uj-lens-identity"><ConceptIcon kind="team" /><span className="uj-lens-name">チーム</span></div><h3>誰と、どう<br />進めているのか。</h3><p>相談、役割分担、意見の違い。<br />会話と関わり方から、職場の文化を。</p></article></div></div></section>

    <section className="uj-section uj-use uj-use-v5" id="uj-use"><div className="uj-wrap"><Tag n="05">動画の活用シーン</Tag><h2 data-uj-reveal>私たちのメディアへの掲載から、<br /><em>候補者との、あらゆる接点へ。</em></h2>
      <div className="uj-distribution">
        <div className="uj-url-origin"><FilmButton name="cafe-5" alt="カフェ店主が仕事への想いを語る、実際の密着映像" id="QzPRS_T-D4Q" start={761} title="カフェ店主の一日に密着。仕事への想いを聞く" /><h3>一本の動画を、<br />何度でも届ける。</h3><a href="https://www.youtube.com/watch?v=QzPRS_T-D4Q" target="_blank" rel="noreferrer">動画URL <Arrow /></a></div>
        <div className="uj-use-branches">
          <article><span className="uj-use-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="24" height="22" rx="2"/><path d="M4 11h24M12 11v16"/></svg></span><div><h3>採用サイトへの埋め込み</h3><p>社員紹介やカルチャーページで、<br />働くリアルを伝える。</p></div><UsePreview kind="site" /></article>
          <article><span className="uj-use-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="6" width="26" height="20" rx="2"/><path d="m4 8 12 9L28 8"/></svg></span><div><h3>候補者へのメール送信</h3><p>スカウトや選考フォローにURLを添え、<br />会う前から、会社を知ってもらう。</p></div><UsePreview kind="mail" /></article>
          <article><span className="uj-use-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="26" height="22" rx="4"/><path d="m13 11 9 5-9 5Z"/></svg></span><div><h3>御社YouTubeとの<br />タイアップ投稿</h3><p>御社の発信とも連動し、<br />採用コンテンツとして使い続ける。</p></div><UsePreview kind="youtube" /></article>
        </div>
      </div>
      <p className="uj-use-terms">画面は活用イメージです。掲載・利用方法は、契約内容に応じて設計します。</p>
      <div className="uj-before-apply"><div className="uj-small-stat" role="img" aria-label="69パーセント"><span data-uj-count="69" aria-hidden="true">69</span><small aria-hidden="true">%</small></div><div><p className="uj-mini-label">エン転職ユーザー調査</p><h3>採用動画を見たいのは、<br />「応募する前」。</h3><p className="uj-source-brief">エン転職ユーザー調査・全体1,393名<br /><a href="#uj-research">調査・出典を見る ↗</a></p></div></div>
    </div></section>

    <section className="uj-positioning uj-positioning-v4"><div className="uj-wrap"><p className="uj-mini-label">KYUTEだから、良い動画が撮れる理由</p><div className="uj-triple-statement"><p><span>採用を分かっているから、</span><strong>伝える内容を外さない。</strong></p><p><span>YouTubeを分かっているから、</span><strong>会社説明で終わらない。</strong></p><p><span>体育会を分かっているから、</span><strong>表面的な美談で終わらない。</strong></p></div></div></section>

    <section className="uj-final uj-request-section" id="uj-download"><div className="uj-wrap uj-request-layout"><div className="uj-request-copy"><p className="uj-tag"><span>サービス資料</span></p><h2 data-uj-reveal>選ばれる理由を、<br /><em>御社の一日から。</em></h2><p>サービスの考え方と、動画の活用方法を<br />紹介スライドのPDFでお届けします。</p><ul><li>採用したい人物像からの企画設計</li><li>1日密着で伝える、人・仕事・チーム</li><li>自社メディアと採用活動での活用</li></ul></div><div id="request-material" className="uj-request-panel"><MaterialRequestForm /></div></div></section>
    <section className="uj-research" id="uj-research"><div className="uj-wrap"><details><summary><span>調査・出典</span><span>根拠と調査条件を確認する ＋</span></summary><div className="uj-research-content"><p>「また夢中になれる環境」などの候補者理解は、調査や個別の語りから導いた企画仮説です。体育会経験者にも価値観の違いがあり、学生調査を中途人材全体や採用効果へ一般化するものではありません。再生数・応募数の保証は行いません。</p><ol>
<li><a href="https://www.sports-f.co.jp/survey-report/2026-07-15-4/" target="_blank" rel="noreferrer">スポーツフィールド｜27卒2月 体育会学生の就職活動状況調査 ↗</a><p>2026年2月1〜28日・調査全体1,225名、複数回答、個別設問n未公表。働きたい環境に「相談しやすく、心理的安全性が高い」を選択した68%を掲載。</p></li>
<li><a href="https://note.onecareer.co.jp/n/n26c6edadd416" target="_blank" rel="noreferrer">ONE CAREER｜学生時代を超える挑戦と成長を。 ↗</a><p>体育会出身社員3名の座談会。熱意ある同僚や挑戦の機会を選んだ語りを、没頭や成長の仮説に生かしています。一社の個別事例であり、社員間にも価値観の違いがあります。</p></li>
<li><a href="https://prtimes.jp/main/html/rd/p/000000099.000036999.html" target="_blank" rel="noreferrer">アーシャルデザイン｜体育会系学生の就職活動実態調査 ↗</a><p>2024年11月11日〜2025年1月29日・イベント参加学生102名、複数回答。仕事内容70%、人間関係・職場の雰囲気63%など。スポーツ経験を就活でアピールできるとする回答は97%。強みとしてチームワークや目標への努力も挙がっています。</p></li>
<li><a href="https://www.sports-f.co.jp/news/20190704-1/" target="_blank" rel="noreferrer">スポーツフィールド｜20卒体育会学生の就職活動レポート ↗</a><p>2019年3月・イベント参加者約4,000名。企業選択の第1希望は人間関係18.3%、成長環境17.4%。過去の傾向を示す補助資料として参照しています。</p></li>
<li><a href="https://athlete-p.co.jp/news_release/pdf/20210615.pdf" target="_blank" rel="noreferrer">アスリートプランニング｜2021年 体育会学生の企業選びに関する調査 ↗</a><p>2021年4月・回答315件。図中のn=879を879名とは扱いません。「レベルの高い仲間」は成長・研修との複合選択肢です。旧PDFは現在トップページへ転送され、公式PDFの検索収録テキストで部分確認。数値の主要根拠には用いていません。</p></li>
<li><a href="https://www.jstage.jst.go.jp/article/jspehssconf/72/0/72_198/_article/-char/ja/" target="_blank" rel="noreferrer">宮﨑・松尾｜キャリア形成をめぐる体育会文化に関する実証的研究 ↗</a><p>2022年・競技を引退した大学4年生7名の質的研究。競技経験と自己理解の関係を考える思想背景です。特定の企業への選好や動画の効果を示す証拠ではありません。<a href="https://jssspe.org/wp-content/uploads/b27a4f8bc3f44815500470fff7ebadf0.pdf" target="_blank" rel="noreferrer">学会公式の長版抄録 ↗</a></p></li>
<li><a href="https://corp.en-japan.com/newsrelease/2025/41694.html" target="_blank" rel="noreferrer">エン・ジャパン｜採用動画調査 ↗</a><p>2025年4月1〜30日・エン転職ユーザー、調査全体1,393名。視聴希望のタイミングに「応募前」を選択した69%を掲載。複数回答、個別設問n未公表。体育会限定の調査ではありません。</p></li><li><a href="https://www2.jpx.co.jp/disc/70800/140120260511523654.pdf" target="_blank" rel="noreferrer">スポーツフィールド｜2026年 第1四半期決算説明資料 ↗</a><p>体育会学生中心の採用イベントへの企業需要と、スポナビ27卒向け紹介企業1,413社（2026年3月末時点、重複なし）を確認。「多くの企業が求める」の背景資料です。一事業者の実績であり、企業全体の割合ではありません。</p></li></ol></div></details></div></section>

  </main>
  <footer className="uj-footer"><a className="uj-wordmark" href="#uj-top">運動部のシゴト。<i /></a><p>企画・制作・運営　KYUTE合同会社</p><div><a href="https://www.kyute.jp/about">運営会社 ↗</a><a href={CONTACT}>お問い合わせ ↗</a><a href="#uj-top">TOP ↑</a></div><small>© KYUTE</small></footer>
  <div className="uj-mobile-cta"><a href={GUIDE}>サービス資料をDL <Arrow /></a><a href={CONTACT}>制作を相談する <Arrow /></a></div>
  <Runtime />
</div>;
}
