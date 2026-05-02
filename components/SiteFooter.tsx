import Link from "next/link";
import { footerLinks, site } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-[#06172e] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold tracking-[0.04em]">{site.name}</span>
              <span className="font-script text-base text-white/70">keep you to evolve</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-loose text-white/65">
              {site.description}
            </p>

            <div className="mt-10">
              <p className="font-latin text-[10px] tracking-[0.32em] text-white/40">CONTACT</p>
              <p className="mt-2 font-latin text-base text-white/85">ogawa@kyute.jp</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="font-latin text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">
                  {col.heading}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="transition hover:text-white">
                        {l.label}
                      </Link>
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
          <p className="font-latin tracking-wider">
            © {new Date().getFullYear()} KYUTE Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
