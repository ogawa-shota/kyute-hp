/* eslint-disable @next/next/no-img-element -- YouTube posters are rendered directly to preserve the existing external thumbnail URLs without image proxying. */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./lp.css";
import LpRuntime from "./LpRuntime";
import { media } from "./media";

export const metadata: Metadata = {
  title: { absolute: "採用密着動画制作サービス" },
  description: "人とカルチャーで、選ばれる会社へ。社員の一日を通して、会社の魅力を伝える採用密着動画制作サービス。",
  alternates: { canonical: "https://kyute.jp/lp" },
  openGraph: {
    title: "採用密着動画制作サービス",
    description: "人とカルチャーで、選ばれる会社へ。社員の一日を通して、会社の魅力を伝える採用密着動画制作サービス。",
    url: "https://kyute.jp/lp",
    locale: "ja_JP",
    type: "website",
  },
};

const videos = media.videos;

function FilmCard({ video, index, featured = false }: { video: (typeof videos)[number]; index: number; featured?: boolean }) {
  return (
    <button type="button" className="film-button" data-video-id={video.id} aria-label={`${video.title} 動画を再生`}>
      <div className="film-image">
        <img src={video.poster} alt={video.originalTitle} loading={featured ? "eager" : "lazy"} decoding="async" width={1280} height={720} />
        <span className="play" aria-hidden="true">▶</span>
        <span className="duration">{video.duration}</span>
      </div>
      <div className="film-copy">
        <span className="film-index">{String(index + 1).padStart(2, "0")}</span>
        <div><h3>{video.title}</h3><p>運営メディア「運動部のシゴト。」</p></div>
      </div>
    </button>
  );
}

export default function RecruitmentDocumentaryPage() {
  return (
    <div id="documentary-lp" data-variant="proof">
<header className="site-header">
<a className="service-name" href="#top">採用密着動画<span>制作サービス</span>
</a>
<nav aria-label="メイン">
<a href="#films">制作動画</a>
<a href="#craft">こだわり</a>
<a className="cta" href="/lp-assets/service-guide-v4.pdf" download data-download="header">資料をダウンロード<span aria-hidden="true">↓</span>
</a>
</nav>
</header>
<main>
<section className="cinema-hero" id="top">
<div className="hero-media" id="hero-media" aria-hidden="true">
<img id="hero-poster" className="hero-poster" src={videos[0].poster} alt="" loading="eager" fetchPriority="high" />
</div>
<div className="hero-shade">
</div>
<div className="hero-copy wrap">
<h1>“いい人”を<br />採用するなら、<br />
<em>密着動画。</em>
</h1>
<p className="hero-sub">会えば伝わる人とカルチャーを、<br className="sp-only" />応募の前に。</p>
<a className="cta" href="/lp-assets/service-guide-v4.pdf" download data-download="hero">資料をダウンロード<span aria-hidden="true">↓</span>
</a>
</div>
<div className="hero-bottom">
<a className="scroll-cue" href="#first-look">制作動画を見る <span aria-hidden="true">↓</span>
</a>
<div className="hero-credit">
<span id="hero-status">自社メディア映像／静止表示</span>
<button id="hero-toggle" type="button" disabled>読み込み中</button>
</div>
</div>
</section>
<section className="first-look" id="first-look" aria-label="制作動画">
<div className="first-rail" id="first-rail">{videos.map((video, index) => <FilmCard key={video.id} video={video} index={index} featured />)}</div>
<p className="rail-caption">運営会社の自社メディア制作例。顧客の採用成果を示すものではありません。</p>
</section>
<section className="section evidence" id="why">
<div className="wrap">
<h2>人とカルチャーも、<br />選ぶ理由に。</h2>
<div className="charts">
<figure className="chart">
<figcaption>入社先を決めた理由</figcaption>
<div className="bar-row ">
<div className="bar-label">
<span>社員の雰囲気や人柄が自分に合う</span>
<strong>42.4<small>%</small>
</strong>
</div>
<div className="bar-track" aria-hidden="true">
<span style={{ "--value": "42.4%" } as CSSProperties}>
</span>
</div>
</div>
<div className="bar-row ">
<div className="bar-label">
<span>社風が自分に合う</span>
<strong>37.5<small>%</small>
</strong>
</div>
<div className="bar-track" aria-hidden="true">
<span style={{ "--value": "37.5%" } as CSSProperties}>
</span>
</div>
</div>
<div className="chart-scale" aria-hidden="true">
<span>0%</span>
<span>50%</span>
<span>100%</span>
</div>
<p className="chart-note">2025年卒・入社先決定者 1,898人／複数回答</p>
</figure>
<figure className="chart gap-chart">
<figcaption>一方、職場の人間関係は…</figcaption>
<div className="bar-row ">
<div className="bar-label">
<span>知りたかった</span>
<strong>40.1<small>%</small>
</strong>
</div>
<div className="bar-track" aria-hidden="true">
<span style={{ "--value": "40.1%" } as CSSProperties}>
</span>
</div>
</div>
<div className="bar-row muted-bar">
<div className="bar-label">
<span>実際に知れた</span>
<strong>28.0<small>%</small>
</strong>
</div>
<div className="bar-track" aria-hidden="true">
<span style={{ "--value": "28.0%" } as CSSProperties}>
</span>
</div>
</div>
<div className="chart-scale" aria-hidden="true">
<span>0%</span>
<span>50%</span>
<span>100%</span>
</div>
<p className="chart-note">2026年卒・学生 1,326人／別設問の回答割合</p>
</figure>
</div>
<details className="sources">
<summary>調査の対象と出典</summary>
<p>入社理由の図：マイナビ「2025年卒大学生活動実態調査」。実査2024年6月、入社先決定者1,898人、複数回答・ウエイトバック。割合は合算しません。<a href="https://career-research.mynavi.jp/wp-content/uploads/2024/06/s-nainaitei-0615.pdf" target="_blank" rel="noopener">原典を見る</a>
</p>
<p>人間関係の図：リクルート「就職白書2026」図39・40。実査2025年11〜12月、学生1,326人、複数回答・ウエイトバック。「社内の人間関係」の別設問を比較したもので、個人の未充足率・企業の情報不足率ではありません。「社風・企業文化」は同様の不足差がなく、カルチャー全般には一般化しません。<a href="https://shushokumirai.recruit.co.jp/wp-content/uploads/2026/02/hakusho2026_data.pdf" target="_blank" rel="noopener">原典を見る</a>
</p>
<p>新卒学生を対象とする調査です。密着動画による採用成果を示すものではありません。</p>
</details>
</div>
</section>
<section className="section approach" id="approach">
<div className="wrap">
<h2>「人がいい」を、<br />見えるかたちに。</h2>
<p>何気ない会話、迷ったときの判断。<br />社員の一日に密着し、<br className="sp-only" />人とカルチャーを伝えます。</p>
</div>
</section>
<section className="section films" id="films">
<div className="wrap film-heading">
<h2>働く一日を、<br />のぞいてみる。</h2>
<div className="rail-controls">
<button type="button" data-scroll="-1" aria-label="前の動画">←</button>
<button type="button" data-scroll="1" aria-label="次の動画">→</button>
</div>
</div>
<div className="film-rail" id="film-rail" tabIndex={0} aria-label="制作動画一覧・左右にスクロール">{videos.map((video, index) => <FilmCard key={video.id} video={video} index={index} />)}</div>
<p className="wrap film-note">自社メディアの長編作品です。採用向けの編集仕様は資料でご紹介しています。</p>
</section>
<section className="section craft" id="craft">
<div className="wrap">
<h2>飾るより、伝わる。</h2>
<div className="craft-grid">
<article>
<h3>候補者の疑問から、<br />企画する。</h3>
<p>採用したい人が知りたいことを、撮影の軸に。</p>
</article>
<article>
<h3>台本にない<br />やりとりを、撮る。</h3>
<p>相談の仕方や意見の交わし方に、その会社らしさが表れます。</p>
</article>
<article>
<h3>仕事の難しさも、<br />隠さない。</h3>
<p>良い面も大変な面も伝え、入社前のイメージを具体的に。</p>
</article>
</div>
</div>
</section>
<section className="section download-section" id="download">
<div className="wrap download-grid">
<div>
<h2>制作内容と料金を、<br />ひとつに。</h2>
<p>活用例・制作内容・料金を、<br />ひとつの資料にまとめました。</p>
<a className="cta" href="/lp-assets/service-guide-v4.pdf" download data-download="bottom">資料をダウンロード<span aria-hidden="true">↓</span>
</a>
<span className="download-format">PDF資料・入力不要</span>
</div>
<a className="guide-cover" href="/lp-assets/service-guide-v4.pdf" download data-download="cover" aria-label="採用密着動画制作サービスの資料をダウンロード">
<span>サービスのご案内</span>
<strong>採用密着動画<br />制作サービス</strong>
<p>人とカルチャーが伝わる、<br />一日の記録。</p>
<div>
<span>活用例</span>
<span>制作内容</span>
<span>料金・制作範囲</span>
</div>
<b aria-hidden="true">↓</b>
</a>
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
<footer>
<div className="wrap footer-inner">
<span>採用密着動画制作サービス</span>
<a className="company-button" href="https://www.kyute.jp/" target="_blank" rel="noopener">運営会社 <span aria-hidden="true">↗</span>
</a>
</div>
</footer>
<div className="mobile-fixed">
<a className="cta" href="/lp-assets/service-guide-v4.pdf" download data-download="mobile">資料をダウンロード<span aria-hidden="true">↓</span>
</a>
</div>
<LpRuntime />
</div>
);
}
