"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";

const NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const SERVICE_ITEMS = [
  { label: "YouTube運営代行事業", href: "/service/youtube" },
  { label: "自社メディア事業", href: "/service/media" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--header-scrolled)] backdrop-blur-md border-b border-[var(--line-soft)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="KYUTE ホーム" className="inline-flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className={`font-latin text-sm font-medium tracking-[0.08em] transition-colors hover:text-[var(--brand-ink)] ${
              isActive("/") ? "text-[var(--brand-ink)]" : "text-[var(--ink-soft)]"
            }`}
          >
            HOME
          </Link>

          {/* SERVICE — クリックでまとめページ、hover で2事業へ */}
          <div className="group relative">
            <Link
              href="/service"
              className={`font-latin flex items-center gap-1 text-sm font-medium tracking-[0.08em] transition-colors group-hover:text-[var(--brand-ink)] ${
                isActive("/service") ? "text-[var(--brand-ink)]" : "text-[var(--ink-soft)]"
              }`}
            >
              SERVICE
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 transition-transform group-hover:rotate-180"
              >
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[var(--line-soft)] bg-white/95 py-1.5 shadow-[0_18px_44px_rgba(20,20,25,0.12)] backdrop-blur-md">
                {SERVICE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--brand-ink)] ${
                      isActive(item.href) ? "text-[var(--brand-ink)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV.filter((item) => item.href !== "/").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-latin text-sm font-medium tracking-[0.08em] transition-colors hover:text-[var(--brand-ink)] ${
                isActive(item.href) ? "text-[var(--brand-ink)]" : "text-[var(--ink-soft)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <CtaButton href="/contact" cta="header" className="px-6 py-2.5 text-sm">
            無料で相談する
          </CtaButton>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-[var(--ink-strong)] transition-transform ${
                menuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-[var(--ink-strong)] transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-[var(--ink-strong)] transition-transform ${
                menuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-[var(--line-soft)] bg-white/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`font-latin py-2.5 text-base font-medium tracking-wide ${
                isActive("/") ? "text-[var(--brand-ink)]" : "text-[var(--ink)]"
              }`}
            >
              HOME
            </Link>

            <Link
              href="/service"
              onClick={() => setMenuOpen(false)}
              className={`font-latin py-2.5 text-base font-medium tracking-wide ${
                pathname === "/service" ? "text-[var(--brand-ink)]" : "text-[var(--ink)]"
              }`}
            >
              SERVICE
            </Link>
            {SERVICE_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`py-2 pl-3 text-[15px] font-medium ${
                  isActive(item.href) ? "text-[var(--brand-ink)]" : "text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {NAV.filter((item) => item.href !== "/").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`font-latin py-2.5 text-base font-medium tracking-wide ${
                  isActive(item.href) ? "text-[var(--brand-ink)]" : "text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
