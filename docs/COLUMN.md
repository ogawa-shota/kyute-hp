# コラムの書き方（チーム向け）

kyute.jp/column のお役立ちコラムは、Claude Code に依頼して書きます。誰が書いても同じ品質になるように、手順と基準はリポジトリの中にあります。

- 手順：`.claude/skills/column/SKILL.md`（Claude Code が読む）
- 品質基準：`.claude/skills/column/references/review-checklist.md`
- 文章のルール：`.claude/skills/column/references/writing-rules.md`
- 記事の型：`content/column/_template.md`

## 一番大事なルール

**KYUTEにしか書けない一次情報（撮影現場での気づき、運動部のシゴト。の運用データ、支援で分かったことなど）が無い記事は書きません。** 一次情報が無いまま頼むと、Claude Code は書かずに「確認したい質問」を返します。

## はじめに（1回だけ）

1. GitHub の招待を受け、`kyute-hp` に書き込めるようにする（取材メモを置く場合は `KYUTE` も）。
2. Claude Code をインストールし、`kyute-hp` と `KYUTE` を同じフォルダに並べてクローンする。
3. `content/authors/<自分のid>.json` が無ければ、最初の記事のときに Claude Code が作ります（名前・役割・経歴を聞かれます）。

## 依頼のしかた

### A：おまかせ（検索ワードと材料から一気に）

```
/column auto
サービス: 採用動画制作
キーワード: 採用動画 費用
CTA: （省略可。サービスから自動で決まる）
参考: https://...（省略可）
一次情報: 9月の撮影で、事前ヒアリングを60分に延ばしたら撮影当日の撮り直しが減った
```

Claude Code が、検索上位の記事を読んで「上位記事に無いこと」を探し、そこを一次情報で埋める構成で書きます。

### B：じっくり（構成と文章を一緒に練る）

```
/column plan
テーマ: 採用動画が「見られない」本当の理由
読者: 採用動画をつくったが効果を感じていない人事
言いたいこと: 尺や画質ではなく、〜が原因だと思っている
材料: 〜社の事例、自分の撮影経験
```

方針メモ → 構成案 → 章ごとの執筆 → 推敲、の各段階で止まって確認を求められます。

### 既存記事を直す

```
/column 「採用動画 費用」の記事を、10月の新料金に合わせて更新して
```

## 一次情報の置き場所

- 公開してよい内容だけを記事に書きます。kyute-hp は public リポジトリなので、push した時点で誰でも読めます。
- 取材メモ・社内データの原本は、private の `KYUTE/content-sources/column/` に置いてください。Claude Code はそこも読みます。

## 公開までの流れ

```
依頼 → Claude Code が記事を書き、column/<slug> ブランチでプルリクエストを作る
     → 自動チェック（GitHub Actions）
     → Vercel のプレビューURLで下書きを読む（検索エンジンには載らない）
     → 編集責任者がレビューし、reviewer・status: published・publishedAt を入れてマージ
     → 公開（publishedAt が未来なら、その日に公開）
```

- 編集責任者：小川
- 自分の記事を自分で `published` にしないでください。

## 自動チェック

`npm run column:check` が、プルリクエストのたびに走ります。

| 種類 | 例 |
|---|---|
| エラー（マージ不可） | 一次情報が無い／検索ワードが他の記事と重複／公開記事に承認者が無い／画像の代替テキストが無い／検証中のサービスで効果を言い切っている |
| 注意（承認者が判断） | タイトルが長い／description の長さ／本文が短い／関連リンクが少ない／数字に出典が無い |

`npm run column:keywords` で、今ある記事の検索ワード一覧が見られます。

## 記事末尾のCTA

`service` ごとに自動で決まります（`lib/column/core.mjs` の `CTAS`）。サイトのリニューアルで新しいサービスページができたら、リンク先をそこへ差し替えます。

| service | CTA |
|---|---|
| recruit-video | 採用動画の資料をもらう |
| recruit-youtube | 採用YouTubeの資料をもらう |
| ai-casual-interview | デモ・先行導入について相談する |
| experience-briefing | デモ・先行導入について相談する |
| general | 無料で相談する |
