/* eslint-disable @next/next/no-img-element -- YouTube posters are rendered directly to preserve the existing external thumbnail URLs without image proxying. */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./lp.css";
import LpRuntime from "./LpRuntime";
import MaterialRequestForm from "./MaterialRequestForm";
import { media } from "./media";

export const metadata: Metadata = {
  title: { absolute: "採用密着動画制作サービス" },
  description: "人とカルチャーで、選ばれる会社へ。社員の一日を通して、会社の魅力を伝える採用密着動画制作サービス。",
  alternates: { canonical: "https://kyute.jp/lp/day-in-the-life" },
  openGraph: {
    title: "採用密着動画制作サービス",
    description: "人とカルチャーで、選ばれる会社へ。社員の一日を通して、会社の魅力を伝える採用密着動画制作サービス。",
    url: "https://kyute.jp/lp/day-in-the-life",
    locale: "ja_JP",
    type: "website",
  },
};

const videos = media.videos;

function FilmCard({ video }: { video: (typeof videos)[number] }) {
  return (
    <button type="button" className="film-button" data-video-id={video.id} aria-label={`${video.title} 動画を再生`}>
      <div className="film-image">
        <img src={video.poster} alt={video.originalTitle} loading="lazy" decoding="async" width={1280} height={720} />
        <span className="play" aria-hidden="true">▶</span>
        <span className="duration">{video.duration}</span>
      </div>
      <div className="film-copy"><h3>{video.title.split("、").map((line, index, parts) => <span key={index}>{line}{index < parts.length - 1 ? "、" : ""}</span>)}</h3><p>運営メディア「運動部のシゴト。」</p></div>
    </button>
  );
}

export default function RecruitmentDocumentaryPage() {
  return (
    <div id="documentary-lp" data-variant="proof">
      <header className="site-header">
        <a className="service-name" href="#top">採用密着動画<span>制作サービス</span></a>
        <nav aria-label="メイン">
          <a href="#films">制作動画</a><a href="#craft">こだわり</a><a href="#download">資料を受け取る</a>
          <a className="cta" href="#request-material" data-download="header">資料を受け取る<span aria-hidden="true">→</span></a>
        </nav>
      </header>
      <main>
<section className="cinema-hero" id="top">
<div className="hero-media" id="hero-media" aria-hidden="true">
</div>
<div className="hero-shade">
</div>
<div className="hero-copy wrap">
<h1>“いい人”を<br />採用するなら、<br />
<em>密着動画。</em>
</h1>
<p className="hero-sub">人とカルチャーのリアルを伝えて、<br />欲しい人材に来てもらえる採用を</p>
<a className="cta" href="#request-material" data-download="hero">資料を受け取る<span aria-hidden="true">→</span>
</a>
</div>
<div className="hero-bottom">
<a className="scroll-cue" href="#films">制作動画を見る <span aria-hidden="true">→</span>
</a>
<div className="hero-credit">
<span id="hero-status">自社メディア映像／読み込み中</span>
<button id="hero-toggle" type="button" disabled>読み込み中</button>
</div>
</div>
</section>

        <section className="section approach films" id="approach" aria-labelledby="story-heading">
          <div id="films">
            <div className="wrap film-heading" id="first-look">
              <div><h2 id="story-heading">人のストーリーが、<br />企業の魅力を伝える。</h2><p className="section-intro">実際の制作動画をご紹介します。<br />働く人の選択と想いを、ドキュメンタリーで届けます。</p></div>
              <div className="rail-controls"><button type="button" data-scroll="-1" aria-label="前の動画">←</button><button type="button" data-scroll="1" aria-label="次の動画">→</button></div>
            </div>
            <div className="film-rail" id="film-rail" tabIndex={0} aria-label="制作動画一覧・左右にスクロール">{videos.map((video) => <FilmCard key={video.id} video={video} />)}</div>
          </div>
        </section>

<section className="section evidence" id="why">
<div className="wrap">
<h2>人とカルチャーで<br />会社を選ぶ人は増えている</h2>
<p className="evidence-period">入社先を決めた理由｜2024年卒 → 2025年卒</p>
<div className="charts">
{[
  { label: "社員の雰囲気・人柄が自分に合う", before: 40.9, after: 42.4 },
  { label: "社風が自分に合う", before: 35.0, after: 37.5 },
].map((item) => (
  <figure className="chart" key={item.label}>
    <figcaption>{item.label}</figcaption>
    {[{ year: "2024年卒", value: item.before }, { year: "2025年卒", value: item.after }].map((row, index) => (
      <div className={`bar-row ${index === 0 ? "muted-bar" : ""}`} key={row.year}>
        <div className="bar-label"><span>{row.year}</span><strong>{row.value.toFixed(1)}<small>%</small></strong></div>
        <div className="bar-track" aria-hidden="true"><span style={{ "--value": `${row.value}%` } as CSSProperties} /></div>
      </div>
    ))}
    <div className="chart-scale" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div>
  </figure>
))}
</div>
<p className="evidence-takeaway">人・カルチャーへの共感が、<strong>入社の決め手に。</strong></p>
<p className="chart-note">マイナビ調査／入社先決定者：2024年卒 1,812人・2025年卒 1,898人。複数回答。</p>
<details className="sources">
<summary>調査の対象と出典</summary>
<p>マイナビ「2025年卒大学生活動実態調査」2024年6月公表、14ページ。入社先決定者の「入社予定先企業に決めた理由」を前年と比較。2024年卒1,812人、2025年卒1,898人、複数回答・ウエイトバック。割合は合算しません。<a href="https://career-research.mynavi.jp/wp-content/uploads/2024/06/s-nainaitei-0615.pdf" target="_blank" rel="noopener">原典を見る</a></p>
<p>2024年卒と2025年卒の比較です。現在の求職者全体の傾向や、動画による採用成果を示すものではありません。</p>
</details>
</div>
</section>

        <section className="section reality-gap" aria-labelledby="reality-gap-title">
          <div className="wrap">
            <div className="gap-heading"><p className="gap-lead">しかし、</p><h2 id="reality-gap-title">文字だけでは、<br />会社のリアルは伝わりきらない。</h2><p>媒体やHPに並ぶ「風通しのよい職場」「人がいい会社」。<br />その言葉の奥にある、表情や会話、働く空気まで届けたい。</p></div>
            <div className="reality-comparison" aria-label="言葉による紹介と、密着動画で見えるリアルの比較">
              <div className="words-panel">
                <h3>言葉だけでは</h3>
                <div className="claim-bubbles"><p>風通しのよい職場です</p><p>人がいい会社です</p><p>若手が活躍しています</p></div>
                <div className="candidate-scene"><img src="/lp-assets/candidate-thinking-v9.webp" alt="会社で働く姿を想像して、考えている求職者のイラスト" loading="lazy" decoding="async" width={1536} height={1024} /><p>でも、<br />実際はどうなんだろう？</p></div>
              </div>
              <span className="comparison-arrow" aria-hidden="true">→</span>
              <div className="real-panel">
                <h3>密着動画なら</h3>
                <figure className="team-scene"><img src="/lp-assets/team-conversation-v9.webp" alt="明るい職場で会話するチームのイメージ" loading="lazy" decoding="async" width={1536} height={1024} /><figcaption>イメージ写真</figcaption></figure>
                <ul className="real-details"><li><strong>何気ない会話から、</strong>人柄が見える。</li><li><strong>社員同士の関わり方から、</strong>社風が伝わる。</li><li><strong>働く一日を通して、</strong>仕事のリアルを知る。</li></ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section craft" id="craft">
          <div className="wrap">
            <h2>KYUTEの採用動画が<br />成果につながる理由</h2>
            <div className="craft-grid">
              <article><span className="reason-number" aria-hidden="true">01</span><h3>採用のプロがつくる<br />コンテンツ。</h3><p>誰に来てほしいか。その人は、何に惹かれるのか。採用成果から逆算して、人とカルチャーの魅力を届けます。</p><figure className="reason-scene"><img src="/lp-assets/engagement-scene-v10.webp" alt="仕事のやりがいを自分の言葉で語る、本編映像の一場面" loading="lazy" decoding="async" width={1257} height={707} /><figcaption><strong>やりたいことに本気で向き合う姿を伝える。</strong></figcaption></figure><strong className="reason-takeaway"><span aria-hidden="true">✓</span><span>だから、<br />採用成果につながる設計ができる。</span></strong></article>
              <article><span className="reason-number" aria-hidden="true">02</span><h3>面白くて、<br />見入ってしまう。</h3><p>仕事の挑戦、迷い、変化をひとつの物語に。先が気になる展開で、会社のリアルへ引き込みます。</p><figure className="reason-scene"><img src="/lp-assets/founder-scene-v9.webp" alt="自身の選択を語る起業家の、本編映像の一場面" loading="lazy" decoding="async" width={996} height={560} /><figcaption><strong>本人の言葉で、選択の背景を伝える。</strong></figcaption></figure><strong className="reason-takeaway"><span aria-hidden="true">✓</span><span>だから、<br />つくって終わらず、見てもらえる。</span></strong></article>
            </div>
          </div>
        </section>
        <section className="section download-section" id="download">
          <div className="wrap download-only">
            <div id="request-material" className="material-request"><MaterialRequestForm /></div>
          </div>
        </section>
      </main>
<dialog id="film-dialog" aria-labelledby="dialog-title">
<div className="dialog-head">
<span id="dialog-title">制作動画</span>
<div>
<button type="button" id="fullscreen-video">全画面表示</button>
<button type="button" id="close-video" aria-label="動画を閉じる">閉じる ✕</button>
</div>
</div>
<div id="video-player">
</div>
<p id="playback-note">再生できない場合は <a id="video-external" href="#" target="_blank" rel="noopener">YouTubeで見る ↗</a>
</p>
</dialog>

      <footer><div className="wrap footer-inner"><div><strong>採用密着動画制作サービス</strong><p>人とカルチャーの魅力を、生々しく伝える。</p></div><a className="company-button" href="https://www.kyute.jp/" target="_blank" rel="noopener">運営会社 <span aria-hidden="true">↗</span></a></div><nav className="wrap footer-nav" aria-label="フッター"><a href="#films">制作動画</a><a href="#craft">こだわり</a><a href="#download">資料を受け取る</a></nav></footer>
      <div className="mobile-fixed"><a className="cta" href="#request-material" data-download="mobile">資料を受け取る<span aria-hidden="true">→</span></a></div>
      <LpRuntime />
    </div>
  );
}
