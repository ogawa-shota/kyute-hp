import { Reveal } from "./Reveal";

const CHANNEL_URL = "https://youtube.com/@undo-job";

/**
 * 自社動画メディアの紹介（ABOUTページ用）。
 * 自社メディア『運動部のしごと』のYouTubeチャンネルへ誘導。
 * 差し替え: チャンネルに公開動画が揃ったら、下のカードを
 * <iframe src="https://www.youtube.com/embed/【動画ID】" ... /> に差し替え可能。
 */
export function OwnedMedia() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">OWNED MEDIA</p>
          <h2 className="text-2xl font-semibold leading-snug text-[var(--text-primary)] sm:text-3xl">
            自社メディア『運動部のしごと』
          </h2>
          <p className="mt-5 text-[15px] leading-[2] text-[var(--ink-soft)] sm:text-base">
            日本中の&quot;働く&quot;を密着取材する動画メディアを運営。
            <br />
            企業と求職者を、リアルなコンテンツで新しく出会わせます。
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-ink)] transition-colors hover:text-[var(--text-primary)]"
          >
            YouTubeチャンネルを見る
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h9M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={100}>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="運動部のしごと｜YouTubeチャンネルを開く"
            className="group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--ink-strong)] shadow-sm"
          >
            <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_50%_38%,rgba(255,219,103,0.16),transparent_60%)] px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff0033] shadow-lg transition-transform group-hover:scale-105">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9.5 7.8v8.4l7-4.2-7-4.2z" fill="#fff" />
                </svg>
              </span>
              <div>
                <p className="text-lg font-bold text-white">運動部のしごと。</p>
                <p className="mt-1 font-latin text-sm tracking-wide text-white/55">
                  @undo-job
                </p>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
