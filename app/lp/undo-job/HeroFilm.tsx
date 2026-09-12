"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Clip={videoId:string;startSeconds:number;endSeconds:number;poster:string};
const clips:Clip[]=[
 {videoId:"QzPRS_T-D4Q",startSeconds:1033,endSeconds:1040,poster:"/culture-assets/kitchen-real-v3.png"},
 {videoId:"QT5ZYECnOUM",startSeconds:790,endSeconds:800,poster:"/lp-assets/studio/okada-1.webp"},
 {videoId:"wtRbJX3bq4o",startSeconds:399,endSeconds:408,poster:"/lp-assets/studio/uosaki-2.webp"},
 {videoId:"QzPRS_T-D4Q",startSeconds:789,endSeconds:797,poster:"/lp-assets/studio/cafe-5.webp"},
 {videoId:"QT5ZYECnOUM",startSeconds:913,endSeconds:923,poster:"/lp-assets/studio/okada-4.webp"},
 {videoId:"QzPRS_T-D4Q",startSeconds:1043,endSeconds:1049,poster:"/culture-assets/storefront-real-v3.png"},
];
type Player={mute():void;playVideo():void;pauseVideo():void;getCurrentTime():number;loadVideoById(clip:Omit<Clip,'poster'>):void;getIframe():HTMLIFrameElement;destroy():void};
type Youtube={Player:new(el:HTMLElement,options:Record<string,unknown>)=>Player};
let apiPromise:Promise<Youtube>|null=null;
function loadYoutube(){
 if(apiPromise)return apiPromise;
 apiPromise=new Promise<Youtube>((resolve,reject)=>{
  const check=()=> (window as Window & {YT?:Youtube}).YT;
  if(check()?.Player){resolve(check()!);return;}
  if(!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')){const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;document.head.appendChild(script);}
  let tries=0;const timer=setInterval(()=>{const api=check();if(api?.Player){clearInterval(timer);resolve(api);}else if(++tries>75){clearInterval(timer);apiPromise=null;reject(new Error('Video unavailable'));}},200);
 });return apiPromise;
}
export default function HeroFilm(){
 const [suspended,setSuspended]=useState(false);
 useEffect(()=>{const listen=(e:Event)=>setSuspended(Boolean((e as CustomEvent).detail));document.addEventListener("uj-film-open",listen);return()=>document.removeEventListener("uj-film-open",listen);},[]);
 const host=useRef<HTMLDivElement>(null),player=useRef<Player|null>(null);
 const paused=useRef(false),visible=useRef(true),ready=useRef(false),suspend=useRef(suspended),clipIndex=useRef(0);
 const [enabled,setEnabled]=useState(false),[status,setStatus]=useState<'loading'|'playing'|'paused'|'blocked'|'error'>('paused'),[seen,setSeen]=useState(false),[clip,setClip]=useState(0);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
  if(!media.matches&&!matchMedia('(max-width: 760px)').matches&&!connection?.saveData&&!['slow-2g','2g'].includes(connection?.effectiveType||'')){setEnabled(true);setStatus('loading');}
  else paused.current=true;
 },[]);
 useEffect(()=>{suspend.current=suspended;if(!ready.current)return;if(suspended)player.current?.pauseVideo();else if(!paused.current&&visible.current&&!document.hidden)player.current?.playVideo();},[suspended]);
 useEffect(()=>{
  if(!enabled)return;
  let disposed=false,lastTransition=-2000;const root=host.current!;const motion=matchMedia('(prefers-reduced-motion: reduce)');
  function play(){if(ready.current&&!disposed&&!paused.current&&visible.current&&!document.hidden&&!suspend.current){player.current?.mute();player.current?.playVideo();}}
  function pause(){if(ready.current)player.current?.pauseVideo();}
  function next(){if(disposed||paused.current||!visible.current||document.hidden||suspend.current||performance.now()-lastTransition<1500)return;lastTransition=performance.now();clipIndex.current=(clipIndex.current+1)%clips.length;const nextClip=clips[clipIndex.current];setClip(clipIndex.current);setSeen(false);player.current?.loadVideoById({videoId:nextClip.videoId,startSeconds:nextClip.startSeconds,endSeconds:nextClip.endSeconds});}
  const observer=new IntersectionObserver(entries=>{visible.current=entries[0].isIntersecting;if(visible.current)play();else pause();},{threshold:.1});observer.observe(root);
  const onVisibility=()=>document.hidden?pause():play();const onMotion=()=>{if(motion.matches){paused.current=true;pause();setStatus('paused');}};
  document.addEventListener('visibilitychange',onVisibility);motion.addEventListener('change',onMotion);
  loadYoutube().then(api=>{
   if(disposed)return;const mount=document.createElement('div');root.appendChild(mount);const first=clips[0];
   player.current=new api.Player(mount,{videoId:first.videoId,host:'https://www.youtube-nocookie.com',playerVars:{autoplay:1,mute:1,playsinline:1,controls:0,rel:0,start:first.startSeconds,end:first.endSeconds,disablekb:1,cc_load_policy:0,origin:location.origin},events:{
    onReady:()=>{if(disposed)return;ready.current=true;const frame=player.current!.getIframe();frame.title='運動部のシゴト。自社制作映像・無音再生';frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');frame.setAttribute('allow','autoplay; encrypted-media; picture-in-picture');player.current!.mute();play();},
    onStateChange:(event:{data:number})=>{if(disposed)return;if(event.data===1){if(paused.current||!visible.current||document.hidden||suspend.current){pause();return;}setSeen(true);setStatus('playing');}else if(event.data===2)setStatus('paused');else if(event.data===0)next();},
    onAutoplayBlocked:()=>{if(!disposed){paused.current=true;setStatus('blocked');}},onError:()=>{if(!disposed){paused.current=true;setSeen(false);pause();setStatus('error');}}
   }});
  }).catch(()=>{if(!disposed)setStatus('error');});
  const loop=setInterval(()=>{if(ready.current&&!paused.current&&visible.current&&!document.hidden&&!suspend.current&&player.current!.getCurrentTime()>=clips[clipIndex.current].endSeconds-.35)next();},350);
  const fallback=setTimeout(()=>{if(!disposed)setStatus(state=>state==='loading'?'blocked':state);},16000);
  return()=>{disposed=true;ready.current=false;clearInterval(loop);clearTimeout(fallback);observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);motion.removeEventListener('change',onMotion);player.current?.destroy();player.current=null;};
 },[enabled]);
 function toggle(){if(!enabled){paused.current=false;setEnabled(true);setStatus('loading');return;}if(status==='playing'){paused.current=true;player.current?.pauseVideo();setStatus('paused');}else{paused.current=false;player.current?.mute();player.current?.playVideo();}}
 return <div className="uj-hero-film" data-video-state={status} data-clip={clip}>
  <div className="uj-hero-screen"><Image src={clips[clip].poster} sizes="(max-width:760px) 100vw, 48vw" alt="運動部のシゴト。実際の密着映像。働く人の一日" width="1280" height="720" fetchPriority="high"/><div className={`uj-hero-player ${seen?'is-visible':''}`} ref={host}/></div>
  <div className="uj-film-controls"><span><i aria-hidden="true"/> 自社メディア制作映像 <b>{String(clip+1).padStart(2,'0')} / {String(clips.length).padStart(2,'0')}</b></span>{status==='error'?<a href="#uj-reality">作品を見る ↗</a>:<button type="button" onClick={toggle} disabled={status==='loading'} aria-label={status==='playing'?'背景映像を停止':'背景映像を再生'}>{status==='playing'?<><span aria-hidden="true">Ⅱ</span> 無音再生中</>:status==='loading'?'読み込み中':<><span aria-hidden="true">▶</span> 映像を再生</>}</button>}</div>
 </div>;
}
