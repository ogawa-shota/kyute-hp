"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer, MobileBar } from "@/components/site/Footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/lp" || pathname.startsWith("/lp/")) return children;
  return (
    <div className="site">
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
