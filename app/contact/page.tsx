import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { ContactForm } from "@/components/lp/ContactForm";
import { FaqSection } from "@/components/lp/Faq";
import { Reveal } from "@/components/lp/Reveal";

export const metadata: Metadata = {
  title: "CONTACT｜KYUTE",
  description:
    "採用課題のヒアリングから始めます。相談は無料。会社名・担当者名・メール・いまの採用課題をお送りください。",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="無料で相談する"
        lead="採用課題のヒアリングから始めます。まずはお気軽にご相談ください。"
      />

      {/* フォーム */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <FaqSection />
        </div>
      </section>
    </>
  );
}
