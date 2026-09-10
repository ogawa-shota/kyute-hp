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
  description: '競技経験の、その奥にある気持ちから。元運動部・体育会経験者のインサイト仮説をもとに、質問・撮影・編集を設計する採用プロモーション動画。1日密着制作と自社メディアへの掲載。',
  alternates: { canonical: 'https://www.kyute.jp/lp/undo-job' },
  openGraph: { title: '元体育会・元運動部に刺さる、採用プロモーション動画を作ります。', description: '競技経験の、その奥にある気持ちから。候補者理解を、質問・撮影・編集に変える1日密着。', url: 'https://www.kyute.jp/lp/undo-job', images: [{ url: '/lp-assets/studio/okada-2.webp', width: 1112, height: 626 }], locale: 'ja_JP', type: 'website' },
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
        <p className="uj-hero-lead"><strong>競技経験の、その奥にある気持ちから。</strong><br />何に惹かれ、どんな仲間と働きたいのか。<br />その理解を、質問・撮影・編集に変える1日密着。</p>
        <CTAs />
        <div className="uj-hero-scope"><span>インサイトから企画</span><b>→</b><span>1日密着・編集</span><b>→</b><span>自社メディアに掲載</span></div>
      </div>
      <div className="uj-hero-visual"><HeroFilm /><div className="uj-film-edge" aria-hidden="true">PEOPLE. WORK. REAL.</div><a href="#uj-films" className="uj-hero-watch"><span className="uj-round-arrow">↗</span><span>「この人たち、分かっている」<br /><strong>そう思える一本を。</strong></span></a></div>
      <div className="uj-hero-bottom"><span>あの頃、大切にしていたこと。<br className="uj-mobile" />これから、仕事で大切にしたいこと。</span><a href="#uj-problem">その接点を、映像に。 <Arrow down /></a></div>
    </section>

    <section className="uj-section uj-problem" id="uj-problem">
      <div className="uj-wrap"><Tag n="01">採用担当者の皆さまへ</Tag>
        <h2 data-uj-reveal>「体育会歓迎」の先まで、<br /><em>候補者を理解できていますか。</em></h2>
        <p className="uj-section-intro">企業が伝えている言葉と、候補者の中にある気持ち。<br />その間に、まだ言葉になっていない「選ぶ理由」があるかもしれません。</p>
        <div className="uj-gap uj-gap-deep">
          <div className="uj-company-words"><span className="uj-mini-label">企業が伝えていること</span><p>体育会歓迎。</p><p>若手が活躍。</p><p>チームワーク。</p><p>成長できる環境。</p><span className="uj-company-caption">属性・制度・抽象語で、止まっていないか。</span></div>
          <div className="uj-gap-arrow" aria-hidden="true">→<span>その言葉の、<br />もう一つ奥へ。</span></div>
          <div className="uj-candidate-words"><span className="uj-mini-label">候補者の心にあるかもしれない問い</span><p>あの頃みたいに、<br />仕事にも本気に<br />なれるだろうか。</p><ul><li>本気で同じ目標を追える仲間はいる？</li><li>自分よりすごいと思える人と働ける？</li><li>努力した分だけ、成長を実感できる？</li><li>苦しいときも、チームで前を向ける？</li></ul></div>
        </div>
        <div className="uj-problem-bridge"><p>「体育会歓迎」という一言では、<br className="uj-mobile" /><strong>ここまでは伝わらない。</strong></p><span>「運動部のシゴト。」は、競技経験と地続きの感情を手がかりに、<br />何を撮り、誰に何を聞き、どう編集するかを考えます。</span></div>
        <p className="uj-note uj-hypothesis-note">候補者の問いは、調査や個別の語りから導く企画仮説です。体育会経験者全員の考え方を表すものではありません。</p>
      </div>
    </section>

    <section className="uj-section uj-evidence" id="uj-evidence"><div className="uj-wrap">
      <Tag n="02">DATA ／ 調査で確認できること</Tag>
      <div className="uj-section-head"><h2 data-uj-reveal>条件に加えて、<br /><em>人と、働く環境も。</em></h2><p>どんな人と、どう働くか。<br />体育会学生の企業選びでも、<br />人間関係や職場の空気は見られています。</p></div>
      <div className="uj-data-grid">
        <article className="uj-stat"><p className="uj-stat-population">2026年卒 体育会学生</p><div className="uj-stat-number" role="img" aria-label="63パーセント"><span data-uj-count="63" aria-hidden="true">63</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'63%'}} /></div><h3>人間関係・職場の雰囲気に注目。</h3><p>就職先を選ぶ際、特に見るポイント。</p><p className="uj-source">アーシャルデザイン／同社就活イベント参加者 n=102／2024年11月11日〜2025年1月29日／複数回答。<a href="https://prtimes.jp/main/html/rd/p/000000099.000036999.html" target="_blank" rel="noreferrer">調査原典 ↗</a></p></article>
        <article className="uj-stat"><p className="uj-stat-population">運動部所属の大学生</p><div className="uj-stat-number" role="img" aria-label="68パーセント"><span data-uj-count="68" aria-hidden="true">68</span><small aria-hidden="true">%</small></div><div className="uj-stat-rule"><i style={{width:'68%'}} /></div><h3>相談しやすく、安心して働きたい。</h3><p>働きたい環境に「相談しやすく、心理的安全性が高い」を選択。</p><p className="uj-source">スポーツフィールド／2026年2月1〜28日／調査全体 n=1,225／複数回答。個別設問のnは未公表。<a href="https://www.sports-f.co.jp/survey-report/2026-07-15-4/" target="_blank" rel="noreferrer">調査原典 ↗</a></p></article>
      </div>
      <p className="uj-data-insight">「人」と「環境」を重視する。その背景に、どんな経験があるのか。</p><p className="uj-note">いずれも学生対象の調査です。元体育会の中途人材全体の傾向や、本サービスの採用効果を示すものではありません。</p>
      <div className="uj-qualitative"><div><p className="uj-step-label"><b>VOICE</b><span>一人の語りが、仮説の手がかりになる</span></p><h3>また、没頭できる場所を<br />探しているのかもしれない。</h3></div><div><p>ONE CAREERの社員座談会には、仕事に情熱を持つ人や、挑戦を任せてもらえる環境を選んだ柔道経験者が登場します。一方、別の社員は、自分の強みに合わせた上司の関わりを語っています。</p><p className="uj-qual-insight">「本気になれる」と「自分らしく力を伸ばせる」。<br /><strong>どちらも、その人が求める環境を知る手がかりです。</strong></p><p className="uj-source">ONE CAREER「学生時代を超える挑戦と成長を。」／体育会出身社員3名の座談会。初出2024年10月、掲載2025年10月。採用広報の個別事例であり、全体傾向ではありません。<a href="https://note.onecareer.co.jp/n/n26c6edadd416" target="_blank" rel="noreferrer">記事を読む ↗</a></p></div></div>
    </div></section>

    <InsightDesign />

    <section className="uj-section uj-reality" id="uj-reality"><div className="uj-wrap">
      <Tag n="04">理解の深さを、実際の映像へ</Tag><h2 data-uj-reveal>伝える言葉が同じでも、<br /><em>映す場面は変えられる。</em></h2><p className="uj-section-intro">たとえば「仕事に本気」という魅力。<br />本人の言葉に、準備や工夫の場面を重ねれば、その中身が見えてきます。</p>
      <div className="uj-switch" role="group" aria-label="伝え方を切り替える"><button type="button" aria-pressed="true" data-uj-mode="words">01　求人票の言葉</button><button type="button" aria-pressed="false" data-uj-mode="film">02　密着した一日 <span aria-hidden="true">↗</span></button></div>
      <div className="uj-comparison" data-uj-comparison="words">
        <div className="uj-before"><div className="uj-job-sheet"><p className="uj-job-top">RECRUITMENT <span>募集要項の表現例</span></p><h3>仕事に本気で、<br />向き合える会社です。</h3><div className="uj-job-pills"><span>体育会歓迎</span><span>若手活躍</span><span>チームで成長</span></div><p>チームワークを大切にしながら、<br />一人ひとりの挑戦を応援しています。</p><span className="uj-job-line" /><span className="uj-job-line uj-short" /></div><p className="uj-before-question">「それって実際、どんな感じ？」</p></div>
        <div className="uj-after" hidden><FilmButton name="okada-5" alt="試合分析をもとに、オンラインで個別指導をする実際の仕事風景" id="QT5ZYECnOUM" start={790} title="準備から指導へ。仕事へのこだわりを見る" /><div className="uj-after-caption"><span>13:10〜 ／ 実際の制作映像</span><h3>準備する。考える。<br />一人ひとりと、向き合う。</h3><p>その人が本気である理由を、言葉と行動から知る。</p></div></div>
      </div>
      <div className="uj-scenes"><div><b>先ほどの企画を、御社の日常で。</b><p>チームが立て直す会話 ／ 助言を受けて変わる仕事 ／<br />本人がこだわる準備 ／ 誰かの挑戦を支える場面</p></div><p>表情。声。会話の間。<br /><strong>文字では伝えきれない、<br />その会社らしさがある。</strong></p></div>
    </div></section>

    <section className="uj-documentary"><div className="uj-wrap"><Tag n="05">だから、1日密着ドキュメンタリー</Tag><h2 data-uj-reveal>会社説明から、<br /><span>「この人たちと<br className="uj-mobile" />働きたい」へ。</span></h2><div className="uj-format-compare"><div><span>会社の情報を伝える</span><p>事業・制度・オフィス</p></div><span className="uj-format-plus" aria-hidden="true">＋</span><div><span>一日の中で、働く理由を伝える</span><p>人柄・姿勢・チーム・葛藤</p></div></div><p className="uj-doc-text">目標を語る声。そのために手を動かす姿。仲間とのやりとり。<br />一日を追い、言葉と行動がつながる瞬間を探す。<br />競技経験者が、そこで働く自分を想像できるように。</p></div></section>

    <section className="uj-section uj-films" id="uj-films"><div className="uj-wrap"><Tag n="06">「運動部のシゴト。」の制作映像</Tag><div className="uj-section-head"><h2 data-uj-reveal>経歴を紹介する、その先へ。<br /><em>いま、何に心を動かしているか。</em></h2><a className="uj-text-link" href="https://www.youtube.com/@undo-job/videos" target="_blank" rel="noreferrer">公式YouTubeを見る <Arrow /></a></div>
      <article className="uj-feature-film"><div className="uj-feature-visual"><FilmButton name="okada-2" alt="パソコンを前に、分析について語る教育事業の起業家" id="QT5ZYECnOUM" title="筑波大蹴球部からオンライン塾を起業した24歳の一日" /><span className="uj-film-index" aria-hidden="true">01</span></div><div className="uj-feature-story"><p className="uj-mini-label">筑波大蹴球部 → 教育事業</p><h3>追いかける目標は、<br />変わっても。</h3><p>プロを断念し、オンライン塾で起業。<br />競技と向き合った経験は、<br />いま、誰かを教える仕事の中にある。</p><div className="uj-chapter"><span>この作品で見せていること</span><p>指導の前に、どこまで準備するのか。<br />競技の経験が、いまの仕事でどう生きているのか。</p><button type="button" data-uj-video="QT5ZYECnOUM" data-start="790" data-title="準備から個別指導へ" className="uj-text-link">13:10〜の場面を見る <Arrow /></button></div><a className="uj-original" href="https://www.youtube.com/watch?v=QT5ZYECnOUM" target="_blank" rel="noreferrer">YouTubeで本編を見る（30:47） ↗</a></div></article>
      <div className="uj-film-rail"><article><FilmButton name="cafe-5" alt="カフェを開業した理由について語る女性経営者" id="QzPRS_T-D4Q" title="外資コンサルからカフェを開業した女性の一日" /><div className="uj-film-meta"><span>02</span><p>外資コンサル → カフェ開業</p></div><h3>自分が大切にしたいことを、<br />仕事にする。</h3><p>肩書きからは分からない、仕事を選んだ理由。<br />何を大切にしたい人なのか、その背景に近づく。</p><button className="uj-text-link" type="button" data-uj-video="QzPRS_T-D4Q" data-start="761" data-title="カフェ開業への想い">12:41〜 想いを語る場面 <Arrow /></button></article><article><FilmButton name="uosaki-2" alt="普段の会話を通して、自分の考えを話す起業家" id="wtRbJX3bq4o" title="慶大法学部から新卒短期離職を経て起業した26歳の一日" /><div className="uj-film-meta"><span>03</span><p>新卒での短期離職 → 起業</p></div><h3>肩書きの先に、<br />その人らしい働き方がある。</h3><p>用意した自己紹介に収まらない人柄。<br />何気ない場面の選択や会話から、その人を知る。</p><button className="uj-text-link" type="button" data-uj-video="wtRbJX3bq4o" data-start="399" data-title="何気ない会話から人柄を知る">06:39〜 会話の場面 <Arrow /></button></article></div>
      <p className="uj-note uj-work-note">掲載映像はKYUTEが運営する自社メディアの制作作品です。企画・撮影・編集の表現例として紹介しており、顧客企業の採用導入・成果事例ではありません。見出しは作品紹介用の編集コピーです。</p>
    </div></section>

    <section className="uj-section uj-reasons" id="uj-reasons"><div className="uj-wrap"><Tag n="07">運動部のシゴト。の企画・制作</Tag><h2 data-uj-reveal>体育会という属性から、<br /><em>その人が選ぶ理由へ。</em></h2>
      <div className="uj-reason-grid"><article className="uj-reason-first"><span className="uj-reason-no">01</span><div><h3>競技経験の中で、<br />何を大切にしてきた人なのか。</h3><p>同じ競技でも、没頭した理由や、仲間との関係は違います。<br />採用したい人の原体験を考え、御社のどの魅力とつながるのかを仮説にします。</p><div className="uj-planning"><span>競技での原体験</span><b>→</b><span>仕事に求めるもの</span><b>→</b><span>御社で映す一日</span></div></div></article><article><span className="uj-reason-no">02</span><div><h3>質問を、一段深く。<br />具体的な出来事まで。</h3><p>「仲が良い」「成長できる」で終えず、誰が、いつ、どう関わったかを聞く。本人の言葉と現場の事実を確かめます。</p></div></article><article><span className="uj-reason-no">03</span><div><h3>心が動く順番で、<br />一本の物語に。</h3><p>目標、葛藤、工夫、仲間の存在。YouTube制作の視点で、知りたい問いから入り、仕事を続ける理由へと編集します。</p></div></article><article><span className="uj-reason-no">04</span><div><h3>公開の先でも、<br />選ぶ理由を届ける。</h3><p>動画URLを求人、スカウト、面談へ。採用ターゲットとの接点で、自分の価値観と仕事を重ねてもらう設計です。</p></div></article></div>
      <div className="uj-media-note"><Image src="/undo-job-assets/channel-logo.jpg" width={92} height={92} alt="運動部のシゴト。公式ロゴ" /><div><h3>元運動部の「今」を追うから、次の問いが生まれる。</h3><p>「運動部のシゴト。」は、元運動部の働く姿を取材し、公開する自社メディア。<br />競技の経験が仕事にどうつながるかを問い続け、採用動画の企画に生かします。</p></div><a href="https://www.youtube.com/@undo-job" target="_blank" rel="noreferrer" aria-label="運動部のシゴト。公式YouTubeへ">↗</a></div>
    </div></section>

    <section className="uj-section uj-use" id="uj-use"><div className="uj-wrap"><Tag n="08">理解を、応募前から届ける</Tag><div className="uj-section-head"><h2 data-uj-reveal>「自分にも、重なる」。<br /><em>その気持ちを、採用の接点へ。</em></h2><p>「気になる」から「自分に合いそう」へ。<br />応募の前も、その後も。<br />人と仕事を知る接点をつくります。</p></div>
      <div className="uj-journey" aria-label="候補者の体験"><div><small>出会う</small><strong>認知・求人<br />スカウト</strong></div><span aria-hidden="true">→</span><div className="uj-journey-key"><small>知る</small><strong>動画を見る</strong><p>人・仕事・カルチャーを理解</p></div><span aria-hidden="true">→</span><div><small>重ねる</small><strong>自分に<br />合いそう</strong></div><span aria-hidden="true">→</span><div><small>進む</small><strong>応募・面接<br />入社へ</strong></div></div>
      <div className="uj-use-list"><div><b>応募前</b><h3>採用サイト・求人・スカウト</h3><p>条件に加え、仕事への姿勢や仲間を知ってもらう。</p></div><div><b>選考中</b><h3>説明会・カジュアル面談・面接</h3><p>「どの場面に惹かれたか」から、価値観を話す。</p></div><div><b>内定後</b><h3>内定者フォロー</h3><p>自分がどんな役割で力を発揮するか、具体的に。</p></div></div>
      <div className="uj-before-apply"><div className="uj-small-stat" role="img" aria-label="69パーセント"><span data-uj-count="69" aria-hidden="true">69</span><small aria-hidden="true">%</small></div><div><p className="uj-mini-label">エン転職ユーザー調査</p><h3>採用動画を見たいのは、<br />「応募する前」。</h3><p className="uj-source">エン・ジャパン／2025年4月1〜30日／調査全体 n=1,393／複数回答。個別設問のnは未公表。<a href="https://corp.en-japan.com/newsrelease/2025/41694.html" target="_blank" rel="noreferrer">調査原典 ↗</a><br />体育会経験者に限定した調査ではなく、長尺密着動画の優位性や採用成果を示す数値ではありません。</p></div></div>
      <p className="uj-takeaway">増やしたいのは、<br className="uj-mobile" /><strong>その会社に「入りたい人」。</strong></p>
      <p className="uj-note">動画URLの掲載・埋め込み可否は各媒体の仕様に従います。動画ファイルの二次利用・再編集・広告利用などの条件は、個別に確認します。</p>
    </div></section>

    <section className="uj-section uj-flow"><div className="uj-wrap"><Tag n="09">企画から、採用での活用まで</Tag><h2 data-uj-reveal>撮影前から、<br /><em>候補者の気持ちを考え抜く。</em></h2><ol><li><span>01</span><h3>人物像と仮説</h3><p>原体験・仕事への期待と、<br />御社の魅力の接点を探す。</p></li><li><span>02</span><h3>問いと場面を設計</h3><p>誰に何を聞き、<br />どの仕事を追うかを選ぶ。</p></li><li><span>03</span><h3>取材で確かめる</h3><p>本人の言葉と行動から、<br />企画を更新し、編集する。</p></li><li><span>04</span><h3>確認・公開・活用</h3><p>内容を確認してメディアへ。<br />採用で使う動画URLを共有。</p></li></ol><p className="uj-note">撮影範囲・費用・制作期間は、ご相談内容に合わせてご案内します。</p>
      <div className="uj-faq"><h3>よくあるご質問</h3><div><details><summary>撮影する社員は、体育会出身である必要がありますか？<span aria-hidden="true">＋</span></summary><p>まず採用ターゲットと、届けたい魅力を整理します。その魅力が自然に伝わる出演者や場面を、一緒に検討します。出演条件はご相談ください。</p></details><details><summary>動画を自社の採用活動で使えますか？<span aria-hidden="true">＋</span></summary><p>公開した動画URLを共有し、採用サイトやスカウト、説明会、面接前後などでの活用を想定しています。埋め込みは各媒体の仕様、ファイル納品・再編集・広告利用は契約条件をご確認ください。</p></details><details><summary>掲載すれば、応募が集まりますか？<span aria-hidden="true">＋</span></summary><p>応募数や視聴数を保証するサービスではありません。採用したい人に、人・仕事・カルチャーが伝わるコンテンツを企画・制作し、自社メディアで公開します。</p></details><details><summary>費用や撮影日数は、どのくらいですか？<span aria-hidden="true">＋</span></summary><p>1日密着ドキュメンタリーを基本に、取材対象や撮影範囲、編集内容に合わせてご案内します。費用とスケジュールはご相談時にすり合わせます。</p></details></div></div>
    </div></section>

    <section className="uj-research" id="uj-research"><div className="uj-wrap"><details><summary><span>調査とインサイトの、境界を明らかに。</span><span>参考にした6つの調査・記事を読む ＋</span></summary><div className="uj-research-content"><p>数値は調査対象・時期・設問の範囲で読み、競技経験と仕事選びの接点は、候補者理解の仮説として扱います。学生調査を、元運動部の社会人全体へ一般化するものではありません。</p><ol>
<li><a href="https://www.sports-f.co.jp/survey-report/2026-07-15-4/" target="_blank" rel="noreferrer">スポーツフィールド｜27卒2月 体育会学生の就職活動状況調査 ↗</a><p>2026年2月・調査全体1,225名。社員の日常や相談しやすい環境への関心を、会社の具体的な姿を映す企画に接続しています。</p></li>
<li><a href="https://note.onecareer.co.jp/n/n26c6edadd416" target="_blank" rel="noreferrer">ONE CAREER｜学生時代を超える挑戦と成長を。 ↗</a><p>体育会出身社員3名の座談会。熱意ある同僚や挑戦の機会を選んだ語りを、没頭や成長の仮説に生かしています。一社の個別事例であり、社員間にも価値観の違いがあります。</p></li>
<li><a href="https://prtimes.jp/main/html/rd/p/000000099.000036999.html" target="_blank" rel="noreferrer">アーシャルデザイン｜体育会系学生の就職活動実態調査 ↗</a><p>2024年11月〜2025年1月・イベント参加学生102名。仕事内容70%、人間関係・職場の雰囲気63%など。スポーツ経験を就活でアピールできるとする回答は97%。強みとしてチームワークや目標への努力も挙がっています。</p></li>
<li><a href="https://www.sports-f.co.jp/news/20190704-1/" target="_blank" rel="noreferrer">スポーツフィールド｜20卒体育会学生の就職活動レポート ↗</a><p>2019年3月・イベント参加者約4,000名。企業選択の第1希望は人間関係18.3%、成長環境17.4%。過去の傾向を示す補助資料として参照しています。</p></li>
<li><a href="https://athlete-p.co.jp/news_release/pdf/20210615.pdf" target="_blank" rel="noreferrer">アスリートプランニング｜2021年 体育会学生の企業選びに関する調査 ↗</a><p>2021年4月・回答315件。図中のn=879を879名とは扱いません。「レベルの高い仲間」は成長・研修との複合選択肢です。旧PDFは現在トップページへ転送され、公式PDFの検索収録テキストで部分確認。数値の主要根拠には用いていません。</p></li>
<li><a href="https://www.jstage.jst.go.jp/article/jspehssconf/72/0/72_198/_article/-char/ja/" target="_blank" rel="noreferrer">宮﨑・松尾｜キャリア形成をめぐる体育会文化に関する実証的研究 ↗</a><p>2022年・競技を引退した大学4年生7名の質的研究。競技経験と自己理解の関係を考える思想背景です。特定の企業への選好や動画の効果を示す証拠ではありません。<a href="https://jssspe.org/wp-content/uploads/b27a4f8bc3f44815500470fff7ebadf0.pdf" target="_blank" rel="noreferrer">学会公式の長版抄録 ↗</a></p></li>
</ol></div></details></div></section>

    <section className="uj-positioning"><div className="uj-wrap"><p className="uj-mini-label">私たちが大切にする、採用表現</p><h2 data-uj-reveal>元運動部に届けたいのは、<br />スポーツっぽい動画ではない。<br /><em>その気持ちを理解して、<br />つくられた動画だ。</em></h2><p>「体育会」を映像の見た目にするのではなく、企画の解像度にする。<br />競技生活で大切にしてきたことと、御社で働く理由をつなぎます。</p></div></section>

    <section className="uj-final" id="uj-download"><div className="uj-wrap"><p className="uj-tag"><span>次は、御社の一日を。</span></p><h2 data-uj-reveal>採りたい人の気持ちから、<br /><em>採用動画をつくろう。</em></h2><div className="uj-final-bottom"><p>「運動部のシゴト。」と、<br />御社が選ばれる理由を、映像にしませんか？</p><div><CTAs light /><p className="uj-download-note">無料PDF ／ サービス内容・制作例・採用での活用・進め方</p></div></div></div></section>
  </main>
  <footer className="uj-footer"><a className="uj-wordmark" href="#uj-top">運動部のシゴト。<i /></a><p>企画・制作・運営　KYUTE合同会社</p><div><a href="https://www.kyute.jp/about">運営会社 ↗</a><a href={CONTACT}>お問い合わせ ↗</a><a href="#uj-top">TOP ↑</a></div><small>© KYUTE</small></footer>
  <div className="uj-mobile-cta"><a href={GUIDE} download="運動部のシゴト_サービスガイド.pdf">サービス資料をDL <Arrow /></a><a href={CONTACT}>制作を相談する <Arrow /></a></div>
  <Runtime />
</div>;
}
