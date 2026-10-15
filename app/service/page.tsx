import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/components/site/data";
import { PageIntro, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "サービス｜KYUTE",
  description: "KYUTEのサービス。面白く、心に残る採用動画制作と、認知を取って心を掴んで離さない採用YouTube運用代行をご紹介します。",
  alternates: { canonical: "/service" },
};

export default function ServicePage() {
  return (
    <>
      <PageIntro
        eyebrow="SERVICE"
        title="サービス"
        lead="採用の悩みに合わせて、採用動画制作と採用YouTube運用代行をご提供しています。"
        crumbs={[{ label: "トップ", href: "/" }, { label: "サービス" }]}
      />
      <Section tone="soft">
        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link key={s.id} href={s.href} className="group flex flex-col gap-4 rounded-3xl bg-white p-7 transition hover:bg-[var(--bg-tint)] md:p-9">
              <div className="flex flex-wrap gap-2">
                {s.pains.map((p) => <span key={p} className="rounded-full border border-[var(--line)] px-4 py-2 text-[15px]">{p}</span>)}
              </div>
              <h2 className="text-[26px] md:text-[30px]">{s.name} <span aria-hidden="true">→</span></h2>
              <p className="text-[var(--ink-soft)]">{s.lead}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
