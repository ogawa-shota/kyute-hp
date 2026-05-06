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
          ? "border-b-2 border-[var(--ink)] bg-[var(--header)] backdrop-blur-xl"
          : "border-b-2 border-[var(--ink)] bg-[var(--header)]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-latin text-3xl font-extrabold tracking-normal text-[var(--ink)] transition group-hover:text-[var(--brand-deep)]">
            {site.name}
          </span>
          <span className="hidden rotate-[-2deg] bg-[var(--accent)] px-2 py-1 font-latin text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--ink)] sm:block">
            keep you to evolve
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="グローバルナビ">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-1.5 text-[12px] font-bold text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--brand)] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[4px_4px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
        <div className="border-t-2 border-[var(--ink)] bg-[var(--bg)] px-5 pb-8 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block border-b border-[var(--line-soft)] px-1 py-3 text-sm font-bold text-[var(--ink)] transition hover:text-[var(--brand-deep)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white shadow-[4px_4px_0_var(--brand)]"
            >
              お問い合わせ →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
