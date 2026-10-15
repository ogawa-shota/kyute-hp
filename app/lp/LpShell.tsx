import Link from "next/link";
import { Logo } from "@/components/lp/Logo";
import { Button } from "@/components/site/ui";

/** Ad landing page shell: the corporate design without site navigation. */
export function LpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:h-[76px] md:px-10">
          <Link href="/" aria-label="KYUTE トップ"><Logo /></Link>
          <div className="flex gap-2">
            <Button href="#download" size="sm" cta="lp-header-download">資料をもらう</Button>
            <Button href="/contact" variant="outline" size="sm" cta="lp-header-contact" className="hidden sm:inline-flex">無料相談</Button>
          </div>
        </div>
      </header>
      <main className="pt-16 md:pt-[76px]">{children}</main>
      <footer className="bg-[var(--ink-strong)] px-5 py-10 text-center text-sm text-white/60">© {new Date().getFullYear()} KYUTE合同会社</footer>
    </div>
  );
}
