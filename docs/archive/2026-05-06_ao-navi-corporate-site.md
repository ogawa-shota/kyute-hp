# KYUTE合同会社 コーポレートサイト 構成書

> このドキュメントは、KYUTE合同会社 公式サイト（`kyute-hp`）を制作・拡張するための指示書です。
> 現在の実装（`app/page.tsx`, `data/site-content.ts`, `components/*`）を正とし、総合型選抜メディア「AOナビ」単独事業の会社サイトとして運用します。

---

## 1. サイトコンセプト

- 総合型選抜メディア「AOナビ」を運営する **教育メディア企業のコーポレートサイト**
- ブランドメッセージ：**Keep You To Evolve（成長を、止めない。）**
- ミッション：**総合型選抜を通じて、社会に羽ばたく人を育成する。**
- 事業内容：**総合型選抜メディア「AOナビ」の企画・開発・運営**
- ONE MEDIA構想：**総合型選抜に関するすべての情報をAOナビに集約する**
- トーン：**大胆・挑戦的・若々しい・編集的**
- ビジュアル方向：白地 + 黒太罫線 + ビビッドピンク + ライムの採用サイト風グラフィックUI

## 2. ターゲット

| 区分 | 想定読者 | サイト上のゴール |
|---|---|---|
| 主 | 受験生・保護者 | AOナビの認知・閲覧 |
| 副 | 高校教員・教育関係者 | 連携・取材相談 |
| 副 | 大学・塾・パートナー企業 | AOナビへの掲載・提携相談 |
| 副 | 採用候補者 | 会社の姿勢・事業領域の理解 |

## 3. ページ構成

`/` の1ページLP型です。お知らせセクションは設置しません。

```tsx
<TopBar />
<main>
  <HeroCompany />
  <MissionSection />
  <ServicesSection />
  <AboutSection />
  <CompanySection />
  <ContactSection />
</main>
<SiteFooter />
```

## 4. セクション詳細

### TopBar

- 左：`KYUTE` ロゴ
- ロゴ横：`keep you to evolve` ラベル
- ナビ：ミッション / AOナビ / 私たちについて / 会社情報 / お問い合わせ
- 右：「お問い合わせ」CTA

### Hero（`HeroCompany`）

- Eyebrow：`Keep You To Evolve`
- Title：`AOナビで、 / 未来を選ぶ。`
- Lead：
  - 総合型選抜の情報は、まだ探しづらく、比べづらい。
  - AOナビは、大学・塾・体験談・対策ノウハウをつなぎ、受験生が自分の挑戦を選び取るためのメディア。
- CTA：
  - `AOナビを見る`
  - `私たちのミッション`
- Visual：
  - 添付画像を元にした `public/aonavi-header.png`
  - `EDUCATION × MEDIA` / `AOナビ 運営` バッジ

### Mission（`MissionSection`）

Vision / Value はHP上には記載せず、Missionのみを表示します。

| No. | Label | Title | Body |
|---|---|---|---|
| 01 | Mission | 総合型選抜を、もっと開かれた選択肢にする | 情報の差で挑戦をあきらめる人を減らす。AOナビを通じて、受験生が自分に合う大学・対策・進路に出会える環境をつくる。 |

### AOナビ（`ServicesSection`）

- Eyebrow：`Media`
- 見出し：`ONE MEDIA / TO EVOLVE`
- 日本語コピー：`総合型選抜のすべてを、ひとつのメディアに。`
- ONE MEDIA構想：AOナビは、大学情報・塾比較・合格体験記・出願ノウハウなど、総合型選抜に関するすべての情報を集約する。
- Media 01 画像：`public/aonavi-header.png`

#### 総合型選抜メディア「AOナビ」

- タグライン：`探す、知る、選ぶ。総合型選抜のすべてが集まる場所。`
- 提供価値：
  - 全国の大学を総合型・学校推薦型選抜の切り口で検索
  - 対策塾の比較・資料請求・体験申込をサポート
  - 合格体験記・出願ノウハウ・お役立ちコラムを発信
  - 合格力診断で自分に合う大学・進路の発見を支援
- CTA：`AOナビを見る`
- リンク：`externalLinks.aonavi`

### About（`AboutSection`）

- Eyebrow：`About KYUTE`
- Title：`総合型選抜のいま、 / 挑戦する人の隣に。`
- 本文：
  1. 総合型選抜は、点数だけでは測れない「あなたという物語」を問う入試
  2. 大学情報、対策方法、塾選び、合格者のリアルな声は分散している
  3. KYUTE は AOナビを通じて、自分に合う情報と選択肢に出会える入口をつくる
- Stats：
  - `1 Media`
  - `47 Pref.`
  - `AO NAVI`

### Company（`CompanySection`）

| 項目 | 値 |
|---|---|
| 会社名 | KYUTE合同会社（KYUTE LLC） |
| 設立 | 2026 年 1 月 |
| 事業内容 | 総合型選抜メディア「AOナビ」の企画・開発・運営 |
| 所在地 | 東京都（詳細は近日公開） |
| お問い合わせ | contact@kyute.jp |

由来・代表社員・ミッションはHP上の会社情報には表示しません。

### Contact（`ContactSection`）

- Eyebrow：`Contact`
- Subcopy：`let's evolve together`
- Title：`総合型選抜の挑戦を、 / 一緒に支えませんか。`
- Body：AOナビへの掲載・提携、教育機関や自治体からの連携、取材依頼を受け付ける。
- CTA：
  - `お問い合わせする`（`mailto:contact@kyute.jp`）
  - `AOナビを見る`（`externalLinks.aonavi`）
- 表示メール：`contact@kyute.jp`

### SiteFooter

- ロゴ + ミッション一文
- CONTACT：`contact@kyute.jp`
- FOLLOW / X / note は表示しない
- カラムリンク：
  - Media：Media: AOナビ
  - Company：ミッション / 私たちについて / 会社情報
  - Contact：お問い合わせ

## 5. デザイントークン

### フォント

- `Noto Sans JP`：本文・日本語UI
- `Barlow Condensed`：英字ラベル・巨大英字見出し・ロゴ
- `Archivo Black`：予備の強調ディスプレイフォント

### カラー

| Token | Hex / 用途 |
|---|---|
| `--bg` | `#fffdf8` / ベース背景 |
| `--bg-soft` | `#f2f2f2` / セクション背景 |
| `--ink` | `#111111` / 主テキスト・太罫線 |
| `--ink-soft` | `#3a3a3a` / 本文 |
| `--ink-mute` | `#777777` / 補助テキスト |
| `--brand` | `#ff4f8b` / ビビッドピンク |
| `--brand-deep` | `#e6005c` / 濃いピンク |
| `--accent` | `#c8ff2e` / ライムアクセント |
| `--cyan` | `#71e7ff` / 補助アクセント |

## 6. 今後の修正タスク候補

1. `externalLinks.aonavi` を実URLに差し替える
2. 掲載・提携相談フォームを作成し、Contact CTA をフォームURLへ差し替える
3. AOナビの本サイトが公開されたら、ファーストビューCTAとMedia CTAを本URLへ接続する
