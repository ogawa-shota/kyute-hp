import type { NavItem, Service, ValueItem } from "@/lib/types";

export const site = {
  name: "KYUTE",
  nameJa: "KYUTE合同会社",
  acronym: "Keep You To Evolve",
  tagline: "成長を、止めない。",
  mission:
    "総合型選抜を通じて、社会に羽ばたく人を育成する。",
  description:
    "KYUTE は、総合型選抜メディア「AOナビ」を企画・開発・運営する会社です。大学選び、塾比較、合格体験記、出願ノウハウをひとつにつなぎ、受験生が自分らしい進路に出会う入口をつくります。",
};

export const externalLinks = {
  aonavi: "#",
};

export const navItems: NavItem[] = [
  { label: "ミッション", href: "#mission" },
  { label: "AOナビ", href: "#services" },
  { label: "私たちについて", href: "#about" },
  { label: "会社情報", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
];

export const heroCopy = {
  eyebrow: "Keep You To Evolve",
  titleLines: ["AOナビで、", "未来を選ぶ。"],
  lead:
    "総合型選抜の情報は、まだ探しづらく、比べづらい。\nAOナビは、大学・塾・体験談・対策ノウハウをつなぎ、受験生が自分の挑戦を選び取るためのメディアです。",
  scrollLabel: "Scroll",
};

export const valuePoints: ValueItem[] = [
  {
    no: "01",
    label: "Mission",
    title: "総合型選抜を、もっと開かれた選択肢にする",
    body: "情報の差で挑戦をあきらめる人を減らす。AOナビを通じて、受験生が自分に合う大学・対策・進路に出会える環境をつくります。",
  },
];

export const services: Service[] = [
  {
    id: "aonavi",
    badge: "Media 01",
    title: "総合型選抜メディア「AOナビ」",
    tagline: "探す、知る、選ぶ。総合型選抜のすべてが集まる場所。",
    body:
      "全国の大学を年内入試の切り口で検索でき、対策塾の比較、合格体験記、出願ノウハウまで一気通貫で届けるメディアです。総合型選抜に挑戦する受験生の、最初の入口になることを目指します。",
    features: [
      "全国の大学を総合型・学校推薦型選抜の切り口で検索",
      "対策塾の比較・資料請求・体験申込をサポート",
      "合格体験記・出願ノウハウ・お役立ちコラムを発信",
      "合格力診断で自分に合う大学・進路の発見を支援",
    ],
    href: externalLinks.aonavi,
    image:
      "/aonavi-header.png",
    imageAlt: "AOナビのヘッダー画像",
    ctaLabel: "AOナビを見る",
    external: true,
  },
];

export const aboutCopy = {
  eyebrow: "About KYUTE",
  title: "総合型選抜のいま、\n挑戦する人の隣に。",
  body:
    "総合型選抜（旧 AO 入試）は、点数だけでは測れない「あなたという物語」を問う入試です。\n\n一方で、大学ごとの入試情報、対策方法、塾選び、合格者のリアルな声は分散していて、何から始めればよいか分からない受験生も少なくありません。\n\nKYUTE は AOナビを通じて、総合型選抜に挑戦する人が、自分に合う情報と選択肢に出会える入口をつくります。",
  stats: [
    { value: "1", suffix: "Media", label: "総合型選抜に特化したメディア" },
    { value: "47", suffix: "Pref.", label: "全国の大学情報を届ける構想" },
    { value: "AO", suffix: "NAVI", label: "挑戦の入口となるサービス" },
  ],
};

export const companyInfo: { label: string; value: string }[] = [
  { label: "会社名", value: "KYUTE合同会社（KYUTE LLC）" },
  { label: "設立", value: "2026 年 1 月" },
  {
    label: "事業内容",
    value: "総合型選抜メディア「AOナビ」の企画・開発・運営",
  },
  { label: "所在地", value: "東京都（詳細は近日公開）" },
  { label: "お問い合わせ", value: "contact@kyute.jp" },
];

export const contactCopy = {
  eyebrow: "Contact",
  title: "総合型選抜の挑戦を、\n一緒に支えませんか。",
  body:
    "AOナビへの掲載・提携、教育機関や自治体の皆さまからの連携、取材のご依頼まで、お気軽にお問い合わせください。",
  primaryCta: { label: "お問い合わせする", href: "mailto:contact@kyute.jp" },
  secondaryCta: { label: "AOナビを見る", href: externalLinks.aonavi },
};

export type FooterLink = { label: string; href: string; external?: boolean };

export const footerLinks: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Media",
    links: [{ label: "Media: AOナビ", href: externalLinks.aonavi, external: true }],
  },
  {
    heading: "Company",
    links: [
      { label: "ミッション", href: "#mission" },
      { label: "私たちについて", href: "#about" },
      { label: "会社情報", href: "#company" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "お問い合わせ", href: "#contact" }],
  },
];
