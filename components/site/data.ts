// Content for the renewed corporate site. Facts come from KYUTE's 2026-10 sales
// decks (採用動画制作サービス / 採用YouTube運用代行) and Shota's confirmations.

export type Video = {
  id: string;
  title: string;
  short: string;
  tags: string[];
  /** Public YouTube view count with the date it was checked. */
  views?: { label: string; note: string };
};

/** Videos from KYUTE's own media 「運動部のシゴト。」. Not customer work. */
export const OWNED_VIDEOS: Video[] = [
  {
    id: "QzPRS_T-D4Q",
    title: "【密着】慶應卒 外資コンサルから脱サラしてカフェ開業した20代女性のリアル1日",
    short: "外資コンサルから脱サラしてカフェ開業した20代女性の1日",
    tags: ["1日密着", "起業"],
    views: { label: "8.6万回再生", note: "公開から約1か月半で" },
  },
  {
    id: "dBbg-eMhjkQ",
    title: "【密着】慶應理工卒 一般就職を辞め研究者の道へ。大学院生のリアルな1日",
    short: "一般就職を辞め研究者の道へ。大学院生の1日",
    tags: ["1日密着", "研究職"],
  },
  {
    id: "QT5ZYECnOUM",
    title: "【密着】筑波大蹴球部 プロ断念からオンライン塾で起業した24歳の1日に密着",
    short: "プロ断念からオンライン塾で起業した24歳の1日",
    tags: ["1日密着", "起業"],
  },
  {
    id: "wtRbJX3bq4o",
    title: "【密着】慶大法学部から新卒短期離職を経て起業した26歳男のリアルな1日",
    short: "新卒短期離職を経て起業した26歳の1日",
    tags: ["1日密着", "キャリア"],
  },
];

export const VIEWS_NOTE =
  "再生数はYouTube公開値（2026年10月14日確認）。いずれもKYUTEの自社メディア「運動部のシゴト。」の制作物で、顧客の導入実績ではありません。";

export const CHANNEL_URL = "https://www.youtube.com/@undo-job";

export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const thumb = (id: string) => `/works/${id}.jpg`;

export const SERVICES = [
  {
    id: "recruit-video",
    href: "/service/recruit-video",
    name: "採用動画制作",
    pains: ["応募が集まらない", "会社の魅力が伝わらない"],
    lead: "面白く、心に残る採用動画で、人・仕事・カルチャーを伝えます。",
  },
  {
    id: "recruit-youtube",
    href: "/service/recruit-youtube",
    name: "採用YouTube運用代行",
    pains: ["辞退が多い", "採用単価が高すぎる"],
    lead: "認知を取って、心を掴んで、離さない。消費ではなく資産になる採用を。",
  },
] as const;

export const VIDEO_PRICES = {
  main: {
    name: "密着動画【定番】",
    price: "50",
    specs: ["8〜12分／1名・1職種", "1拠点・1日", "撮影・編集／修正2回"],
  },
  others: [
    { name: "オフィスツアー", spec: "3〜6分／1拠点／撮影・編集／修正1回", price: "30" },
    { name: "対談／インタビュー", spec: "6〜10分／2名まで・1テーマ／修正1回", price: "30" },
    { name: "その他採用向け動画", spec: "社員紹介・説明動画など／修正1回", price: "30" },
  ],
  trial: { name: "密着動画 1本", regular: "50", price: "20" },
};

export const YOUTUBE_PLANS = [
  {
    no: "PLAN 01",
    name: "志望度向上プラン",
    price: "8",
    count: "月3本",
    format: "インタビュー型",
    goal: "候補者に、会社をもっと好きになってもらう",
    stages: ["理解", "志望"],
  },
  {
    no: "PLAN 02",
    name: "採用変革プラン",
    price: "30",
    count: "月3本",
    format: "インタビュー型＋ロケ型",
    goal: "採用ファネル全体をYouTubeで進化させる",
    stages: ["認知", "理解", "応募", "志望", "承諾"],
  },
  {
    no: "PLAN 03",
    name: "媒体卒業プラン",
    price: "50",
    count: "毎週更新＋ショート動画",
    format: "すべての形式",
    goal: "YouTubeを採用の主戦場に育て、採用単価を下げる",
    stages: ["認知", "理解", "応募", "志望", "承諾"],
    featured: true,
  },
];

export const FUNNEL = ["認知", "理解", "応募", "志望", "承諾"];

export const COMPANY = [
  { label: "社名", value: "KYUTE合同会社" },
  { label: "所在地", value: "東京都渋谷区恵比寿西２丁目８番４号ＥＸ恵比寿西ビル５階" },
  { label: "事業内容", value: "採用動画制作／採用YouTube運用代行／自社メディア「運動部のシゴト。」の運営" },
  { label: "連絡先", value: "contact@kyute.jp", href: "mailto:contact@kyute.jp" },
];
