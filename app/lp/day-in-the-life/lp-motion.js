// Content is visible without JavaScript. Motion is an optional, one-time enhancement.
export function mountMotion(root) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reveals = [...root.querySelectorAll("[data-reveal]")];
  const charts = [...root.querySelectorAll(".chart")];
  const frames = new Set();
  const started = new Set();
  let revealObserver, chartObserver, disposed = false;

  function finishChart(chart) {
    const number = chart.querySelector("[data-count-to]");
    number.textContent = Number(number.dataset.countTo).toFixed(1);
    chart.style.setProperty("--chart-progress", "1");
    chart.classList.add("counted");
  }
  function reveal(element) {
    element.classList.add("is-revealed");
    revealObserver?.unobserve(element);
  }
  function finishAll() {
    for (const frame of frames) cancelAnimationFrame(frame);
    frames.clear();
    revealObserver?.disconnect();
    chartObserver?.disconnect();
    reveals.forEach(reveal);
    charts.forEach(finishChart);
  }
  function count(chart) {
    if (started.has(chart)) return;
    started.add(chart);
    chartObserver.unobserve(chart);
    const number = chart.querySelector("[data-count-to]");
    const target = Number(number.dataset.countTo);
    let start;
    function queue() {
      const frame = requestAnimationFrame((now) => {
        frames.delete(frame);
        if (disposed) return;
        if (reduced.matches || document.hidden) { finishChart(chart); return; }
        start ??= now;
        const progress = Math.min((now - start) / 1500, 1);
        const eased = 1 - (1 - progress) ** 3;
        number.textContent = (target * eased).toFixed(1);
        chart.style.setProperty("--chart-progress", String(eased));
        if (progress < 1) queue(); else finishChart(chart);
      });
      frames.add(frame);
    }
    queue();
  }
  if (!reduced.matches && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); });
    }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
    reveals.forEach((element) => {
      // Preserve content above the viewport when restoring a saved scroll position.
      if (element.getBoundingClientRect().bottom < 0) return;
      element.classList.add("motion-ready");
      revealObserver.observe(element);
    });
    chartObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) count(entry.target); });
    }, { threshold: .35 });
    charts.forEach((chart) => {
      chart.classList.add("count-ready");
      chart.style.setProperty("--chart-progress", "0");
      chart.querySelector("[data-count-to]").textContent = "0.0";
      chartObserver.observe(chart);
    });
  }
  const onReduced = () => { if (reduced.matches) finishAll(); };
  const onFocus = (event) => {
    const element = event.target.closest("[data-reveal]");
    if (element) {
      element.style.setProperty("--reveal-delay", "0ms");
      reveal(element);
    }
  };
  const onTransitionEnd = (event) => {
    if (event.propertyName === "opacity" && event.target.dataset.reveal === "video" && event.target.classList.contains("is-revealed")) {
      event.target.closest(".reality-comparison")?.classList.add("video-focused");
    }
  };
  reduced.addEventListener("change", onReduced);
  root.addEventListener("focusin", onFocus);
  root.addEventListener("transitionend", onTransitionEnd);
  return () => {
    disposed = true;
    finishAll();
    reduced.removeEventListener("change", onReduced);
    root.removeEventListener("focusin", onFocus);
    root.removeEventListener("transitionend", onTransitionEnd);
    reveals.forEach((element) => element.classList.remove("motion-ready", "is-revealed"));
    charts.forEach((chart) => chart.classList.remove("count-ready", "counted"));
    root.querySelector(".reality-comparison")?.classList.remove("video-focused");
  };
}
