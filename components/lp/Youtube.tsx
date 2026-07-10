import { Reveal } from "./Reveal";

const YT_POINTS = [
  "まだ転職を考えていない人にも届く",
  "SNSで拡散される",
  "企業資産として蓄積される",
  "検索され、見られ続ける",
];

/**
 * S7 — なぜYouTubeなのか。左「採用サイト」／右「YouTube」の対比。締めを強調。
 */
export function Youtube() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">WHY YOUTUBE</p>
          <h2 className="text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-4xl">
            なぜ、YouTubeなのか。
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* 採用サイト */}
          <Reveal className="rounded-2xl border border-[var(--line)] bg-white p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">採用サイト</h3>
            <p className="mt-5 text-[15px] leading-[2] text-[var(--ink-soft)]">
              採用サイトは、「いま探している人」しか見ません。
            </p>
          </Reveal>

          {/* YouTube */}
          <Reveal
            delay={100}
            className="rounded-2xl border border-[var(--brand-ink)]/25 bg-[var(--brand-soft)] p-8"
          >
            <h3 className="text-lg font-bold text-[var(--brand-ink)]">YouTube</h3>
            <ul className="mt-5 space-y-3">
              {YT_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[var(--brand-ink)]"
                  >
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15px] leading-relaxed text-[var(--ink)]">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-xl font-bold leading-relaxed text-[var(--text-primary)] sm:text-2xl">
            採用広報を、&quot;消える広告&quot;から&quot;貯まる資産&quot;へ。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
