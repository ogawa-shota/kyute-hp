# KYUTE SEO総合監査

監査基準：2026-10-16 JST。本番観測とローカル修正を分離する。**サイト全体のP0障害は今回のHTTP/コード調査では確認していない。最優先は正規URLの不整合、過剰なフォント先読み、問い合わせ計測の欠落。** Googleのインデックス状態・検索流入・商談数は権限未取得であり、ゼロと扱わない。

## 対象と環境

- GitHub：`ogawa-shota/kyute-hp`（public）、default branch `main`。開始時SHA `c3fa40bdcbd93bd1cbdc90fb341e1bc801351b49`。作業ブランチ `codex/seo-audit-foundation-20261016`。
- Vercel：project `kyute-hp`、本番deployment `dpl_6SCaZRBJh8becSsQtzjkbwsMukmH`、GitHubの同じSHAから配信。`www.kyute.jp`/`kyute.jp`がalias。API connectorのscope readは403だったが、同じprojectの認証済みCLI readで確認できた。証跡：[deployment](evidence/deployment-20261016.json)。
- Next.js 16.3.8 / React 19 / TypeScript 5 / Tailwind CSS 3。Node 24。App Routerで通常ページと記事は静的生成、APIはserver route handler。本文・リンクは配信HTMLに含まれ、CSRのみではない。
- 記事はMarkdown/frontmatter、著者JSON、remark/rehypeで管理。1記事公開。既存column skillに品質/CV/画像/公開チェックがあるため統合して再利用する。
- 画像はNext Image、静的画像/OGP、YouTube埋め込み、動画dialog。書体はnext/fontのLINE Seed JP、Inter、旧LP用Zen Kaku Gothic New。通常サイトと旧LPのデザインは別契約。
- Vercel Analyticsは有効でhasData=true。Hobbyプランでカスタムイベント集計不可。GA4/GTMは既存コードにない。GSCのDNS確認や権限の有無はコードでは判断できない。
- Resend/Slack/日程調整APIを維持。実メール/Slack送信はせずmock検証。`/contact`はGoogle Forms iframeで、親ページから完了を取得できない。
- CIは既存lint/test/buildに型チェック・ビルド後クロールを追加。週次監視を準備。稼働にはdefault branchへの承認済み反映が必要。

## 公開全体の確認範囲

sitemap、内部リンク、appルートを照合。23ルートをGETし、19直接HTML200（indexable12 / 意図的noindex7）、既存redirect4。LP5と記事のないカテゴリ2はnoindex。sitemap12件。詳細は [BASELINE_METRICS.md](BASELINE_METRICS.md)、[CRAWL_FINDINGS.md](CRAWL_FINDINGS.md)、[ページ別JSON](evidence/production-20261016.json)、[CSV](evidence/production-20261016.csv)。

観測範囲で4xx/5xx・ページ内リンク切れ・孤立候補・title/descriptionの欠落/重複・alt属性の欠落は0。空altは装飾の可能性があるので不具合と断定しない。URL Inspection/Googlebotレンダリング、外部リンク全件、全動画再生、Google Forms実送信は別検証。通常User-AgentのGETはGooglebot取得HTMLそのものではない。

## 優先課題

期待効果は仮説。重要度は順位の保証や自動スコアではなく、検索/CVへの障害と修正リスクで判断した。難度はS=数時間、M=0.5–2日、L=権限/企画を含む。

| ID / 優先度 | 根拠・対象URL | 推奨対応と実装状況 | 期待効果 | 難度 | 確認方法 |
|---|---|---|---|---|---|
| A01 / P1 | `https://kyute.jp/*`は307→www。公開sitemapの12URLとcanonical11ページがapex指定 | canonical/sitemap/robots/OG/schemaを200到達先wwwへ統一。ローカル実装済み。ドメイン設定は維持 | 正規URLシグナルの競合と不要な転送を減らす | S | ローカルstrict crawl、公開後HTTP、GSC選択canonical |
| A02 / P1 | `/contact`のcanonical欠落 | route metadata helperで自己canonical。ローカル実装済み | query等の重複統合を補助 | S | HTML canonical1件、www/contactを指すこと |
| A03 / P1 | `/`フォントpreload483件。mobile lab転送8.43MB・LCP41.1s。サービス/記事も約40s | 日本語2書体のpreloadを停止、書体/weight/見た目維持。ローカル実装済み | 初期ネットワーク競合を減らす | S | 同じLighthouse設定で前後Lab、公開後28日Field。Lab単発を実CV効果としない |
| A04 / P1 | `/service/recruit-video` H1が「面白く、」のみ、YouTube H1もサービス名が外 | 可視文言を保って主題をH1へ統合。ローカル実装済み | ページ主題と見出しの理解を助ける | S | H1数/文言とPC/モバイル表示 |
| A05 / P1 | `/download`・2サービスの資料成功イベントなし、Hobbyでは既存CTA集計不可 | 成功時のみイベント/二重送信防止、任意GA4アダプタ。コード済み、IDと管理画面設定待ち | 記事/LPから相談に近い行動を評価できる | M | 成功/失敗/再試行mock、設定後DebugView1回 |
| A06 / P1 | GSC指標、Google選択canonical、手動対策、自然検索CVの実数未取得 | USER_ACTIONSの権限/集計手順を実施。未取得は障害と断定しない | 施策優先度を実データへ更新 | L | GSC export、登録/リンクレポート |
| A07 / P2 | `/column/recruit-video-production-company`に著者Organization誤型、categoryがschemaパンくずから欠落 | Organization/Personを正しく分離、表示とschema階層を整合。実装済み | 著者/階層を正確に伝える | S | JSON-LD parse/回帰、公開後Google検証 |
| A08 / P2 | 同記事frontmatterにreviewer/referencesあり表示なし、CV strategy欠落 | 出典開閉・内容確認者表示、比較stage/仮説/料金CTA1つ追加。実装済み | 根拠を確かめやすくし比較→料金へ誘導 | M | column check、mobile CTA、クリック→資料率の月次検証 |
| A09 / P2 | sitemap lastmodが公開日順先頭に依存。公開日UTC判定。未来日とpreviewの混在 | 最大更新日、実在日付/JST、公開済み列挙を統一。実装済み | 更新/公開日の誤信号を減らす | S | 過去記事更新・未来記事・日付境界unit |
| A10 / P2 | ホーム/サービスの構造化データ不足 | 可視情報に基づくOrganization/WebSite/Service/Breadcrumb追加。実装済み | 主体/サービス/階層の機械可読性 | S | 実HTML parse、schema情報と本文照合。リッチ表示保証なし |
| A11 / P2 | Ahrefs DR0、被リンク717/378サイト。取得20ドメインの一覧に非関連SEO販促ページが多い | GSC手動対策/リンクを確認し関連媒体・顧客の自然な引用を増やす。否認/購入は未実施 | 質のある紹介と信頼の増加 | L | 許諾済み掲載、紹介流入、適合商談。ペナルティ/原因断定不可 |
| A12 / P2 | 1記事のみで費用/導入条件の深掘りが薄い。関連記事警告1 | CONTENT_STRATEGYに優先6テーマと一次情報要件を作成。独立記事は材料待ち | B/A層の検討を支える | L | 意図重複レビュー、公開後クエリ/LP遷移/商談 |
| A13 / P2 | Google Formsの親iframeでは送信完了を検出不可 | 完了をクリックで代用せず、所有者側回答集計/CRMを設計。未実装 | CV誤計上防止、質/受注の評価 | M | フォーム管理権限、匿名集計で照合 |
| A14 / P2 | 公開HTML検査/定期監視なし | GET限定crawler、CIと週次Actionsを実装 | 回帰の早期検出 | M | fixture/ローカルstrict、マージ後Actions |
| A15 / P3 | legacy `/lp`等のOG/Twitterが部分的、共通デザイン外の独立LP | noindex/URLを維持。広告で使用中のsurfaceを確認して個別整備 | 広告共有時の説明の一貫性 | M | 広告担当・SNSカード確認 |
| A16 / P3 | `/column`は公開1記事、関連記事2本未満 | 存在しない関連記事を追加せず、関連原稿公開時に推薦を増やす | 自然な回遊 | S | 全記事内部リンク・意図の一致 |

P0は未確認。HTTPエラーゼロはGoogleの全URL登録やフォーム到達の保証ではない。

## コンテンツ・信頼・CVの評価

2サービス、価格、無料相談、資料請求、会社情報、公開記事があり、目的別導線の基礎はある。自社メディアは顧客導入実績と区別されている。記事には比較表、一次情報、外部動画、FAQ、サービスへのリンクがある。1記事だけでトピック全体を扱えるとはしない。

比較記事を増殖させず、既存の「採用動画 制作会社」を改善し、次に「採用動画 費用」「採用動画 見積もり」「採用YouTube 運用代行/費用」を意図別に分担する。検索ボリューム/KD、競合の全記事数・上位順位は未取得。個別会社の価格/実績は当該公式ページの確認日と対象範囲を添え、未確認の顧客成果を補わない。

フォームはメール送付が必要な資料請求とGoogle Forms相談を分ける。クリック/フォーム表示/成功/適合商談を別指標にする。特にiframeの表示を完了イベントと呼ばない。料金や保証の事業変更、大規模UI改修は今回実施していない。

## 安全性・アクセシビリティ・性能

既存APIの入力検証・同一origin・honeypot・署名・冪等性を維持し、通信mockで回帰を確認する。JSON-LDはscript脱出を防ぐescape。analyticsは許可されたpublic pathnameと定義済みIDを用い、フォーム値を含めない。ただし第三者タグの通信全般を匿名と保証しない。

モバイル固定CTA、フォームラベル、skip link、見出し、メニューのフォーカス復帰をブラウザ確認した。Labのaccessibilityスコア100は全ユーザーのアクセシビリティ保証ではない。FieldのINP/CLS/LCPは未取得。PSI API429はAPI側quotaでありサイト障害ではない。

## 最新公式方針の適用

[Googleの正規化](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)に基づきredirect先/canonical/sitemapを一致させる。[構造化データ品質](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)に従い、実際に表示する事実だけを記述する。

2026-05-07以降、GoogleはFAQリッチリザルトを表示しないと[公式更新履歴](https://developers.google.com/search/updates)に明記している。FAQ本文は読者のために残すが、FAQPageで検索装飾を獲得する施策にはしない。動画schemaも公開日や視聴ページの適格性を確認せず量産しない。

[被リンク否認の公式注意](https://support.google.com/webmasters/answer/2648487)に従い、取得サンプルだけで否認ファイルを投入しない。DRはAhrefs独自指標でGoogleの評価値そのものではない。

## ローカル性能の残件

フォントの先読み削減後、localのホームPerformance88/LCP3.6秒、採用動画83/4.2秒。コラムは55/18.8秒、再測定55/19.3秒でsimulated性能の課題が残る。公開ホストとlocalではHTTP/圧縮/ネットワーク条件が異なり、本番改善や改善率を断定しない。YouTube初回読み込み、CSS、画像配信を次に診断し、公開後も同条件で測る。詳細は[CRAWL_FINDINGS](CRAWL_FINDINGS.md)。

## 検証・残件

統合テスト、ブラウザ、ローカル再クロール、性能再測定、独立レビューの確定結果は [PROGRESS.md](PROGRESS.md) に記録する。公開後の確認、アカウント権限・掲載許諾・本番承認は [USER_ACTIONS.md](USER_ACTIONS.md)。未実施項目を完了扱いにしない。
