"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

// 差し替え: 実際の回答内容に差し替えてください。
const FAQS = [
  {
    q: "費用感を教えてください。",
    a: "ご予算と目的に合わせてプランをご提案します。まずは無料相談で採用課題をお聞かせください。",
  },
  {
    q: "制作期間はどのくらいですか？",
    a: "企画から公開まで、内容によって変わります。ヒアリング時に目安のスケジュールをご案内します。",
  },
  {
    q: "出演者の負担はありますか？",
    a: "普段の働く様子に密着する形が基本です。特別な準備は不要で、日常の業務のなかで撮影します。",
  },
  {
    q: "撮影範囲はどこまで対応できますか？",
    a: "一日密着、会議、商談、オフィス紹介など、伝えたい“働くリアル”に合わせて柔軟に対応します。",
  },
  {
    q: "YouTube運用はどこまで任せられますか？",
    a: "企画・撮影・編集・運用・分析・改善まで一気通貫で支援します。必要な範囲だけの依頼も可能です。",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq">
      <p className="eyebrow mb-4">FAQ</p>
      <h3 className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
        よくあるご質問
      </h3>

      <div className="mt-8 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[15px] font-medium text-[var(--ink)]">
                  {item.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className={`shrink-0 text-[var(--brand-ink)] transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <Reveal className="mx-auto max-w-3xl">
      <Faq />
    </Reveal>
  );
}
