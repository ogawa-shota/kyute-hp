# SEO初期計測値 — 2026-10-16

公開環境の改善前値を固定する。ローカル修正の検証結果・公開後の数値とは混ぜない。時刻は日本時間（JST）。取得できない指標を0として扱わない。

## 公開HTMLと配信

取得: 2026-10-16 12:36 JST。対象: `https://www.kyute.jp`。GET限定の静的HTMLクロール。サイトマップ、実装済み固定ルート、公開条件を満たした記事・カテゴリ、発見した内部リンクを探索した。下書き、未発表サービス、API、外部リンク先、フォーム送信は対象外。

| 指標 | 改善前実測 | 根拠・解釈 |
| --- | ---: | --- |
| 探索したページURL | 23 | 19直接HTML200 + 4旧URLリダイレクト |
| 直接HTML200 | 19 | 重複するリダイレクト先を二重に数えない |
| indexを許可するHTML | 12 | robots/metaの観測。Googleに登録済みという意味ではない |
| 意図されたnoindex HTML | 7 | 広告・旧LP 5 + 記事0件のカテゴリ2 |
| サイトマップURL | 12 | 全件GETで追跡 |
| サイトマップ内リダイレクトURL | 12/12 | `https://kyute.jp` → `https://www.kyute.jp`、HTTP307 |
| indexを許可するページのcanonical不一致 | 11/12 | canonicalがリダイレクト元non-wwwを指す |
| indexを許可するページのcanonical未設定 | 1/12 | `/contact` |
| title / description欠落、重複 | 各0 | indexを許可する12ページを比較 |
| H1が0個または複数 | 0 | 検索意図への適合は別途、人が評価する |
| 発見した4xx / 5xxページ | 0 | 外部リンク先・画像/PDFはHTTP未検証 |
| 壊れたHTML内部アンカー | 0 | サーバーHTML内のid/nameを照合。JS生成要素の全検証ではない |
| サイトマップ孤立候補 | 0 | 今回の探索範囲内に入リンクあり。全Web上の孤立を証明しない |
| alt属性の欠落 | 0 | `alt=""`は装飾の可能性があり、欠落と分けた |
| JSON-LDのある直接ページ | 1/19 | 公開コラムのArticle/Breadcrumb。JSON構文を確認、Googleの適格性判定ではない |
| 自動検出error / warning / unverified | 24 / 0 / 0 | canonical不一致11 + 欠落1 + sitemapリダイレクト12。同一根因の重複を含み、24個の独立課題ではない |
| robots.txt | 200、`Allow: /` | sitemap指定がnon-www |
| HTTPS non-wwwの応答 | 307 → www | 恒久URL統合には301/308への配信設定見直しも検討 |
| HTTP non-wwwの応答 | 308 → HTTPS non-www → 307 → HTTPS www | 2段の転送。www/HTTPS本体は200 |

生データ: [production-20261016.json](evidence/production-20261016.json)、[URL一覧CSV](evidence/production-20261016.csv)。公開Revisionの照合は統合担当のGitHub Production deployment確認: deployment `7109702397` / SHA `c3fa40bdcbd93bd1cbdc90fb341e1bc801351b49`。このSHAはクローラーがHTMLから独立検証した値ではない。

## ドメイン評価・被リンク

統合担当が2026-10-16にAhrefs公式無料チェッカーの実画面で取得。第三者ツールの独自指標であり、Googleの評価指標ではない。サブドメイン・計測モードを揃えた同ツール比較で使う。

| 指標 | 実測 | 根拠・制約 |
| --- | ---: | --- |
| Domain Rating（DR） | 0 | Ahrefs公式画面 |
| 被リンク | 717 | 同画面のBacklinks |
| 参照ドメイン相当 | 378 | 同画面のLinking websites |
| 被リンクdofollow比率 | 15% | 丸め表示。件数へ逆算しない |
| Linking websitesのdofollow比率 | 14% | 丸め表示。件数へ逆算しない |
| nofollowの正確な件数 | 未取得 | 上記比率から推定しない |
| リンク元一覧 | 限定20件を取得 | Ahrefs無料表示、subdomains・1 domain 1 link。全378サイトの一覧ではない |
| 全体のアンカー分布・リンク品質 | 未検証 | 無料表示20件から全体比率・安全性・有害性を断定しない |

根拠: [Ahrefs取得画面](evidence/ahrefs-kyute-20261016.jpg)。DR0でもリンクは存在する。数値だけで「被リンクがない」「ペナルティがある」とは結論しない。

追加根拠: [被リンク限定20件の取得データ](evidence/ahrefs-backlinks-20261016.json)。Ahrefs Backlink Checkerのsubdomains・one link per domain表示を統合担当が取得した。SEO関連語を含む似たパスのリンク元が目立つが、各リンク元ページの実内容・作成経緯・Google上の扱いは未確認。全体の分布や品質の代表サンプルとは扱わず、これだけでリンク否認を実行しない。


### 競合8ドメインとの同条件比較

Ahrefs公式Website Authority Checker、2026-10-16、**root domain単位**の表示値。K表記は画面の丸めを保持し、正確な件数へ変換していない。特定サービスページの強さ、検索順位、流入数の比較ではない。

| root domain | DR | 被リンク（画面表示） | Linking websites（画面表示） | 被リンクdofollow比率 | Linking websitesのdofollow比率 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `kyute.jp` | 0 | 717 | 378 | 15% | 14% |
| `moovy.jp` | 44 | 5.5K | 971 | 67% | 31% |
| `jpc-ltd.co.jp` | 43 | 34K | 873 | 96% | 33% |
| `foursons.co.jp` | 46 | 1.8K | 901 | 62% | 33% |
| `cine-mato.com` | 39 | 2.9K | 1.1K | 34% | 48% |
| `humancentrix.com` | 42 | 4.6K | 1.2K | 74% | 50% |
| `hypex.jp` | 36 | 1.4K | 681 | 54% | 31% |
| `behealthy.co.jp` | 41 | 1.8K | 707 | 27% | 27% |
| `naminori-inc.com` | 2.6 | 580 | 316 | 6% | 6% |

根拠: [Ahrefs比較データ](evidence/authority-20261016.json)。KYUTEはこの比較群の中でDRが低い。ただし件数の多寡だけでは差を説明できず、関連性・リンク元ページ・編集上の推薦かどうか等の内訳は別途調べる必要がある。DRの上昇そのものを問い合わせ増の代替KPIにしない。

## アカウントが必要な指標

| 指標 | 初期値 | 次の取得元 |
| --- | --- | --- |
| 自然検索クリック / 表示回数 / CTR / 平均掲載順位 | 未取得 | Google Search Console、国=日本・検索タイプ=ウェブ、日付範囲を固定 |
| Googleの実インデックス登録数・canonical選択 | 未取得 | Search Consoleのページ登録・URL検査 |
| 自然検索セッション・問い合わせCV | 未取得 | GA4/既存Analytics + フォームの実イベント定義 |
| 主要キーワードの順位推移 | 未取得 | Search Console/同一条件の順位測定 |
| Core Web Vitals（実ユーザーp75） | 未取得 | Search Console / CrUX / PSI field data |

`site:`の概算件数、1回の検索表示、サーバー応答時間、Lighthouseのスコアを上記の代替値にしない。

## 速度計測の条件

Google PageSpeed Insightsの公開APIを1回実行したが、API側のquotaが0でHTTP429 `RESOURCE_EXHAUSTED`。KYUTEのHTTP障害でもCore Web Vitals不合格でもない。[API応答](evidence/pagespeed-production-home-mobile-20261016.json)。認証キー・課金は使っていない。

Lighthouse CLI 13.5.0 / HeadlessChrome 155、mobile、simulate、RTT150ms、throughput1638.4Kbps、CPU slowdown 4倍で3ページを順番に各1回測定した。2026-10-16 12:38–12:41 JST。3回ともrunWarningsなし。

| URL | Performance | LCP | FCP | TBT | CLS（生値） | 総転送量 | フォント通信数 / 転送量 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/` | 52 | 41.1秒 | 3.6秒 | 290ms | 0 | 8,429,168 bytes | 505件 / 7,619,487 bytes |
| `/service/recruit-video` | 71 | 40.0秒 | 2.4秒 | 112ms | 0.000200 | 8,257,675 bytes | 511件 / 7,704,786 bytes |
| `/column/recruit-video-production-company` | 68 | 40.9秒 | 3.4秒 | 62.5ms | 0.000233 | 9,499,808 bytes | 517件 / 7,810,555 bytes |

全3ページのLighthouse Accessibility / SEOは100。Best Practicesはホーム・採用動画100、コラム96。コラムの減点は`youtube-nocookie.com/embed/zeCEpDVI24s`に対するChromeのCookie issue。これらの100点は手動アクセシビリティ、正規URLの整合、検索順位の合格保証ではない。

最も大きい改善候補はフォント。公開ホームのHTMLはfont preloadを**483個**持ち、実通信の約90%（bytes）がフォントだった。不要な日本語サブセットを先読みしている可能性が高い。日本語フォントの`preload: false`で必要な字形だけをCSS経由で取得させる修正を優先し、ブランド書体は維持する。ローカル修正後に同条件のラボ値と実際の表示を確認し、公開後にも再測定する。

根拠: [3ページ集計JSON](evidence/lighthouse-production-summary-20261016.json)、[font preload483個](evidence/font-preloads-production-20261016.json)、[ホームHTMLレポート](evidence/lighthouse-production-home-mobile-20261016.report.html)、[採用動画HTMLレポート](evidence/lighthouse-production-service-video-mobile-20261016.report.html)、[コラムHTMLレポート](evidence/lighthouse-production-column-mobile-20261016.report.html)。それぞれ同名の`.report.json.gz`も保存（完全な生JSONをgzip圧縮、HTMLは行末空白のみ整形し、そのまま開ける）。

再測定例（Lighthouseはリポジトリ依存へ追加していない）:

```bash
npx --yes lighthouse@13.5.0 https://www.kyute.jp/ \
  --chrome-flags='--headless=new --no-sandbox' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output=html \
  --output-path=docs/seo/evidence/lighthouse-after-home-mobile-YYYYMMDD
```

モバイルシミュレーションの単発値は実ユーザーのLCP/INP/CLSや検索順位を証明しない。クローラーJSONの`elapsedMs`はキャッシュ等に左右される非スロットルHTTPヘッダ受信時間であり、TTFBの代表値やCWVとして報告しない。

## 同じ条件で再測定する

```bash
node scripts/audit-seo.mjs --output docs/seo/evidence/production-YYYYMMDD
node scripts/test-seo-audit.mjs
# 修正後production buildを起動したローカルで。別ターミナルで npm start 済み。
SEO_BASE_URL=http://localhost:3000 SEO_EXPECTED_ORIGIN=https://www.kyute.jp \
  node scripts/audit-seo.mjs --strict --output docs/seo/evidence/local-YYYYMMDD
```

`--strict`は実測error、未検証、探索打切りで失敗する。warningだけでは失敗しない。デフォルト上限100ページ、`--max-pages 1..500`で変更可能。環境のDNS禁止・401/403/429を「ページが壊れている」と扱わない。公開直後はこの初期値ファイルを上書きせず、別日付または明示的な`after`名で保存する。
