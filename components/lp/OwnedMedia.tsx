import Image from "next/image";
import { Reveal } from "./Reveal";

const CHANNEL_URL = "https://youtube.com/@undo-job";
const FILMS = [
  { id: "QzPRS_T-D4Q", title: "カフェ経営者の一日", thumbnail: "/lp-assets/studio/cafe-1.webp", alt: "屋外で取材に答えるカフェ経営者" },
  { id: "QT5ZYECnOUM", title: "教育事業を営む起業家の一日", thumbnail: "/lp-assets/studio/okada-1.webp", alt: "パソコンを前に仕事について語る起業家" },
];

/** 公開チャンネルのロゴと、本編から切り出した実写サムネイルを表示。 */
export function OwnedMedia() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">OWNED MEDIA</p>
          <h2 className="section-title text-[var(--text-primary)]">自社メディア『運動部のしごと』</h2>
          <p className="mt-6 max-w-[42rem] text-base leading-[1.95] text-[var(--ink-soft)]">
            日本中の&quot;働く&quot;を密着取材する動画メディアを運営。<br />
            企業と求職者を、リアルなコンテンツで新しく出会わせます。
          </p>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--brand-ink)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            YouTubeチャンネルを見る <span aria-hidden="true">↗</span><span className="sr-only">（新しいタブで開きます）</span>
          </a>
        </Reveal>
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6" data-owned-media>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label="運動部のシゴト。のYouTubeチャンネルを開く（新しいタブ）">
              <Image src="/undo-job-assets/channel-logo.jpg" alt="運動部のシゴト。のロゴ" width={160} height={160} sizes="80px" className="h-20 w-20 shrink-0 object-contain" />
              <div><p className="text-lg font-bold text-[var(--text-primary)]">運動部のシゴト。</p><p className="mt-1 text-sm text-[var(--ink-soft)]">@undo-job</p></div>
            </a>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {FILMS.map(film => (
                <a key={film.id} href={`https://www.youtube.com/watch?v=${film.id}`} target="_blank" rel="noopener noreferrer" className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${film.title}をYouTubeで見る（新しいタブ）`}>
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--bg-soft)]">
                    <Image src={film.thumbnail} alt={film.alt} width={1112} height={626} sizes="(max-width: 639px) calc(100vw - 88px), (max-width: 1023px) 45vw, 245px" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none" />
                    <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 text-white" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M6 3l11 7-11 7z" /></svg></span>
                  </div>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[var(--text-primary)]">{film.title}</p>
                  <p className="mt-1 text-xs text-[var(--ink-soft)]">YouTubeで見る <span aria-hidden="true">↗</span></p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
