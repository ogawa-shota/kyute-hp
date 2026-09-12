/* eslint-disable @next/next/no-img-element -- First-party frame from KYUTE's production. */
"use client";

import { useEffect, useRef, useState } from "react";
import { cultureFrames as frames } from "./culture-media";

export default function CultureProblem() {
  const [real, setReal] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section className={`cp-section cs-section ${real ? "cp-is-real" : ""}`} id="gap" ref={section}>
    <div className="cs-wrap cp-layout">
      <div className="cp-intro">
        <p className="cs-eyebrow">同じカルチャーでも、伝わり方が変わる。</p>
        <h2 aria-live="polite">{real ? "動画だと、" : "テキストだと、"}<br/>「良いカルチャー」が<br/><em>{real ? "伝わる。" : "伝わらない。"}</em></h2>
        <p className="cp-description">{real ? "表情や声、仕事への向き合い方。言葉の背景まで見えるから、その会社らしさを感じられる。" : "「風通しがいい」「若手が活躍」。文字だけでは、実際の会話や働く空気まで想像しづらい。"}</p>
        <div className="cp-switch" role="group" aria-label="テキストと動画の伝わり方を比較">
          <button type="button" aria-pressed={!real} aria-controls="culture-comparison" onClick={() => setReal(false)}>テキストで見る</button>
          <span aria-hidden="true">→</span>
          <button type="button" aria-pressed={real} aria-controls="culture-comparison" onClick={() => setReal(true)}>動画で見る</button>
        </div>
      </div>
      <div className="cp-panel" id="culture-comparison">
        {real ? <div className="cp-video-view">
          <div className="cp-player">
            {visible ? <iframe src="https://www.youtube-nocookie.com/embed/QzPRS_T-D4Q?autoplay=1&mute=1&playsinline=1&rel=0&start=789" title="カフェ経営者の表情と会話 — KYUTE自社メディア制作映像" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <img src={frames.smile} alt="自社メディアに出演したカフェ経営者" width="1280" height="720"/>}
          </div>
          <div className="cp-details"><span>自然な表情</span><span>会話の空気</span><span>仕事への想い</span></div>
          <p className="cp-caption">KYUTE自社メディアの表現例。顧客企業の採用導入事例ではありません。</p>
        </div> : <div className="cp-paper">
          <div className="cp-paper-bar"><span>採用情報</span><span aria-hidden="true">― □ ×</span></div>
          <div className="cp-paper-body"><p>私たちの会社について</p><h3>風通しの良い会社です。</h3><ul><li>若手が活躍しています。</li><li>裁量があります。</li><li>社員同士の仲が良いです。</li></ul><p className="cp-question">……実際、どんな雰囲気なんだろう？</p><small>※比較のための架空の求人情報</small></div>
        </div>}
      </div>
    </div>
  </section>;
}
