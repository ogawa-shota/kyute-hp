"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/lp/Logo";
import { Button } from "./ui";

const NAV = [
  { label: "採用動画制作", href: "/service/recruit-video" },
  { label: "採用YouTube運用代行", href: "/service/recruit-youtube" },
  { label: "運動部のシゴト。", href: "/media" },
  { label: "制作事例", href: "/works" },
  { label: "コラム", href: "/column" },
  { label: "会社紹介", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 md:h-[76px] md:px-10">
        <Link href="/" aria-label="KYUTE トップ" className="inline-flex items-center">
          <Logo />
        </Link>

        <nav aria-label="メイン" className="hidden items-center gap-6 text-[15px] font-bold xl:flex 2xl:gap-8">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} data-cta={`header-nav-${n.href.slice(1).replaceAll("/", "-")}`} aria-current={current(n.href)} className="hover:text-[var(--brand-ink)] aria-[current=page]:text-[var(--brand-ink)]">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href="/download" variant="outline" size="sm" cta="header-download">資料請求</Button>
          <Button href="/contact" size="sm" cta="header-contact">無料相談</Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true" className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="メイン" className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-[var(--line)] bg-white px-5 pb-32 pt-4 md:h-[calc(100dvh-76px)] xl:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} data-cta={`mobile-nav-${n.href.slice(1).replaceAll("/", "-")}`} className="block border-b border-[var(--line)] py-4 text-lg font-bold">{n.label}</Link>
          ))}
          <Link href="/contact" data-cta="mobile-menu-contact" className="block border-b border-[var(--line)] py-4 text-lg font-bold">お問い合わせ</Link>
        </nav>
      )}
    </header>
  );
}
