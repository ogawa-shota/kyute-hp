"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/lp/Header";
import { SiteFooter } from "@/components/lp/SiteFooter";
import { MobileCtaBar } from "@/components/lp/MobileCtaBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/lp" || pathname.startsWith("/lp/")) return children;
  return (
    <>
      <Header />
      <main>{children}</main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
