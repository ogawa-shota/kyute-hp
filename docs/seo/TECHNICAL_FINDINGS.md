# 技術SEO監査と実装記録

対象：`kyute-hp`。監査日：2026-10-16（Asia/Tokyo）。ローカル修正であり本番デプロイは行っていない。公開サイトの観測値は `CRAWL_FINDINGS.md`、`BASELINE_METRICS.md` と `evidence/` を参照する。順位・インデックス採用・CV向上を保証する記録ではない。

## 判定と変更

| ID / 優先度 | 確認した問題・根拠 | 実装した変更 | 検証と残る確認 |
|---|---|---|---|
| T01 / P1 | 公開apexはwwwへ307。元のSITE_URL・sitemap・robotsはapex、一部LPはwwwを指定し、正規化シグナルが分散 | SITE_URLを実際の到達先wwwへ統一。canonical、sitemap、robots、JSON-LD、OG URLを整合 | unit pass。本番反映後にHTMLとURL Inspectionで再確認。ホスト側307変更は別承認 |
| T02 / P1 | `/contact`にcanonicalなし。他の通常ページもSNS用metadataが部分的 | 通常ページとコラムにroute固有title/description/canonical/OG/Twitterを共通helperで生成。資料請求・相談のqueryをcanonicalに含めない | typecheck / unit pass。既存タイトル・説明の事業内容を維持 |
| T03 / P1 | 実測公開ホームのmobile Lighthouseでフォント大量preload。詳細は `evidence/font-preloads-production-20261016.json` | layoutの日本語2書体だけ `preload: false`。書体・weight・display:swapは維持 | 改善量はローカルproduction buildで再測定。本番LCP改善とはまだ言えない |
| T04 / P1 | 動画サービスのH1が「面白く、」だけで主題が不足。YouTubeのサービス名もH1外 | 表示中の文言をH1内のspanへ整理。動画は全フレーズとサービス名、YouTubeは既存ラベルを含める | lint / typecheck pass。rootのdesktop/mobile見た目比較で最終確認 |
| T05 / P2 | 組織著者「KYUTE編集部」がArticleのPerson。JSON-LDパンくずに画面のカテゴリがない | author profileにtypeを明記しOrganization/Personを出し分け。カテゴリを含むBreadcrumbList、著者欄へのURL、publisherの同一@id | unit / typecheck pass。記事schemaの実HTML確認・Rich Results Testは別確認 |
| T06 / P2 | ホームの運営主体とサイト名、2サービスに対応する構造化データなし | ホームにOrganization/WebSite、2サービスにService/BreadcrumbList。既存公開情報のみを使用 | JSON-LDエスケープ・ID連携unit pass。Serviceに専用Googleリッチリザルトを期待しない |
| T07 / P2 | reviewer / referencesがfrontmatterにあるがUIで利用されない | 内容確認者・運営会社リンク・開閉式出典一覧を表示。公開URLだけを表示しprimarySourcesを自動展開しない | typecheck pass。本文内の出典対応や掲載許可の内容レビューは引き続き必要 |
| T08 / P2 | sitemapの一覧lastmodが公開日順の先頭記事だけに依存。previewだと未来のpublished記事が含まれ得る | getPublishedColumnsで公開済み・公開日到来・可視サービスを統一。lastmodは記事群の最大日付 | 過去公開記事の最新更新、未来記事除外のunit pass |
| T09 / P2 | 公開日判定がUTCで日本の公開日とずれる。日付形式のみ検査し存在しない日付も許容 | Asia/Tokyoで日付を判定。実在日付・更新日の逆転を検査 | 日本の0時境界、うるう年、未来日、非公開サービスunit pass |
| T10 / P2 | 制作会社比較記事にstrategyなし、費用比較後のCTAが弱い | 既存本文からcompare戦略・仮説・指標をfrontmatterに追加。費用説明直後に既存料金CTAを1つ配置 | column check pass（関連コラム不足の警告1件）。CTA効果は未測定 |
| T11 / P2 | docs/COLUMN.mdが未来publishedAtの自動公開を説明するが、実装はビルド時の静的ルート | 実際のJST日付判定と公開日以降の再ビルドが必要なことを明記。Codex/Claude Code同一手順を明記 | ドキュメントとコードを照合。定期公開ジョブは未実装 |

今回のコード調査だけでサイト全体のindexを止めるP0は確認していない。ただし検索で採用されている正規URL・実際の除外理由はSearch Console未取得のため断定できない。

## 維持した仕組み

- 通常ページの本文はNext.jsサーバー生成HTML。記事はMarkdown → unified/remark/rehype → HTMLで、検索エンジンが本文を読むためにクライアントJSだけへ依存しない。
- LPはnoindexかつsitemap対象外。robots.txtでLPを遮断しないため、クローラーがnoindexを読める。公開リンクはfollowできる。
- previewのmetadataはnoindex。helperを使うrouteも独自robotsでこれを解除しない。
- draft/review、未公開サービス、未来公開記事は本番の生成対象外。非公開カテゴリと存在しない記事はnotFound経路。
- 既存の永続URL移転、料金・保証・顧客成果・提供サービス・LP独自デザインを変更していない。
- JSON-LDは`<`をunicode escapeし、編集内容でscriptを閉じられないようにする。
- 原稿中の参考URLは読者が開ける実リンク。内部導線も通常のhrefを使用する。

## 追加しなかったもの

FAQ本文は維持し、FAQPageをリッチリザルト獲得施策として追加していない。Google公式更新履歴では2026-05-07以降FAQリッチリザルトを表示しないとされ、2026-06-15に専用ドキュメントが削除されている。「政府・医療サイトのみ対象」という以前の前提で施策化しない。

VideoObjectは動画ごとの公開日・説明・サムネイル・URL、視聴ページとしての役割を確認してから設計する。欠けた公開日や実績を埋めて導入しない。Review、AggregateRating、JobPosting、LocalBusiness等も実態・適格性を確認せず追加しない。

空カテゴリを増やす、検索語違いだけでページを量産する、過去URLを削除する、canonicalを理由なくトップへ向ける、といった変更も行っていない。

## 検証記録

この担当の確定実行結果（2026-10-16）：

| Gate | Command / evidence | 結果 |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | passed |
| ESLint | `npm run lint` | passed |
| SEO regression | `node scripts/test-seo.mjs` | passed |
| 既存column validator regression | `node scripts/test-column-check.mjs` | passed |
| 原稿検査 | `npm run column:check` | passed、公開1本・error 0・warning 1 |
| patch整形 | `git diff --check` | passed |
| production build / 全統合テスト | root担当の統合検証記録を参照 | 本表では未主張 |
| 実ブラウザ・レスポンシブ・フォーム・再Lighthouse | root担当の統合検証記録を参照 | 本表では未主張 |
| Search Console / Googleの取得HTML / Rich Results Test | 認証・承認済み公開後に実施 | 未実施 |

残したcolumn警告は「関連コラムへのリンクが2本未満」。公開コラムが1本なので、存在しない関連記事を作らず残した。新規記事の公開時に文脈の合う相互リンクを追加する。

## 一次資料（2026-10-16確認）

- [正規URLの指定](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)：T01。redirect先・canonical・sitemapの整合を判断する根拠。
- [sitemap作成](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)：T08。lastmodは実質的な更新を示す。priority/changefreqはGoogleが無視するため順位制御として扱わない。
- [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)：preview・LPをindex対象外にし、robotsで遮断しない判断。
- [Article](https://developers.google.com/search/docs/appearance/structured-data/article)：T05。Person/Organizationの著者と公開・更新情報を正確に伝える。
- [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)：T05/T06。情報階層をURLと結び付ける。
- [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) / [サイト名](https://developers.google.com/search/docs/appearance/site-names)：T06。法人とサイトの同一性を伝える。
- [構造化データ品質](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)：見えている事実と対応させ、表示を保証しない。
- [クロール可能なリンク](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)：hrefと具体的なアンカーで文脈のあるリンクを作る。
- [検索ドキュメント更新履歴](https://developers.google.com/search/updates)：2026年のFAQ機能終了を確認。
