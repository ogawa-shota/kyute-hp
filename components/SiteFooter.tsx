import Link from "next/link";
import { footerLinks, site } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-[var(--ink)] bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-latin text-4xl font-extrabold tracking-normal">{site.name}</span>
              <span className="rotate-[-3deg] bg-[var(--accent)] px-2 py-1 font-latin text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--ink)]">keep you to evolve</span>
            </div>
            <p className="mt-6 max-w-sm text-sm font-bold leading-loose text-white/70">
              {site.mission}
            </p>

            <div className="mt-10">
              <p className="font-latin text-[10px] tracking-[0.32em] text-white/40">CONTACT</p>
              <p className="mt-2 font-latin text-base text-white/85">contact@kyute.jp</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="font-latin text-lg font-extrabold uppercase tracking-[0.14em] text-[var(--accent)]">
                  {col.heading}
                </p>
                <ul className="mt-5 space-y-3 text-sm font-bold text-white/80">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a
                          href={l.href}
                          {...(!l.href.startsWith("#")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="inline-flex items-center gap-1.5 transition hover:text-white"
                        >
                          {l.label}
                          <span className="text-[10px] text-white/40">↗</span>
                        </a>
                      ) : (
                        <Link href={l.href} className="transition hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-white">プライバシーポリシー</Link>
            <Link href="#" className="hover:text-white">特定商取引法に基づく記載</Link>
          </div>
          <p className="font-latin text-sm font-extrabold tracking-wider">
            © {new Date().getFullYear()} KYUTE LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
