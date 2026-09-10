'use client';
import { useEffect, useRef, useState } from 'react';
type Film = { id: string; start: number; title: string };
const validIds = new Set(['QT5ZYECnOUM', 'QzPRS_T-D4Q', 'wtRbJX3bq4o']);
export default function Runtime() {
  const [film, setFilm] = useState<Film | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = document.querySelector('.uj'); if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frames = new Set<number>();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement; observer.unobserve(el); el.classList.add('uj-in');
      if (!el.hasAttribute('data-uj-count') || reduced.matches) return;
      const goal = Number(el.dataset.ujCount); const start = performance.now();
      function tick(now: number) { const progress = Math.min((now-start)/1000,1); el.textContent=String(Math.round(goal*(1-Math.pow(1-progress,3)))); if(progress<1){const id=requestAnimationFrame(tick);frames.add(id);} }
      const id=requestAnimationFrame(tick); frames.add(id);
    }), { threshold: .18 });
    root.querySelectorAll('[data-uj-reveal], [data-uj-count]').forEach(el => observer.observe(el));
    function click(event: Event) {
      const target = (event.target as Element).closest<HTMLElement>('[data-uj-video], [data-uj-mode], [data-uj-topic]'); if(!target) return;
      if(target.dataset.ujVideo && validIds.has(target.dataset.ujVideo)) {
        opener.current=target;setFilm({id:target.dataset.ujVideo,start:Number(target.dataset.start)||0,title:target.dataset.title||'制作映像'});
      }
      if(target.dataset.ujTopic) {
        const topic=target.dataset.ujTopic;
        root!.querySelectorAll<HTMLElement>('[data-uj-topic]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ujTopic===topic)));
        root!.querySelectorAll<HTMLElement>('[data-uj-design]').forEach(panel=>{panel.hidden=panel.dataset.ujDesign!==topic;});
      }
      if(target.dataset.ujMode) {
        const mode=target.dataset.ujMode;
        root!.querySelectorAll<HTMLElement>('[data-uj-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ujMode===mode)));
        const comparison=root!.querySelector<HTMLElement>('[data-uj-comparison]');
        if(comparison){comparison.dataset.ujComparison=mode;comparison.querySelector<HTMLElement>('.uj-before')!.hidden=mode!=='words';comparison.querySelector<HTMLElement>('.uj-after')!.hidden=mode!=='film';}
      }
    }
    root.addEventListener('click',click);
    return()=>{observer.disconnect();frames.forEach(cancelAnimationFrame);root.removeEventListener('click',click);};
  },[]);
  useEffect(()=>{
    if(!film)return;
    const d=dialog.current!;d.showModal();
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    document.dispatchEvent(new CustomEvent('uj-film-open',{detail:true}));
    return()=>{d.close();document.body.style.overflow=previous;document.dispatchEvent(new CustomEvent('uj-film-open',{detail:false}));opener.current?.focus({preventScroll:true});};
  },[film]);
  return <dialog ref={dialog} className="uj-dialog" aria-labelledby="uj-player-title" onCancel={()=>setFilm(null)} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setFilm(null);}}>
    {film&&<><div className="uj-dialog-top"><h2 id="uj-player-title">{film.title}</h2><button type="button" autoFocus onClick={()=>setFilm(null)} aria-label="動画を閉じる">閉じる ×</button></div><iframe key={`${film.id}-${film.start}`} src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&start=${film.start}`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><a className="uj-dialog-fallback" href={`https://www.youtube.com/watch?v=${film.id}&t=${film.start}s`} target="_blank" rel="noreferrer">YouTubeで見る ↗<span>動画が再生されない場合も、こちらから</span></a></>}
  </dialog>;
}
