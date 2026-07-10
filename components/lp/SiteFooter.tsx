import Link from "next/link";

const NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const SERVICE = [
  { label: "YouTube運営代行事業", href: "/service/youtube" },
  { label: "自社メディア事業", href: "/service/media" },
];

/** サイト共通のスリムなフッター（全ページ表示）。 */
export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line-soft)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-latin text-2xl font-semibold tracking-[0.14em] text-[var(--text-primary)]">
              KYUTE
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
              採用は「どれだけ伝わるか」が全て。
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide text-[var(--ink-mute)]">
                MENU
              </span>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-latin text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--brand-ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/service"
                className="font-latin text-xs font-semibold tracking-wide text-[var(--ink-mute)] transition-colors hover:text-[var(--brand-ink)]"
              >
                SERVICE
              </Link>
              {SERVICE.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--brand-ink)]"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--line-soft)] pt-6">
          <p className="text-xs text-[var(--ink-mute)]">© {new Date().getFullYear()} KYUTE</p>
        </div>
      </div>
    </footer>
  );
}
