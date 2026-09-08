// The page and video cards render on the server; this module only enhances interaction.
import { media } from "./media";

let apiPromise;
function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const timeout = window.setTimeout(() => reject(new Error("YouTube API timeout")), 12000);
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout);
      previous?.();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timeout);
        script.remove();
        reject(new Error("YouTube API unavailable"));
      };
      document.head.append(script);
    }
  }).catch((error) => { apiPromise = undefined; throw error; });
  return apiPromise;
}

export function mountLp(root) {
  const $ = (id) => root.querySelector(`#${id}`);
  const controller = new AbortController();
  const on = (target, event, listener, options = {}) =>
    target.addEventListener(event, listener, { ...options, signal: controller.signal });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const source = new URLSearchParams(window.location.search).get("utm_source") || "direct";
  const emit = (name, values = {}) => document.dispatchEvent(new CustomEvent("kyute-lp-event", {
    detail: { name, variant: "proof", source, ...values },
  }));
  const header = root.querySelector(".site-header");
  const fixed = root.querySelector(".mobile-fixed");
  const hero = root.querySelector(".cinema-hero");
  const heroMedia = $("hero-media");
  const heroToggle = $("hero-toggle");
  const heroStatus = $("hero-status");
  const dialog = $("film-dialog");
  const rail = $("film-rail");
  const playerContainer = $("video-player");
  let disposed = false, player = null, ready = false;
  let manuallyPaused = reduced.matches, heroVisible = true, modalOpen = false;
  let lastTrigger = null, modalPlayer = null, modalProgress = null;
  let previousOverflow = null;
  let yt = null;
  const updateChrome = () => {
    header.classList.toggle("scrolled", window.scrollY > 80);
    fixed.classList.toggle("shown", window.scrollY > hero.offsetHeight - 100 && $("download").getBoundingClientRect().top > window.innerHeight * .25);
  };
  on(window, "scroll", updateChrome, { passive: true });
  updateChrome();
  root.querySelectorAll("[data-download]").forEach((link) => {
    on(link, "click", () => emit("material_download_click", { location: link.dataset.download }));
  });
  function cover() {
    const frame = heroMedia.querySelector("iframe");
    if (!frame) return;
    const { width, height } = heroMedia.getBoundingClientRect();
    frame.style.width = Math.max(width, height * 16 / 9) + "px";
    frame.style.height = Math.max(height, width * 9 / 16) + "px";
  }
  function playHero() {
    if (disposed || !ready || manuallyPaused || !heroVisible || document.hidden || modalOpen) return;
    player.mute();
    player.playVideo();
  }
  function pauseHero() { if (ready) player.pauseVideo(); }
  function fallback() {
    if (disposed) return;
    heroMedia.classList.remove("is-playing");
    heroStatus.textContent = "背景はサムネイル表示／作品から本編へ";
    heroToggle.textContent = "作品を見る";
    heroToggle.disabled = false;
    ready = false;
  }
  const resize = new ResizeObserver(cover);
  resize.observe(heroMedia);
  const visibility = new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
    if (heroVisible) playHero(); else pauseHero();
  }, { threshold: .12 });
  visibility.observe(hero);
  loadYouTube().then((api) => {
    if (disposed) return;
    yt = api;
    const holder = document.createElement("div");
    heroMedia.append(holder);
    player = new api.Player(holder, {
      videoId: media.heroId,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: reduced.matches ? 0 : 1, mute: 1, controls: 0, playsinline: 1,
        rel: 0, loop: 1, playlist: media.heroId, start: media.heroStart, end: media.heroEnd,
        disablekb: 1, iv_load_policy: 3, origin: window.location.origin,
      },
      events: {
        onReady: () => {
          if (disposed) return;
          ready = true;
          const frame = player.getIframe();
          frame.title = "自社メディア制作映像・無音の背景再生";
          frame.tabIndex = -1;
          frame.setAttribute("aria-hidden", "true");
          frame.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
          cover();
          heroToggle.disabled = false;
          heroToggle.textContent = manuallyPaused ? "映像を再生" : "映像を停止";
          heroStatus.textContent = manuallyPaused ? "背景は静止表示／自社メディア制作映像" : "自社メディア映像／無音";
          playHero();
        },
        onStateChange: (event) => {
          if (disposed) return;
          if (event.data === api.PlayerState.PLAYING) {
            // A late autoplay event must still respect visibility and reduced motion.
            if (manuallyPaused || !heroVisible || document.hidden || modalOpen) { pauseHero(); return; }
            heroMedia.classList.add("is-playing");
            heroStatus.textContent = "自社メディア映像／無音再生中";
            heroToggle.textContent = "映像を停止";
            emit("hero_video_play");
          }
          if (event.data === api.PlayerState.PAUSED) {
            heroToggle.textContent = "映像を再生";
            heroStatus.textContent = "背景映像を停止中";
          }
          if (event.data === api.PlayerState.ENDED && !manuallyPaused && heroVisible && !document.hidden && !modalOpen) {
            player.seekTo(media.heroStart, true);
            playHero();
          }
        },
        onAutoplayBlocked: () => {
          if (disposed) return;
          manuallyPaused = true;
          heroStatus.textContent = "再生ボタンから背景映像を開始できます";
          heroToggle.textContent = "映像を再生";
          heroToggle.disabled = false;
        },
        onError: fallback,
      },
    });
  }).catch(fallback);
  const fallbackTimer = window.setTimeout(() => {
    if (disposed || heroMedia.classList.contains("is-playing")) return;
    heroStatus.textContent = reduced.matches ? "背景は静止表示／自社メディア制作映像" : "背景は静止表示／再生を選べます";
    heroToggle.disabled = false;
    heroToggle.textContent = ready ? "映像を再生" : "作品を見る";
  }, 13000);
  on(heroToggle, "click", () => {
    if (!ready) { $("films").scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth" }); return; }
    if (player.getPlayerState() === yt.PlayerState.PLAYING) { manuallyPaused = true; pauseHero(); }
    else { manuallyPaused = false; playHero(); }
  });
  on(document, "visibilitychange", () => document.hidden ? pauseHero() : playHero());
  on(reduced, "change", (event) => { if (event.matches) { manuallyPaused = true; pauseHero(); } });
  root.querySelectorAll("[data-scroll]").forEach((button) => {
    on(button, "click", () => rail.scrollBy({ left: rail.clientWidth * .72 * Number(button.dataset.scroll), behavior: reduced.matches ? "instant" : "smooth" }));
  });
  on(rail, "keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    rail.scrollBy({ left: rail.clientWidth * .72 * (event.key === "ArrowRight" ? 1 : -1), behavior: reduced.matches ? "instant" : "smooth" });
  });
  function exitLpFullscreen() {
    if (document.fullscreenElement && playerContainer.contains(document.fullscreenElement)) {
      document.exitFullscreen().catch(() => {});
    }
  }
  on(document, "fullscreenchange", () => { if (!modalOpen) exitLpFullscreen(); });
  function cleanDialog(restoreFocus = true) {
    exitLpFullscreen();
    window.clearInterval(modalProgress);
    modalProgress = null;
    modalPlayer?.destroy?.();
    modalPlayer = null;
    playerContainer.replaceChildren();
    if (previousOverflow !== null) document.body.style.overflow = previousOverflow;
    previousOverflow = null;
    modalOpen = false;
    if (restoreFocus && lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    playHero();
  }
  function openFilm(video, trigger) {
    lastTrigger = trigger;
    modalOpen = true;
    pauseHero();
    $("dialog-title").textContent = video.title;
    $("video-external").href = video.url;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
    frame.title = video.originalTitle;
    frame.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    playerContainer.replaceChildren(frame);
    dialog.showModal();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emit("video_open", { videoId: video.id });
    if (window.YT?.Player) {
      let started = false;
      const milestones = new Set();
      modalPlayer = new window.YT.Player(frame, { events: { onStateChange: (event) => {
        if (!disposed && event.data === window.YT.PlayerState.PLAYING && !started) {
          started = true; emit("video_play", { videoId: video.id });
        }
      } } });
      modalProgress = window.setInterval(() => {
        if (!modalPlayer?.getDuration) return;
        const duration = modalPlayer.getDuration();
        const percentage = duration ? modalPlayer.getCurrentTime() / duration * 100 : 0;
        for (const milestone of [25, 50, 75]) {
          if (percentage >= milestone && !milestones.has(milestone)) {
            milestones.add(milestone); emit("video_progress", { videoId: video.id, percent: milestone });
          }
        }
      }, 3000);
    }
  }
  root.querySelectorAll("[data-video-id]").forEach((button) => {
    const video = media.videos.find((item) => item.id === button.dataset.videoId);
    if (video) on(button, "click", () => openFilm(video, button));
  });
  on($("close-video"), "click", () => dialog.close());
  on(dialog, "close", () => cleanDialog());
  on(dialog, "click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  on($("fullscreen-video"), "click", async () => {
    try {
      if (playerContainer.requestFullscreen) {
        await playerContainer.requestFullscreen();
        // Closing can race with the browser entering fullscreen.
        if (disposed || !modalOpen) exitLpFullscreen();
      }
      else throw new Error("Fullscreen unsupported");
    } catch {
      if (!disposed) $("playback-note").firstChild.textContent = "プレイヤー右下の全画面ボタンをご利用ください。再生できない場合は ";
    }
  });
  return () => {
    disposed = true;
    controller.abort();
    window.clearTimeout(fallbackTimer);
    resize.disconnect();
    visibility.disconnect();
    cleanDialog(false);
    if (dialog.open) dialog.close();
    player?.destroy?.();
    heroMedia.classList.remove("is-playing");
  };
}
