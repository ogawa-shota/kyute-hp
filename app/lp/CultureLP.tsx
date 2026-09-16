/* eslint-disable @next/next/no-img-element -- KYUTE production stills and original YouTube posters. */
"use client";
import { useEffect, useRef, useState } from "react";
import HeroVideo from "./HeroVideo";
import CountUp from "./CountUp";
import CultureMaterialForm from "./CultureMaterialForm";
import CultureProblem from "./CultureProblem";
import CultureEngine from "./CultureEngine";
import { cultureFilms as films, cultureFrames as frames } from "./culture-media";
const Arrow=()=> <span aria-hidden="true">↗</span>;
const Play=()=> <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7Z"/></svg>;
const BrandLogo=({footer=false}:{footer?:boolean})=> <img className={`cs-brand-logo${footer?' is-footer':''}`} src="/kyute-logo.png" width="968" height="205" alt="KYUTE"/>;
function ServiceIcon({type}:{type:'short'|'long'|'youtube'|'instagram'}){
 if(type==='short')return <svg className="cs-service-icon is-video" viewBox="0 0 64 64" aria-hidden="true"><rect x="20" y="6" width="24" height="52" rx="3"/><path d="m29 24 12 8-12 8Z"/><circle cx="32" cy="51" r="1.7"/></svg>;
 if(type==='long')return <svg className="cs-service-icon is-video" viewBox="0 0 64 64" aria-hidden="true"><rect x="5" y="14" width="54" height="36" rx="3"/><path d="m27 24 14 8-14 8Z"/></svg>;
 if(type==='youtube')return <svg className="cs-service-icon is-youtube" viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="14" width="56" height="36" rx="10"/><path d="m27 23 15 9-15 9Z"/></svg>;
 return <svg className="cs-service-icon is-instagram" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="cs-ig" x1="8" y1="56" x2="56" y2="8"><stop stopColor="#ffbd4f"/><stop offset=".48" stopColor="#e52c70"/><stop offset="1" stopColor="#6b4bdf"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="14" fill="url(#cs-ig)"/><circle cx="32" cy="32" r="11"/><circle cx="46" cy="18" r="3"/></svg>;
}
function GuideLink({children="サービス資料を見る",className=""}:{children?:React.ReactNode;className?:string}){return <a href="#download" className={`cs-button ${className}`}>{children}<Arrow/></a>;}
export default function CultureLP(){
 const [playing,setPlaying]=useState<number|null>(null),[sticky,setSticky]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLElement|null>(null);
 useEffect(()=>{const update=()=>{const download=document.getElementById('download');setSticky(scrollY>500&&(download?.getBoundingClientRect().top??0)>innerHeight*.8);};window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);},[]);
 useEffect(()=>{const el=dialog.current;if(playing!==null&&el&&!el.open){el.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};}},[playing]);
 function openFilm(index:number){trigger.current=document.activeElement as HTMLElement;setPlaying(index);}
 function closeFilm(){dialog.current?.close();setPlaying(null);trigger.current?.focus();}
 return <div id="culture-lp">
  <a className="cs-skip" href="#main">本文へスキップ</a>
  <header className="cs-header"><a href="#top" className="cs-logo" aria-label="KYUTE トップへ"><BrandLogo/></a><p>採用動画制作・YouTube運用</p><nav aria-label="メインナビゲーション"><a href="#works">制作映像</a><a href="#services">支援内容</a><GuideLink/></nav></header>
  <main id="main">
   <section id="top" className="cs-hero">
    <div className="cs-hero-layout">
     <div className="cs-hero-content">
      <p className="cs-hero-service">人とカルチャーの魅力を、映像に。</p>
      <h1><span>「ここで働きたい」をつくる。</span><em>採用動画制作</em></h1>
      <p className="cs-hero-description">社員の表情、仕事への想い、職場の空気。<strong>テキストでは伝わらない魅力を、<br/>KYUTEが動画で届けます。</strong></p>
      <div className="cs-hero-actions"><GuideLink>サービス資料を見る</GuideLink><a className="cs-hero-work-link" href="#works"><Play/>制作映像を見る</a></div>
     </div>
     <div className="cs-hero-showcase">
      <div className="cs-hero-reel"><HeroVideo suspended={playing!==null}/></div>
      <div className="cs-hero-reel-caption"><p>人柄まで、映し出す。</p><button type="button" onClick={()=>openFilm(0)}><Play/>本編を再生</button></div>
      <p className="cs-hero-credit">KYUTE自社メディア「運動部のシゴト。」の制作映像</p>
     </div>
    </div>
   </section>
   <CultureProblem/>
   <section className="cs-data cs-section" id="culture"><div className="cs-wrap"><div className="cs-data-heading"><p className="cs-eyebrow">入社の決め手は、条件だけじゃない。</p><h2>人は、<br/>人に惹かれる。</h2><p>「誰と、どんな空気の中で働くか」。<br/>それは、会社を選ぶ理由になっている。</p></div><div className="cs-data-primary"><p>入社予定先を決めた理由</p><CountUp value={42.4}/><h3>社員の雰囲気・人柄が<br/>自分に合っている。</h3></div><div className="cs-data-secondary"><CountUp value={37.5}/><p>社風が自分に合っている。</p></div><details className="cs-source"><summary>調査の対象・出典を見る <span>＋</span></summary><p>マイナビ「2025年卒 大学生 活動実態調査（6月15日）」。2024年6月調査、入社先決定者1,898人／複数回答・ウエイトバック集計。採用YouTubeの効果を測った数値ではありません。</p><a href="https://career-research.mynavi.jp/wp-content/uploads/2024/06/s-nainaitei-0615.pdf" target="_blank" rel="noopener noreferrer">調査原典を読む ↗</a></details></div></section>
   <section className="cs-language cs-section" id="youtube"><div className="cs-wrap"><div className="cs-section-opening"><p className="cs-eyebrow">見れば、想像できることがある。</p><h2>だから、採用広報は<br/>動画で伝える。</h2><p>声も、表情も、仕事のリズムも。<br/>「ここで働く自分」を想像できる情報を、<br/>見たくなるコンテンツに。</p></div><div className="cs-frame-editorial"><figure className="cs-language-person"><img src={frames.smile} width="1280" height="720" alt="会話の中で自然な笑顔を見せる出演者" loading="lazy"/><figcaption><span>表情から、人柄が見える。</span><b>PEOPLE.</b></figcaption></figure><figure className="cs-language-work"><img src={frames.work} width="1280" height="720" alt="カフェ厨房で働く姿" loading="lazy"/><figcaption><span>一日から、仕事が見える。</span><b>WORK.</b></figcaption></figure><figure className="cs-language-story"><img src={frames.story} width="1280" height="720" alt="自分の仕事について語る起業家" loading="lazy"/><figcaption><span>選択から、想いが見える。</span><b>STORY.</b></figcaption></figure><p className="cs-frame-message">人を知る。<br/>仕事を知る。<br/><em>会社を、好きになる。</em></p></div></div></section>
   <section className="cs-works cs-section" id="works"><div className="cs-wrap"><div className="cs-works-heading"><div><p className="cs-eyebrow">KYUTEの制作作品</p><h2>その人の選択に、<br/>物語がある。</h2></div><p>企画し、聞き、撮り、編集する。<br/>私たちの表現を、まずは映像で。<span className="cs-channel-link">自社メディア「運動部のシゴト。」</span></p></div><div className="cs-work-grid">{films.map((film,index)=><article className={`cs-work cs-work-${index+1}`} key={film.id}><button type="button" className="cs-work-image" onClick={()=>openFilm(index)} aria-label={`${film.original}を再生`}><img src={film.still} width="1280" height="720" alt={film.original} loading="lazy"/><span className="cs-work-play"><Play/></span><span className="cs-work-duration">{film.duration}</span><span className="cs-work-number">0{index+1}</span></button><div className="cs-work-caption"><h3>{film.name}</h3><p>{film.statement}</p><span>{film.category}</span></div></article>)}</div><p className="cs-work-note">掲載作品はKYUTE運営「運動部のシゴト。」の映像です。<br className="cs-mobile-break"/>企画・撮影・編集の表現例として掲載しており、顧客企業の採用導入事例ではありません。</p></div></section>
   <section className="cs-services cs-section" id="services"><div className="cs-wrap"><div className="cs-services-heading"><div><BrandLogo/><h2>KYUTEの<br/>支援内容</h2></div><p>動画をつくり、届け、育てる。<br/>採用広報を一つのチームで支援します。</p></div><div className="cs-service-grid">{[
    {type:'short' as const,title:'ショート動画制作',copy:'短い時間で、会社の魅力が伝わる縦型動画を。'},
    {type:'long' as const,title:'ロング動画制作',copy:'密着やインタビューで、人と仕事のリアルを。'},
    {type:'youtube' as const,title:'YouTube運用',copy:'企画・投稿・分析まで、継続してチャンネルを育てる。'},
    {type:'instagram' as const,title:'Instagram運用',copy:'日々の発信で、候補者との接点を増やす。'}
   ].map(service=><article className="cs-service-card" key={service.title}><ServiceIcon type={service.type}/><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div></div></section>
   <CultureEngine/>
   <section className="cs-big-message"><p>その会社らしさが、いちばんの理由になる。</p><h2>「第一志望企業」に、<br/><span>躍り出よう。</span></h2><a href="#download" aria-label="サービス資料を見る"><Arrow/></a></section>
   <section className="cs-download cs-section" id="download"><div className="cs-wrap"><div className="cs-download-intro"><p className="cs-eyebrow">採用YouTubeのサービス資料</p><h2>その会社らしさを、<br/>採用の力に。</h2><p>どんな価値を届けるのか。どこまで頼めるのか。<br/>はじめるためのヒントを、ひとつの資料に。</p><div className="cs-guide-preview"><div className="cs-guide-book" aria-label="採用YouTube運用代行サービスガイドの表紙イメージ"><strong>KYUTE.</strong><span>その会社らしさを、<br/>採用の力に。</span><b>CULTURE<br/>IN FRAME.</b><small>採用YouTube運用代行<br/>サービスガイド</small></div><ol><li>人・仕事・空気を伝える価値</li><li>企画から改善までの支援範囲</li><li>導入準備と進め方</li></ol></div><p className="cs-caption">無料 / PDF・全3ページ</p></div><CultureMaterialForm/></div></section>
  </main>
  <footer className="cs-footer"><div><a href="#top" className="cs-logo" aria-label="KYUTE トップへ"><BrandLogo footer/></a><p>カルチャーを、採用コンテンツに。</p></div><nav aria-label="フッターナビゲーション"><a href="/about">会社概要 <Arrow/></a><a href="/contact">お問い合わせ <Arrow/></a></nav><small>© KYUTE合同会社</small><a className="cs-back-top" href="#top" aria-label="ページの先頭へ">↑</a></footer>
  <div className={`cs-mobile-cta ${sticky?'is-visible':''}`} aria-hidden={!sticky}><a href="#download" tabIndex={sticky?0:-1}>採用YouTubeのサービス資料を見る<Arrow/></a></div>
  <dialog className="cs-dialog" ref={dialog} aria-labelledby="video-dialog-title" onCancel={e=>{e.preventDefault();closeFilm();}} onClick={e=>{if(e.target===e.currentTarget)closeFilm();}}><div className="cs-dialog-top"><p id="video-dialog-title">{playing!==null?films[playing].original:'制作映像'}</p><button type="button" onClick={closeFilm} aria-label="動画を閉じる" autoFocus>×</button></div>{playing!==null&&<><iframe key={playing} src={`https://www.youtube-nocookie.com/embed/${films[playing].id}?autoplay=1&rel=0`} title={films[playing].original} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><div className="cs-dialog-bottom"><p>自社メディア「運動部のシゴト。」</p><a href={`https://www.youtube.com/watch?v=${films[playing].id}`} target="_blank" rel="noopener noreferrer">YouTubeで見る ↗</a></div></>}</dialog>
 </div>;
}
