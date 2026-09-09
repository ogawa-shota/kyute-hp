"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => { cancelAnimationFrame(frame); setDisplay(value); setRunning(false); };
    const onMotion = () => { if (reduced.matches) finish(); };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || started) return;
      started = true; observer.disconnect();
      if (reduced.matches) return;
      const start = performance.now(); setDisplay(0); setRunning(true);
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 950, 1);
        setDisplay(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else { setDisplay(value); setRunning(false); }
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    observer.observe(element); reduced.addEventListener("change", onMotion);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); reduced.removeEventListener("change", onMotion); };
  }, [value]);
  return <div ref={ref} className="c-count" data-counting={running} aria-label={`${value.toFixed(1)}%`}>
    <div className="c-big-number" aria-hidden="true">{display.toFixed(1)}<span>%</span></div>
    <svg className="c-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" /><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray={Math.PI*80} strokeDashoffset={Math.PI*80*(1-display/100)} transform="rotate(-90 50 50)" /></svg>
  </div>;
}
