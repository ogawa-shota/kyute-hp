"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/site-content";
import { CtaButton } from "./CtaButton";

export function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--ink)] md:text-xl">
            ステラアカデミー
          </span>
          <span className="text-[10px] font-medium text-[var(--muted)] md:text-xs">
            総合型選抜専門塾
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="グローバルナビ">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full z-20 mt-1 min-w-[12rem] rounded-xl border border-[var(--line)] bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface)]"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CtaButton href="#" variant="line" external>
            LINEで資料請求
          </CtaButton>
          <CtaButton href="#consult">受験相談</CtaButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">メニュー</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[var(--line)] pb-3 last:border-b-0">
                <Link
                  href={item.href}
                  className="font-semibold text-[var(--ink)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-2 flex flex-col gap-2 pl-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="text-sm text-[var(--muted)]"
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <CtaButton href="#" variant="line" external>
                LINEで資料請求
              </CtaButton>
              <CtaButton href="#consult" onClick={() => setOpen(false)}>
                受験相談
              </CtaButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
