import type { NavItem, Testimonial, WhyPoint } from "@/lib/types";

/** 塾名・文言は差し替え前提のデモコンテンツです（[aoaoi.jp](https://aoaoi.jp/) の構成を参考にしたオリジナル文案）。 */
export const site = {
  name: "ステラアカデミー",
  tagline: "総合型選抜専門塾",
  hero: {
    title: "総合型選抜で、志望校と夢を諦めない。",
    lead: "書類・小論文・面接まで、一人ひとりの物語に合わせて伴走します。",
    bullets: [
      "2026年度 合格速報を更新中",
      "オンライン／対面で受講可能",
      "創立記念の体験キャンペーン実施中",
    ],
    primaryCta: { label: "LINEで資料請求", href: "#" },
    secondaryCta: { label: "受験相談を予約", href: "#consult" },
  },
  disclaimer:
    "※掲載の合格実績・数値は一例です。最新情報はお問い合わせください。",
};

export const navItems: NavItem[] = [
  {
    label: "ステラについて",
    href: "#about",
    children: [
      { label: "ステラとは", href: "#about" },
      { label: "メンター紹介", href: "#mentors" },
      { label: "校舎・オンライン", href: "#access" },
    ],
  },
  {
    label: "合格実績",
    href: "#results",
    children: [
      { label: "合格率・大学一覧", href: "#results" },
      { label: "合格者の声", href: "#voices" },
    ],
  },
  {
    label: "授業内容",
    href: "#curriculum",
    children: [
      { label: "高1・高2 カリキュラム", href: "#curriculum" },
      { label: "高3 直前対策", href: "#curriculum" },
    ],
  },
  {
    label: "料金プラン",
    href: "#pricing",
  },
  {
    label: "入試情報",
    href: "#exam-info",
    children: [
      { label: "総合型選抜とは", href: "#exam-info" },
      { label: "説明会・イベント", href: "#exam-info" },
    ],
  },
  {
    label: "お問い合わせ",
    href: "#consult",
    children: [
      { label: "受験相談", href: "#consult" },
      { label: "よくある質問", href: "#faq" },
    ],
  },
];

export const worries: { title: string; text: string }[] = [
  {
    title: "志望理由がまとまらない",
    text: "自分の経験をどう物語にするか、何から手をつけるべきか迷っていませんか。",
  },
  {
    title: "小論文と面接の練習量が足りない",
    text: "出題傾向は分かっても、添削とフィードバックがないと伸びしろが見えにくいものです。",
  },
  {
    title: "併願戦略とスケジュールが不安",
    text: "一般入試との両立、出願順、書類の締切管理まで、俯瞰して設計したい。",
  },
];

export const highlights: { title: string; subtitle: string; body: string }[] = [
  {
    title: "メンター（講師）",
    subtitle: "現役大学生の合格者が伴走",
    body: "総合型選抜の最新動向に近い立場で、志望理由書の筋道づくりから面接の型まで伴走します。",
  },
  {
    title: "学びの軸が立つカリキュラム",
    subtitle: "自己理解 → 志望校設計 → 出力",
    body: "「自分は何者か」「なぜその大学か」を段階的に言語化し、書類と面接の一貫性をつくります。",
  },
  {
    title: "フルオーダーメイド授業",
    subtitle: "進度と課題に合わせて最適化",
    body: "週の負荷に合わせて課題量を調整。添削の往復と面接練習をセットで回せるのが強みです。",
  },
];

export const results = {
  copy: "難関私学・国公立まで、総合型選抜の合格実績を積み重ねています。",
  stats: [
    { value: "170+", label: "対応大学の合格実績（累計）" },
    { value: "80%", label: "メンターが総合型合格者（目安）" },
    { value: "160+", label: "映像授業・教材コンテンツ" },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    headline: "「肯定」とフィードバックで志望理由が形になった",
    school: "関西学院大学",
    faculty: "総合政策学部",
    profile: "偏差値 51 ／ 評定 2.8 ／ 浪人生",
    body: "一人で書いていると視野が狭くなりがちでした。対話を重ねるうちに、自分の経験の意味が言葉になっていきました。",
  },
  {
    id: "2",
    headline: "夢を語る時間が、受験生活の支えになった",
    school: "同志社大学",
    faculty: "社会学部",
    profile: "偏差値 54 ／ 評定 3.2 ／ 部活・資格あり",
    body: "小論文の型だけでなく、面接で話す『自分の軸』がはっきりしました。練習のたびに言葉が洗練されていきました。",
  },
  {
    id: "3",
    headline: "地方在住でも、オンラインで密度の高い指導が受けられた",
    school: "大阪大学",
    faculty: "文学部",
    profile: "偏差値 49 ／ 国公立志望",
    body: "対面にこだわらず、週次の課題と添削のリズムが整ったのが大きかったです。出願スケジュールも一緒に整理してくれました。",
  },
];

export const whyPoints: WhyPoint[] = [
  {
    title: "フルオーダーメイド授業",
    subtitle: "志望理由は人それぞれ",
    body: "一人ひとりの進捗に合わせて、書類添削・小論文・面接の比重を調整します。併願校の戦略づくりも支援します。",
    href: "#curriculum",
    linkLabel: "カリキュラムを見る",
  },
  {
    title: "映像授業とドリル",
    subtitle: "理解を深める自学の補助線",
    body: "テーマ別の短い講義と演習で、授業間の自学を支えます。繰り返し視聴できるので、弱点を自分のペースで補えます。",
  },
  {
    title: "メンターと校舎の雰囲気",
    subtitle: "詰まったときに相談しやすい距離感",
    body: "合格の鍵は『将来像の解像度』。対話を重ねながら、志望理由の芯を一緒に掘り下げます。",
    href: "#access",
    linkLabel: "校舎・オンラインを見る",
  },
];

export const mentorBlocks: { title: string; body: string }[] = [
  {
    title: "総合型選抜の合格者がサポート",
    body: "入試のリアルに近いメンターが、最新の傾向と失敗パターンを共有。同世代だからこそ相談しやすい、という声も多いです。",
  },
  {
    title: "研修と評価で品質を担保",
    body: "採用・研修・授業レビューを通じて、指導の型とフィードバックの質をそろえています。",
  },
  {
    title: "幅広い学部に対応",
    body: "文系中心に、芸術・映像・宗教系など、ニッチな志望にも対応できるメンターを配置しています（時期により変動）。",
  },
];

export const representative = {
  name: "代表 小川 翼",
  title: "総合型選抜は、今の自分を言語化する入試です",
  body: "点数だけでは測れない『物語』を、丁寧に組み立てていきましょう。私たちは、あなたの挑戦を最後まで支える伴走者でありたいと考えています。",
  promise:
    "あなたが『想像以上』の志望理由書と面接に仕上がるよう、添削と練習の密度を落としません。",
  policy:
    "主体的に学び、自分のミッションを持って進学する学生を増やすこと。それがステラアカデミーの教育方針です。",
};

export const pricing = {
  lead: "志望理由書・小論文・面接対策まで、合格に向けた伴走をセットで。",
  points: [
    {
      title: "料金",
      text: "教材費を含むわかりやすいプラン設計（追加入会の強制なし）※",
    },
    {
      title: "自学環境",
      text: "自習スペースの利用（校舎）／映像コンテンツの視聴（オンライン）",
    },
    {
      title: "自由度",
      text: "空きコマに合わせて予約。チャットでの質問にも対応（プランによる）",
    },
  ],
  note: "※追加の個別指導をご希望の場合は、別途ご相談ください。詳細は資料でご確認ください。",
};

export const consultMerits: string[] = [
  "総合型選抜の全体像がつかめる",
  "今の学年・実績からの戦略が見える",
  "無理のない学習計画の立て方が分かる",
];

export const consultSteps: { title: string; body: string }[] = [
  {
    title: "WEB／LINEから予約",
    body: "希望日時と形式（対面／オンライン）を選べます。入塾前提ではありません。",
  },
  {
    title: "事前ヒアリング",
    body: "志望の方向性、不安、活動実績を共有いただき、相談を最適化します。",
  },
  {
    title: "受験相談（60分目安）",
    body: "併願戦略、スケジュール、学習の優先順位まで、具体的にお伝えします。",
  },
  {
    title: "次の一歩が明確に",
    body: "自宅学習のTODOと、ステラでできることが整理できます。",
  },
];

export const footerColumns: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "ステラについて",
      links: [
        { label: "ステラとは", href: "#about" },
        { label: "メンター紹介", href: "#mentors" },
        { label: "校舎・オンライン", href: "#access" },
      ],
    },
    {
      heading: "合格実績",
      links: [
        { label: "実績一覧", href: "#results" },
        { label: "合格者の声", href: "#voices" },
      ],
    },
    {
      heading: "授業・料金",
      links: [
        { label: "授業内容", href: "#curriculum" },
        { label: "料金プラン", href: "#pricing" },
      ],
    },
    {
      heading: "お問い合わせ",
      links: [
        { label: "受験相談", href: "#consult" },
        { label: "資料請求", href: "#" },
      ],
    },
  ];
