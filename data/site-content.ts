import type { NavItem, Service, ValueItem } from "@/lib/types";

export const site = {
  name: "KYUTE",
  nameJa: "KYUTE合同会社",
  acronym: "Keep You To Evolve",
  tagline: "集めて、伝えて、承諾まで。",
  mission:
    "候補者を集めるだけで終わらず、入社の腹落ちまでつなぐ採用広報を、当たり前にする。",
  description:
    "KYUTEは、密着動画制作を主力に、興味喚起から入社の腹落ちまでを一貫して設計する会社です。採用戦略策定から、採用サイト・LP制作、SNS運用、選考体験設計まで——「応募を増やす」だけでなく「選ばれ、承諾される」状態に、すべての施策を接続します。",
};

export const externalLinks = {
  contact: "mailto:contact@kyute.jp",
};

export const navItems: NavItem[] = [
  { label: "課題", href: "#mission" },
  { label: "サービス", href: "#services" },
  { label: "採用広報設計", href: "#about" },
  { label: "会社情報", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
];

export const heroCopy = {
  eyebrow: "Recruitment PR Studio",
  titleLines: ["密着動画で、", "選ばれる採用へ。"],
  lead:
    "集めるだけで終わらせない。\n密着動画と採用広報設計で、候補者の興味喚起から入社の腹落ちまでをつなぎ、応募・選考・承諾のすべてに効く採用体験をつくります。",
  scrollLabel: "Scroll",
};

export const valuePoints: ValueItem[] = [
  {
    no: "01",
    label: "Issue",
    title: "母集団形成と入社意思決定が、分断されている",
    body:
      "認知施策も応募獲得も動いている。けれど候補者が選考を進み、最後に選ぶ理由まで設計されていないと、採用広報は成果に接続しません。",
  },
  {
    no: "02",
    label: "Issue",
    title: "採用動画が「興味喚起」で止まっている",
    body:
      "雰囲気も理念も伝わる。けれど候補者は、入社後の自分の働く姿を具体的に想像できていない。興味を志望度へ変える材料が不足しています。",
  },
  {
    no: "03",
    label: "Issue",
    title: "選考体験の中で、納得が積み上がらない",
    body:
      "候補者が見ているのは会社だけではなく、自分自身の選択です。接点ごとに理解と共感を積み上げ、最後に腹落ちできる導線が必要です。",
  },
];

export const services: Service[] = [
  {
    id: "closing-video",
    badge: "Service 01",
    title: "興味を志望度に変える、密着動画制作",
    tagline: "Documentary Recruiting Film",
    body:
      "社員一人ひとりの仕事・価値観・入社理由を密着で記録し、候補者が自分自身と重ねられる「ロールモデル動画」をつくります。認知を取るための会社紹介ではなく、候補者が「ここで働く未来」を具体化できる採用広報コンテンツです。",
    features: [
      "候補者に近いロールモデル社員を1日密着で撮影",
      "入社理由・仕事のリアル・成長ストーリーを構成設計",
      "チームの空気感・働き方・入社後の景色を可視化",
      "採用サイト・SNS・選考接点に組み込み、興味喚起から入社意思決定まで接続",
    ],
    href: "#contact",
    image: "/documentary-video-production.png",
    imageAlt: "採用広報向け密着動画制作のイメージ",
    ctaLabel: "密着動画について相談する",
  },
  {
    id: "recruitment-pr-suite",
    badge: "Service 02",
    title: "興味喚起から入社の腹落ちまでを生み出す採用広報支援",
    tagline: "Recruitment PR Suite",
    body:
      "採用競争戦略の策定から、ターゲット・ペルソナ設計、採用サイト・LP・ピッチ資料制作、SNS運用、選考体験設計まで。すべての施策を「集める」だけで終わらせず、候補者が入社に腹落ちするまでの流れとして設計・運用伴走します。",
    features: [
      "採用競争戦略・ターゲット／ペルソナ・採用コンセプト設計",
      "採用サイト・採用LP・採用ピッチ資料の制作",
      "note／SNS／YouTubeなどの採用広報コンテンツ企画・運用",
      "興味喚起から入社意思決定までのコミュニケーション設計",
    ],
    href: "#contact",
    image: "/recruitment-pr-strategy.png",
    imageAlt: "候補者の意思決定を支える採用広報支援のイメージ",
    ctaLabel: "包括支援について相談する",
  },
];

export const aboutCopy = {
  eyebrow: "How It Works",
  title: "自己認知 × 企業解像度 × 社員共感",
  body:
    "候補者は、会社を見ているだけではありません。自分自身の選択を見ています。\n\n「自分は何を大切にしたいか」「この会社で何が起きているか」「この人たちと働きたいか」——その理解が選考体験の中で積み上がったとき、興味は志望度に変わり、最後の意思決定につながります。\n\nKYUTEは、自己認知・企業解像度・社員共感の3要素を密着動画と採用広報で同時に高め、候補者の意思決定を内側から支えます。",
  stats: [
    { value: "01", suffix: "Self", title: "自己認知", label: "自分は何を大切にしたいか" },
    { value: "02", suffix: "Co.", title: "企業解像度", label: "この会社で何が起きているか" },
    { value: "03", suffix: "Team", title: "社員共感", label: "この人たちと働きたいか" },
  ],
};

export const companyInfo: { label: string; value: string }[] = [
  { label: "会社名", value: "KYUTE合同会社（KYUTE LLC）" },
  { label: "設立", value: "2025 年 5 月" },
  {
    label: "事業内容",
    value: "採用広報・採用コンテンツ制作・候補者体験設計／密着動画制作",
  },
  { label: "所在地", value: "東京都渋谷区恵比寿西2丁目8番4号EX恵比寿西ビル5階" },
  { label: "お問い合わせ", value: "contact@kyute.jp" },
];

export const contactCopy = {
  eyebrow: "Contact",
  title: "採用広報の現状を、\n整理するところから。",
  body:
    "「応募は集まるが志望度が上がりきらない」「動画やSNSが採用成果につながっていない」——まずは現状の課題整理からご相談ください。サービス導入を前提とせず、無料でディスカッションします。",
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
      { label: "採用広報設計", href: "#about" },
      { label: "会社情報", href: "#company" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "お問い合わせ", href: "#contact" }],
  },
];
