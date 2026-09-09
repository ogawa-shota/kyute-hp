/* eslint-disable @next/next/no-img-element -- YouTube poster is used without rehosting. */
"use client";
import { useEffect, useRef, useState } from "react";

type Player = { mute(): void; playVideo(): void; pauseVideo(): void; seekTo(time:number,allow:boolean):void; getIframe():HTMLIFrameElement; destroy():void };
type Youtube = { Player: new (el: HTMLElement, options: Record<string,unknown>) => Player };
function loadYoutube(): Promise<Youtube> {
  return new Promise((resolve,reject) => {
    let count = 0;
    const check = () => (window as Window & { YT?: Youtube }).YT;
    if (check()?.Player) { resolve(check()!); return; }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script"); script.src="https://www.youtube.com/iframe_api"; script.async=true; document.head.appendChild(script);
    }
    const timer = window.setInterval(() => { const api=check(); if (api?.Player) {clearInterval(timer);resolve(api);} else if (++count>60) {clearInterval(timer);reject(new Error("Video unavailable"));} },200);
  });
}
export default function HeroVideo({ suspended }: { suspended: boolean }) {
  const host=useRef<HTMLDivElement>(null);
  const player=useRef<Player|null>(null);
  const suspendedRef=useRef(suspended);
  const paused=useRef(false);
  const visible=useRef(true);
  const [status,setStatus]=useState<"loading"|"playing"|"paused"|"blocked"|"error">("loading");
  const [seen,setSeen]=useState(false);
  useEffect(()=>{suspendedRef.current=suspended; if(suspended) player.current?.pauseVideo(); else if(!paused.current&&visible.current&&!document.hidden)player.current?.playVideo();},[suspended]);
  useEffect(()=>{
    let disposed=false, ready=false;
    const root=host.current!;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)"); paused.current=motion.matches;
    function play(){if(!disposed&&ready&&!paused.current&&visible.current&&!document.hidden&&!suspendedRef.current){player.current?.mute();player.current?.playVideo();}}
    function pause(){if(ready)player.current?.pauseVideo();}
    const observer=new IntersectionObserver(entries=>{visible.current=entries[0].isIntersecting; if(visible.current)play();else pause();},{threshold:.15}); observer.observe(root);
    const onVisibility=()=>document.hidden?pause():play();
    const onMotion=()=>{if(motion.matches){paused.current=true;pause();setStatus("paused");}};
    document.addEventListener("visibilitychange",onVisibility);motion.addEventListener("change",onMotion);
    loadYoutube().then(api=>{
      if(disposed)return;
      const element=document.createElement("div");root.appendChild(element);
      player.current=new api.Player(element,{videoId:"QzPRS_T-D4Q",host:"https://www.youtube-nocookie.com",playerVars:{autoplay:motion.matches?0:1,mute:1,playsinline:1,controls:0,rel:0,loop:1,playlist:"QzPRS_T-D4Q",start:0,end:35,disablekb:1,origin:location.origin},events:{
        onReady:()=>{if(disposed)return;ready=true;const frame=player.current!.getIframe();frame.title="KYUTE自社メディアの密着動画・無音再生";frame.tabIndex=-1;frame.setAttribute("aria-hidden","true");frame.setAttribute("allow","autoplay; encrypted-media; picture-in-picture");player.current!.mute();if(paused.current)setStatus("paused");else play();},
        onStateChange:(event:{data:number})=>{if(disposed)return;if(event.data===1){if(paused.current||!visible.current||document.hidden||suspendedRef.current){pause();return;}setSeen(true);setStatus("playing");}else if(event.data===2)setStatus("paused");else if(event.data===0){player.current?.seekTo(0,true);play();}},
        onAutoplayBlocked:()=>{if(!disposed){paused.current=true;setStatus("blocked");}},
        onError:()=>{if(!disposed)setStatus("error");}
      }});
    }).catch(()=>{if(!disposed)setStatus("error");});
    const timeout=window.setTimeout(()=>{if(!disposed)setStatus(current=>current==="loading"?"blocked":current);},14000);
    return()=>{disposed=true;clearTimeout(timeout);observer.disconnect();document.removeEventListener("visibilitychange",onVisibility);motion.removeEventListener("change",onMotion);player.current?.destroy();player.current=null;};
  },[]);
  function toggle(){if(status==="playing"){paused.current=true;player.current?.pauseVideo();setStatus("paused");}else{paused.current=false;player.current?.mute();player.current?.playVideo();}}
  return <div className="c-hero-video" data-video-state={status}>
    <div className="c-hero-video-screen"><img src="https://i.ytimg.com/vi/QzPRS_T-D4Q/maxresdefault.jpg" width="1280" height="720" alt="KYUTE自社メディア『運動部のシゴト。』カフェ起業家の一日密着" fetchPriority="high" /><div className={`c-hero-player ${seen?"is-visible":""}`} ref={host}/></div>
    <div className="c-hero-video-controls"><span>{status==="playing"?"自社メディア映像・無音再生中":status==="paused"?"自社メディア映像・停止中":status==="loading"?"映像を読み込み中":"自社メディアの制作映像"}</span>{status==="error"?<a href="#video-story">制作映像を見る ↗</a>:<button type="button" onClick={toggle} disabled={status==="loading"}>{status==="playing"?"映像を停止":"映像を再生"}</button>}</div>
  </div>;
}
