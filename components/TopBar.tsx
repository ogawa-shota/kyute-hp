"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site-content";

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--header)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="text-2xl font-bold tracking-[0.04em] text-[var(--ink)] transition group-hover:text-[var(--brand)]">
            {site.name}
          </span>
          <span className="hidden font-script text-base text-[var(--brand)] sm:block">
            keep you to evolve
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="グローバルナビ">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-[var(--ink-soft)] transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--brand)]"
          >
            お問い合わせ
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] lg:hidden"
          aria-expanded={open}
          aria-label="メニュー"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white px-5 pb-8 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-[var(--ink-soft)] transition hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white"
            >
              お問い合わせ →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
