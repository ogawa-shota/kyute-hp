import type { NavItem, Service, ValueItem } from "@/lib/types";

export const site = {
  name: "KYUTE",
  nameJa: "KYUTE合同会社",
  acronym: "Keep You To Evolve",
  tagline: "承諾を、設計する。",
  mission:
    "候補者の「腹落ち」を設計し、内定承諾につながる採用広報を、当たり前にする。",
  description:
    "KYUTEは、密着動画制作を主力に、内定承諾から逆算した採用広報を設計する会社です。採用戦略策定から、採用サイト・LP制作、SNS運用、選考体験設計まで——「応募を増やす」ではなく「承諾を増やす」ことに、すべての施策を接続します。",
};

export const externalLinks = {
  contact: "mailto:contact@kyute.jp",
};

export const navItems: NavItem[] = [
  { label: "課題", href: "#mission" },
  { label: "サービス", href: "#services" },
  { label: "承諾の設計", href: "#about" },
  { label: "会社情報", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
];

export const heroCopy = {
  eyebrow: "Recruitment Closing",
  titleLines: ["密着動画で、", "承諾をつくる。"],
  lead:
    "「いい候補者ほど辞退する」を、終わらせる。\n密着動画で、候補者が「この会社で働く理由」に納得する状態をつくり、内定承諾の最終局面を支援します。",
  scrollLabel: "Scroll",
};

export const valuePoints: ValueItem[] = [
  {
    no: "01",
    label: "Issue",
    title: "採用広報が、内定承諾につながっていない",
    body:
      "動画も採用サイトも整えた。応募数も伸びた。それでも最終局面で辞退される——広報施策と意思決定が、断絶しているからです。",
  },
  {
    no: "02",
    label: "Issue",
    title: "採用動画が「会社紹介」で終わっている",
    body:
      "雰囲気も理念も伝わる。けれど候補者は、入社後の自分の働く姿を具体的に想像できていない。志望度を引き上げる材料になっていません。",
  },
  {
    no: "03",
    label: "Issue",
    title: "面接後、ひとりに戻った瞬間に揺らぐ",
    body:
      "候補者が見ているのは会社ではなく、自分自身の選択です。一人で意思決定する時間に、迷いを支える「腹落ちの材料」が残っていません。",
  },
];

export const services: Service[] = [
  {
    id: "closing-video",
    badge: "Service 01",
    title: "内定承諾を動かす、密着動画制作",
    tagline: "Closing Video Production",
    body:
      "社員一人ひとりの仕事・価値観・入社理由を密着で記録し、候補者が自分自身と重ねられる「ロールモデル動画」をつくります。きれいなブランディング動画ではなく、候補者が「ここで働く未来」を具体化できる、意思決定支援コンテンツです。",
    features: [
      "候補者に近いロールモデル社員を1日密着で撮影",
      "入社理由・仕事のリアル・成長ストーリーを構成設計",
      "チームの空気感・働き方・入社後の景色を可視化",
      "最終面接・内定者面談に組み込み、承諾率に直結させる設計",
    ],
    href: "#contact",
    image: "/aonavi-header.png",
    imageAlt: "密着動画のイメージ",
    ctaLabel: "密着動画について相談する",
  },
  {
    id: "recruitment-pr-suite",
    badge: "Service 02",
    title: "承諾率から逆算する、採用広報の包括支援",
    tagline: "Recruitment PR Suite",
    body:
      "採用競争戦略の策定から、ターゲット・ペルソナ設計、採用サイト・LP・ピッチ資料制作、SNS運用、選考体験設計まで。すべての施策を「内定承諾」というゴールに接続して設計・運用伴走します。",
    features: [
      "採用競争戦略・ターゲット／ペルソナ・採用コンセプト設計",
      "採用サイト・採用LP・採用ピッチ資料の制作",
      "note／SNS／YouTubeなどの採用広報コンテンツ企画・運用",
      "選考体験設計と、内定承諾率向上のためのコミュニケーション設計",
    ],
    href: "#contact",
    image: "/aonavi-header.png",
    imageAlt: "採用広報支援のイメージ",
    ctaLabel: "包括支援について相談する",
  },
];

export const aboutCopy = {
  eyebrow: "How It Works",
  title: "内定承諾は、\n自己認知 × 企業解像度 × 社員共感で決まる。",
  body:
    "候補者は、会社を見ているのではありません。自分自身の選択を見ています。\n\n「この仕事で成長できるか」「この人たちと働きたいか」「数年後、この選択を正解だったと思えるか」——その答えが揃ったとき、人ははじめて承諾を決めます。\n\nKYUTEは、自己認知・企業解像度・社員共感の3要素を密着動画と採用広報で同時に高め、候補者の意思決定を内側から支えます。",
  stats: [
    { value: "01", suffix: "Self", label: "自己認知：自分は何を大切にしたいか" },
    { value: "02", suffix: "Co.", label: "企業解像度：この会社で何が起きているか" },
    { value: "03", suffix: "Team", label: "社員共感：この人たちと働きたいか" },
  ],
};

export const companyInfo: { label: string; value: string }[] = [
  { label: "会社名", value: "KYUTE合同会社（KYUTE LLC）" },
  { label: "設立", value: "2026 年 1 月" },
  {
    label: "事業内容",
    value: "採用広報・採用コンテンツ制作・候補者体験設計／密着動画制作",
  },
  { label: "所在地", value: "東京都（詳細は近日公開）" },
  { label: "お問い合わせ", value: "contact@kyute.jp" },
];

export const contactCopy = {
  eyebrow: "Contact",
  title: "採用広報の現状を、\n整理するところから。",
  body:
    "「内定辞退が続いている」「動画は作ったが承諾につながっていない」——まずは現状の課題整理からご相談ください。サービス導入を前提とせず、無料でディスカッションします。",
  primaryCta: { label: "無料で相談する", href: "mailto:contact@kyute.jp" },
  secondaryCta: { label: "サービスを見る", href: "#services" },
};

export type FooterLink = { label: string; href: string; external?: boolean };

export const footerLinks: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Service",
    links: [
      { label: "密着動画制作", href: "#services" },
      { label: "採用広報の包括支援", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "課題", href: "#mission" },
      { label: "承諾の設計", href: "#about" },
      { label: "会社情報", href: "#company" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "お問い合わせ", href: "#contact" }],
  },
];
