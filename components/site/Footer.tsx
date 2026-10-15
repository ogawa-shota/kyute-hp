import Link from "next/link";
import { Button, Container } from "./ui";

const GROUPS = [
  { title: "サービス", links: [
    { label: "採用動画制作", href: "/service/recruit-video" },
    { label: "採用YouTube運用代行", href: "/service/recruit-youtube" },
  ] },
  { title: "事例", links: [
    { label: "制作事例", href: "/works" },
    { label: "運動部のシゴト。", href: "/media" },
  ] },
  { title: "コラム", links: [
    { label: "コラム一覧", href: "/column" },
    { label: "採用動画", href: "/column/category/recruit-video" },
    { label: "採用YouTube", href: "/column/category/recruit-youtube" },
  ] },
  { title: "会社", links: [
    { label: "会社紹介", href: "/about" },
    { label: "資料請求", href: "/download" },
    { label: "お問い合わせ", href: "/contact" },
  ] },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink-strong)] pb-28 pt-16 text-white/80 md:pt-20 xl:pb-12">
      <Container>
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 md:flex-row md:items-center md:justify-between">
          <p className="text-[24px] font-extrabold leading-[1.5] text-white md:text-[30px]">
            採用の悩みを、<br />まずは聞かせてください。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/download" variant="outline" onDark cta="footer-download">資料をダウンロード</Button>
            <Button href="/contact" cta="footer-contact">無料で相談する →</Button>
          </div>
        </div>
        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="font-[family-name:var(--font-en)] text-2xl font-extrabold tracking-[0.12em] text-white">KYUTE</p>
            <p className="mt-2 text-sm">KYUTE合同会社</p>
          </div>
          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title} className="flex flex-col gap-2 text-[15px]">
              <p className="font-bold text-white">{g.title}</p>
              {g.links.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>
              ))}
            </nav>
          ))}
        </div>
        <p className="mt-12 text-xs text-white/50">© {new Date().getFullYear()} KYUTE</p>
      </Container>
    </footer>
  );
}

/** Mobile-only bottom bar with the two primary actions. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[var(--line)] bg-white/95 px-3 py-2.5 backdrop-blur xl:hidden">
      <Button href="/download" variant="outline" size="sm" cta="mobile-download" className="flex-1">資料請求</Button>
      <Button href="/contact" size="sm" cta="mobile-contact" className="flex-1">無料相談</Button>
    </div>
  );
}
