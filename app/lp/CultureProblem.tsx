/* eslint-disable @next/next/no-img-element -- First-party frames from KYUTE productions. */
"use client";
import { useEffect, useRef, useState } from "react";
import { cultureFrames as frames } from "./culture-media";
export default function CultureProblem() {
  const section=useRef<HTMLElement>(null);
  const manual=useRef(false);
  const [real,setReal]=useState(false);
  useEffect(()=>{
    let raf=0;
    const update=()=>{raf=0;if(manual.current||innerWidth<800)return;const rect=section.current?.getBoundingClientRect();if(rect)setReal(rect.top < -140);};
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};
    window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);update();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);};
  },[]);
  function choose(value:boolean){manual.current=true;setReal(value);}
  return <section className="cs-problem" id="gap" ref={section}>
    <div className="cs-problem-sticky cs-wrap">
      <div className="cs-problem-intro"><p className="cs-eyebrow">求人票の、その先へ。</p><h2>いい会社なのに。<br/>その「いい」が、<br/>伝わらない。</h2><p>「風通しがいい」。<br/>そのひと言から、<br/>どんな風景が浮かびますか。</p><div className="cs-view-switch" aria-label="伝わり方を切り替える"><button type="button" aria-pressed={!real} onClick={()=>choose(false)}>文字で見る</button><button type="button" aria-pressed={real} onClick={()=>choose(true)}>映像で見る <span aria-hidden="true">↗</span></button></div><span className="cs-switch-note">スクロール、または切り替えて体験</span></div>
      <div className={`cs-reality-stage ${real?'is-real':''}`}>
        <div className="cs-paper-view" aria-hidden={real}><div className="cs-browser-bar"><i/><i/><i/><span>採用情報</span></div><div className="cs-paper-body"><p>私たちの会社について</p><h3>風通しの良い会社です。</h3><ul><li>若手が活躍しています。</li><li>裁量があります。</li><li>社員同士の仲が良いです。</li></ul><div className="cs-fake-lines"><i/><i/><i/></div><span>※説明用の架空の求人情報</span></div><p className="cs-candidate-question">……実際、どんな会社？<span aria-hidden="true">↙</span></p></div>
        <div className="cs-real-view" aria-hidden={!real}><figure className="cs-real-main"><img src={frames.smile} alt="笑顔で会話するカフェ経営者。自社制作映像より" width="1280" height="720" loading="lazy"/><figcaption>言葉の、その先の表情。</figcaption></figure><figure className="cs-real-work"><img src={frames.work} alt="カフェ厨房で仕事をする姿。自社制作映像より" width="1280" height="720" loading="lazy"/><figcaption>働く日常</figcaption></figure><figure className="cs-real-story"><img src={frames.story} alt="仕事への想いを語る起業家。自社制作映像より" width="1280" height="720" loading="lazy"/><figcaption>仕事への想い</figcaption></figure><span className="cs-frame-source">KYUTE自社メディアの制作映像より</span></div>
      </div>
      <p className="cs-problem-punch">文字では、<span>空気までは伝わらない。</span></p>
    </div>
  </section>;
}
