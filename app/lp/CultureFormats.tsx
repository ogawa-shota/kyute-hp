/* eslint-disable @next/next/no-img-element -- Local production frames, not stock imagery. */
"use client";
import { useState } from "react";
import { cultureFrames as frames } from "./culture-media";
const formats=[
 {title:"1日密着",word:"DAY IN THE LIFE",question:"この人は、どんな一日を過ごす？",copy:"始業から仕事の合間まで。職種の説明では見えない、働くリズムを伝える。",image:frames.work},
 {title:"オフィスツアー",word:"OFFICE TOUR",question:"この場所で、どう働いている？",copy:"空間の紹介から、使い方の紹介へ。いつもの場所から、働き方や関係性を見せる。"},
 {title:"社員インタビュー",word:"EMPLOYEE STORY",question:"なぜ、この会社を選んだ？",copy:"入社の決め手と、いま感じること。候補者と近い目線で、選択の理由を伝える。",image:frames.story},
 {title:"社員対談",word:"CROSS TALK",question:"ふだん、どんな会話をしている？",copy:"先輩と後輩、職種の違うふたり。会話のやり取りから、会社の距離感を伝える。"},
 {title:"経営者インタビュー",word:"FOUNDER STORY",question:"何を大切に、会社をつくる？",copy:"事業の先に目指すもの。経営者自身の言葉から、価値観と意思決定をひもとく。",image:frames.founder},
 {title:"プロジェクト密着",word:"PROJECT STORY",question:"ひとつの仕事は、どう生まれる？",copy:"企画、議論、試行錯誤。仕事が進む過程から、チームが大切にするものを映す。"},
];
export default function CultureFormats(){
 const [active,setActive]=useState(0);const item=formats[active];
 return <section className="cs-formats cs-section" id="formats"><div className="cs-wrap"><div className="cs-section-opening"><p className="cs-eyebrow">採用YouTubeの企画フォーマット</p><h2>会社の数だけ、<br/>番組がある。</h2><p>インタビューだけでは、伝えきれない。<br/>誰に、何を届けるかで、企画は変わる。</p></div><div className="cs-lineup"><div className="cs-programmes" role="group" aria-label="企画フォーマットを選ぶ">{formats.map((f,i)=><button type="button" key={f.title} aria-pressed={i===active} aria-controls="format-preview" onClick={()=>setActive(i)}><span className="cs-programme-number">0{i+1}</span><span>{f.title}</span><span className="cs-programme-arrow" aria-hidden="true">↗</span></button>)}</div><div className="cs-programme-preview" id="format-preview"><div className={`cs-format-visual ${item.image?'':'cs-format-type'}`} key={active}>{item.image?<img src={item.image} width="1280" height="720" alt="KYUTE自社メディアの制作映像。表現の参考" loading="lazy"/>:<div aria-hidden="true"><span>{item.word.split(' ')[0]}</span><span>{item.word.split(' ').slice(1).join(' ')}</span></div>}<span className="cs-format-tag">企画例 0{active+1}</span><p>{item.question}</p></div><div className="cs-format-description" aria-live="polite"><h3>{item.title}</h3><p>{item.copy}</p></div><p className="cs-caption">企画フォーマットの提案です。写真は自社メディア作品の表現参考です。</p></div></div></div></section>;
}
