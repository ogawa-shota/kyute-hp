import { pageMetadata } from "@/app/seo";
import { COMPANY } from "@/components/site/data";
import { Breadcrumb, Container, Eyebrow, Heading, Section } from "@/components/site/ui";

export const metadata = pageMetadata({
  path: "/about",
  title: "会社紹介｜KYUTE",
  description: "すべての企業に、YouTube採用を。KYUTEは、採用を消費から資産へ変えます。KYUTEの考え方と会社概要をご紹介します。",
});

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

      <Section tone="dark" labelledBy="philosophy">
        <Eyebrow onDark>PHILOSOPHY</Eyebrow>
        <h2 id="philosophy" className="text-[40px] leading-[1.3] text-white md:text-[72px]">採用を、<br />消費から資産へ。</h2>
      </Section>

      <Section id="company" labelledBy="company-h">
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
