import Link from "next/link";
import { footerColumns, site } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-[#071422] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-display)] text-xl font-bold">{site.name}</p>
          <p className="text-xs text-white/60">{site.tagline}</p>
        </div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">
          株式会社ステラ教育研究所
          <br />
          〒101-0035 東京都千代田区（仮）
          <br />
          <span className="text-white/55">※デモ用の住所です。公開前に必ず差し替えてください。</span>
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-bold text-white">{col.heading}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-xs text-white/55">
          <Link href="#" className="hover:text-white">
            プライバシーポリシー
          </Link>
          <Link href="#" className="hover:text-white">
            特定商取引法に基づく記載
          </Link>
          <Link href="#" className="hover:text-white">
            運営会社
          </Link>
        </div>
        <p className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Stellar Academy Demo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
