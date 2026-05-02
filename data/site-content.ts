import type { NavItem, NewsItem, Service, ValueItem } from "@/lib/types";

export const site = {
  name: "KYUTE",
  nameJa: "株式会社KYUTE",
  acronym: "Keep You To Evolve",
  tagline: "成長を、止めない。",
  mission:
    "総合型選抜という挑戦の最前線で、一人ひとりの可能性に火を灯し続ける。",
  description:
    "KYUTE は、総合型選抜対策に特化した教育サービスを展開する会社です。伴走型の個別指導塾と、対策に特化した AI プロダクトの2軸で、受験生の挑戦を支えます。",
};

export const navItems: NavItem[] = [
  { label: "ミッション", href: "#mission" },
  { label: "サービス", href: "#services" },
  { label: "私たちについて", href: "#about" },
  { label: "ニュース", href: "#news" },
  { label: "会社情報", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
];

export const heroCopy = {
  eyebrow: "Keep You To Evolve",
  titleLines: ["成長を、", "止めない。"],
  lead:
    "総合型選抜という新しい挑戦の場で、受験生一人ひとりの可能性を最大化する。\n人と AI、両方の力で伴走する教育プラットフォームをつくっています。",
  scrollLabel: "Scroll",
};

export const valuePoints: ValueItem[] = [
  {
    no: "01",
    label: "Mission",
    title: "成長の伴走者になる",
    body: "合格はゴールではなく、その先の人生に続く始まり。私たちは結果だけでなく、挑戦そのものに価値を置きます。",
  },
  {
    no: "02",
    label: "Vision",
    title: "教育に AI の翼を",
    body: "テクノロジーで指導の質と量を解放し、地域・経済・経験の差を超えて、誰もが自分の物語を語れる入試対策を届けます。",
  },
  {
    no: "03",
    label: "Value",
    title: "人にしかできない対話を、AI にしかできない速度で",
    body: "メンターによる伴走と、AI による個別最適化。両者を組み合わせることで、一人ひとりの「らしさ」を引き出します。",
  },
];

export const services: Service[] = [
  {
    id: "school",
    badge: "Service 01",
    title: "総合型選抜 伴走型 個別指導塾",
    tagline: "合格まで、ひとりにしない。",
    body:
      "志望理由書・小論文・面接を、専属メンターが完全オーダーメイドで伴走。出願戦略から提出物のブラッシュアップ、面接練習まで、合格から逆算した個別カリキュラムで支えます。",
    features: [
      "完全オンラインでの 1on1 指導",
      "総合型選抜 経験者によるメンタリング",
      "出願戦略・スケジュール設計までフルサポート",
      "週次面談 × チャット質問の二段構え",
    ],
    href: "#contact",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "メンターと生徒がオンラインで対話している様子",
  },
  {
    id: "ai",
    badge: "Service 02",
    title: "総合型選抜対策 AI",
    tagline: "あなたの言葉を、AI が磨く。",
    body:
      "志望理由書の添削、小論文の構造化、面接想定問答の生成まで、総合型選抜に特化して学習させた AI が 24 時間サポート。一人で書く時間を「壁打ち」の時間に変え、自分の言葉で語る力を育てます。",
    features: [
      "志望理由書の即時フィードバック",
      "大学・学部ごとの出題傾向に最適化",
      "面接の想定問答生成 × 模擬問答",
      "塾サービスとシームレスに連携",
    ],
    href: "#contact",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "AI とテクノロジーを表現した抽象的なビジュアル",
  },
];

export const aboutCopy = {
  eyebrow: "About KYUTE",
  title: "総合型選抜のいま、\n挑戦する人の隣に。",
  body:
    "総合型選抜（旧 AO 入試）は、点数だけでは測れない「あなたという物語」を問う入試です。\n\n志望理由を言語化する、自分の経験から問いを立てる、面接で自分の軸を語る ―― それは大人でも難しい営みです。だからこそ、ひとりの受験生に、信頼できる伴走者と、思考を磨くテクノロジーが必要だと私たちは考えました。\n\nKYUTE は「人」と「AI」の両輪で、挑戦する受験生の隣に立ち続けます。",
  stats: [
    { value: "2", suffix: "Services", label: "総合型選抜に特化したプロダクト" },
    { value: "100", suffix: "% Online", label: "全国どこからでも受講可能" },
    { value: "1on1", suffix: "", label: "完全個別の伴走スタイル" },
  ],
};

export const newsItems: NewsItem[] = [
  {
    date: "2026.04.18",
    category: "Press",
    title: "総合型選抜対策 AI のクローズドβ版を公開しました",
    href: "#",
  },
  {
    date: "2026.03.05",
    category: "News",
    title: "2026 年度 個別指導塾の新規受講生募集を開始しました",
    href: "#",
  },
  {
    date: "2026.02.10",
    category: "Event",
    title: "高校教員向けオンライン説明会を開催します",
    href: "#",
  },
  {
    date: "2026.01.20",
    category: "Company",
    title: "株式会社 KYUTE を設立しました",
    href: "#",
  },
];

export const companyInfo: { label: string; value: string }[] = [
  { label: "会社名", value: "株式会社 KYUTE（KYUTE Inc.）" },
  { label: "由来", value: "Keep You To Evolve ― 成長を後押しし続ける" },
  { label: "代表取締役", value: "小川 翼" },
  { label: "設立", value: "2026 年 1 月" },
  {
    label: "事業内容",
    value: "総合型選抜 伴走型 個別指導塾の運営 / 総合型選抜対策 AI の開発・提供",
  },
  { label: "所在地", value: "東京都（詳細は近日公開）" },
  { label: "お問い合わせ", value: "ogawa@kyute.jp" },
];

export const contactCopy = {
  eyebrow: "Contact",
  title: "総合型選抜の挑戦を、\n一緒にはじめませんか。",
  body:
    "サービスのご相談、教育機関・自治体の皆さまからの連携・取材のご依頼まで、お気軽にお問い合わせください。",
  primaryCta: { label: "個別相談を申し込む", href: "mailto:ogawa@kyute.jp" },
  secondaryCta: { label: "サービス資料を見る", href: "#services" },
};

export const footerLinks: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "伴走型個別指導塾", href: "#services" },
      { label: "総合型選抜対策 AI", href: "#services" },
    ],
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
    links: [
      { label: "お問い合わせ", href: "#contact" },
      { label: "ニュース", href: "#news" },
    ],
  },
];
