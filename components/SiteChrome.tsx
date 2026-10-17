"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer, MobileBar } from "@/components/site/Footer";
import { SiteCtaTracker } from "@/components/analytics/SiteCtaTracker";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/lp" || pathname.startsWith("/lp/")) return (
    <>
      <SiteCtaTracker />
      {children}
      <nav aria-label="アクセス解析の設定" className="bg-white px-5 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 text-center text-[17px] leading-[1.7] text-[#1d1f24] xl:pb-4">
        <Link href="/analytics" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">アクセス解析について・設定</Link>
      </nav>
    </>
  );
  return (
    <div className="site">
      <SiteCtaTracker />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        本文へスキップ
      </a>
      <Header />
      <main id="main" className="pt-16 md:pt-[76px]">{children}</main>
      <Footer />
      <MobileBar />
    </div>
  );
}
