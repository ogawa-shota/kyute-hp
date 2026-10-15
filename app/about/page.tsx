import type { Metadata } from "next";
import { COMPANY } from "@/components/site/data";
import { AnswerCards, AssetCompare, HeartCurve, MoneyCycle } from "@/components/site/diagrams";
import { Breadcrumb, Button, Container, Eyebrow, Heading, Lead, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "会社紹介｜KYUTE",
  description: "すべての企業に、YouTube採用を。KYUTEは、採用を消費から資産へ変えます。KYUTEの考え方と会社概要をご紹介します。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white pb-20 pt-10 md:pb-32 md:pt-14">
        <Container>
          <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "会社紹介" }]} />
          <div className="mt-16 md:mt-24">
            <Eyebrow>MISSION</Eyebrow>
            <h1 className="text-[44px] leading-[1.3] md:text-[88px]">
              すべての企業に、<br /><span className="marker">YouTube採用</span>を。
            </h1>
          </div>
        </Container>
      </section>

      <Section tone="dark" className="!pb-16" labelledBy="philosophy">
        <Eyebrow onDark>PHILOSOPHY</Eyebrow>
        <h2 id="philosophy" className="text-[40px] leading-[1.3] text-white md:text-[72px]">採用を、<br />消費から資産へ。</h2>
      </Section>

      <Section labelledBy="money">
        <Heading id="money">1人の応募を獲得するのに、<br />膨大なお金がかかるのが採用。</Heading>
        <Lead>しかも、そのお金は毎年毎年、かかっては消えていく。</Lead>
        <MoneyCycle />
      </Section>

      <Section tone="soft" labelledBy="heart">
        <Heading id="heart">なのに、一度掴んだ心が、<br />何度も離れてしまうのが採用。</Heading>
        <HeartCurve />
      </Section>

      <Section tone="dark" labelledBy="answer">
        <h2 id="answer" className="text-[40px] leading-[1.3] text-white md:text-[72px]">
          認知を取って、<br />心を掴んで、<br /><span className="text-[var(--brand)]">離さない。</span>
        </h2>
        <p className="mt-5 text-[22px] font-extrabold text-[var(--brand)]">それが、採用YouTube。</p>
        <AnswerCards />
      </Section>

      <Section labelledBy="asset">
        <Heading id="asset">しかも、採用YouTubeは<br />消費ではなく、資産。</Heading>
        <Lead>一度つくったコンテンツは、公開後も働き続ける。</Lead>
        <AssetCompare />
        <div className="mt-12 flex justify-center">
          <Button href="/service/recruit-youtube" variant="dark" cta="about-youtube">採用YouTube運用代行を見る →</Button>
        </div>
      </Section>

      <Section tone="soft" id="company" labelledBy="company-h">
        <Eyebrow>COMPANY</Eyebrow>
        <Heading id="company-h">会社概要</Heading>
        <dl className="mt-8 border-t border-[var(--line)]">
          {COMPANY.map((row) => (
            <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-[var(--line)] py-5 md:grid-cols-[14rem_1fr]">
              <dt className="font-bold">{row.label}</dt>
              <dd className="text-[var(--ink-soft)]">{row.href ? <a className="underline" href={row.href}>{row.value}</a> : row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
