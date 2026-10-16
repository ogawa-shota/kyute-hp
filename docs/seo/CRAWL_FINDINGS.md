# 公開クロール所見 — 改善前 2026-10-16

最優先はURLの正規化と大量フォント先読みの解消。公開本体はwwwなのに、サイトマップ全12URLと主要canonical11URLがnon-wwwを指している。問い合わせページにはcanonicalがない。HTTP、静的HTML、サイトマップの根拠を保存した。検索エンジンが実際に選んだcanonicalや順位低下の原因までは、今回のデータだけでは断定できない。

重要度は総合監査の基準（P0＝インデックス/CVの重大な阻害）に合わせる。観測されたcanonical/性能課題はP1とし、サイト全体のP0障害とは断定しない。

## 根拠と対応

| 優先 | 観測 | 影響の解釈 | 修正・確認 |
| --- | --- | --- | --- |
| P1 | Lighthouse mobileで3ページLCP40.0–41.1秒。ホームはfont preload483個、実font通信505件・7.62MB | 単発ラボの計測だが、総通信量の大半をフォントが占める | 日本語フォントのpreloadを止め、必要なサブセットだけCSSで読み込む。同じ書体を維持しつつlocalと公開後で再測定 |
| P1 | `https://kyute.jp/*`が307で`https://www.kyute.jp/*`へ転送。一方canonical・sitemapはnon-www | 正規URLのシグナルが配信と不一致。余分な取得も発生 | SITE_URL、canonical、sitemap、robots、OG URL、JSON-LDをwwwに統一。配信側のnon-www転送は恒久301/308を検討 |
| P1 | `/contact`にcanonicalなし | 正規URLを明示できていない | 同ページの絶対canonicalを設定 |
| P1 | `/service/recruit-video`のH1は「面白く、」のみ | 主見出し単体でサービス内容が伝わらない | Heroの見た目を維持し、見えている主コピーのサービス名までH1に含める |
| P1 | `/service/recruit-youtube`のH1は「認知を取って、心を掴んで、離さない。」 | 主見出し単体で対象が不明瞭 | ブランドコピーを保ちサービス名を自然に含む意味構造へ |
| P2 | JSON-LDは記事1ページのみ | 会社・サービスの明示的な構造化を補える | 公開された会社情報に限定してOrganization/WebSite/Service/Breadcrumbを整備。成果・顧客・住所等の捏造はしない |
| P2 | 19直接ページ全てにH1が1つ、12index許可ページのtitle/description重複なし | 基本的な要素数は良好 | 一律の文字数判定で書き換えず、検索意図とクリック判断を評価 |
| P2 | 採用YouTubeページは画像55個、うち空alt54個。採用動画は8個、空alt7個 | 装飾・アイコンは空altが適切な可能性。件数だけでは欠陥といえない | 意味を伝える事例サムネイル・図版だけ適切な説明を付ける。キーワードを全画像へ詰め込まない |
| P2 | HTTP non-www→HTTPS non-www→HTTPS wwwの2段転送 | 無駄なリダイレクト | 配信設定で最終URLへの1段化を検討。コードの修正と本番設定変更を分ける |

## 現状で正常だった範囲

- 23ページURLを追跡し、19ページが直接200。旧URL4件は308で意図した先へ到達した。
- LP5ページはnoindexでサイトマップ外。記事0件のカテゴリ2ページもnoindexでサイトマップ外。下書きや未発表サービスを「欠落ページ」として数えていない。
- 対象サイトマップ12URLにnoindex、4xx/5xx、今回の探索範囲での孤立候補はなかった。
- 内部HTMLアンカー切れ、alt属性自体の欠落、JSON-LD構文エラーは発見しなかった。
- indexを許可するページのtitle/descriptionは各1つ、重複0。H1数も各1つ。ただし意味の適切さとは別の判定。

## URLごとの根拠を読む

[JSON](evidence/production-20261016.json)には取得日時、送信URLと最終URL、status、リダイレクト全段、robots、canonical、title、description、H1〜H6、JSON-LD本文、画像alt/寸法属性、リンク文字列・URL、id一覧、入リンク、エラー分類を含む。[CSV](evidence/production-20261016.csv)は1リクエストURL1行。転送先HTMLが再掲される行を、独立ページ数や重複タイトルの母数に加えない。

`summary.errors=24`は11canonical不一致・1canonical欠落・12sitemap転送の合計。優先課題が24種類あるという意味ではない。自動warning0も品質問題が0という意味ではない。

## 限界

初回sandbox内curlはDNS解決に失敗した。公開GETの許可範囲で再実行後、全対象からHTTP応答を取得し、最終クロールの`unverified=0`を確認した。最初のDNS制限をサイト障害とは扱っていない。

サーバーHTMLの監査であり、JS実行後のDOM、動画再生、フォーム送信、外部リンク先、画像/PDFのHTTPステータス、Googleの実インデックス、検索流入、被リンクの品質はこのクロールでは未検証。構造化データのJSON構文合格はRich Results適格性の保証ではない。

性能はLighthouseラボ測定と実ユーザーのフィールドデータを分離する。PSI APIの429はAPI割当制限によるもので、KYUTEのレスポンス429ではない。

Lighthouseの詳細条件・スコア・ネットワーク内訳は[初期計測値](BASELINE_METRICS.md#速度計測の条件)に記載。ホームの画像配信改善候補は約419KiB、未使用CSSは約78KiB。まず7.62MBのフォントを改善し、その後に画像とルートごとのCSS配信を確認する。推定節約値の合算を実測短縮時間として扱わない。

## 修正後のローカル検証（公開結果とは分離）

2026-10-16、`http://127.0.0.1:3107`のproduction buildに対し、正規URLを`https://www.kyute.jp`として`--strict`で検証。23ページURL、19直接HTML200、サイトマップ12URL、**error0 / warning0 / unverified0、探索打切りなし**。根拠: [local JSON](evidence/local-20261016.json)、[local CSV](evidence/local-20261016.csv)。公開環境への反映はこの結果からは主張しない。

監視ルールはサイトマップと観測metaだけに依存しない。実装の公開予定ルート10件＋公開条件を満たした記事/カテゴリにindex許可とサイトマップ収録を要求し、PACE以外の広告・旧LPと既知の記事0件カテゴリにはnoindexを要求する。Googlebot用のrobots規則は監査botの取得許可と分けて検査する。ローカルへのURL読み替え時も、サイトマップ本文に書かれた公開hostがwwwであることを検査する。

独立reviewで指摘された「LPのnoindexが消える」「重要ページがnoindexになりサイトマップも空になる」「Googlebotだけブロックされる」をfixture化し、独立reviewerの再現テストも通過した。取得できないサイトマップは空とは断定せず、未検証として扱う。

ローカル初回GETはsandboxによりEPERMになったため、同じ読み取り専用GETを許可範囲で再実行した。成功した最終エビデンスのみを`local-20261016`へ保存した。フォーム送信・API呼出しは実行していない。

### ローカルLighthouseで残った性能課題

公開前と同じLighthouse13.5.0・mobile・simulate設定で、修正後のローカルproduction buildを測定した。公開ホストとは配信・圧縮・HTTPプロトコル・キャッシュ・ネットワークが異なるため、公開後の速度改善率や因果効果としては使わない。

| ローカルページ | Performance | LCP | FCP | TBT | 総転送量 | フォント数 / 転送量 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `/` | 88 | 3.6秒 | 2.1秒 | 63ms | 2,023,581 bytes | 65件 / 1,137,841 bytes |
| `/service/recruit-video` | 83 | 4.2秒 | 2.4秒 | 50ms | 1,907,660 bytes | 76件 / 1,296,077 bytes |
| コラム 初回 | 55 | 18.8秒 | 14.0秒 | 0ms | 2,987,776 bytes | 72件 / 1,241,665 bytes |
| コラム 再測定 | 55 | 19.3秒 | 13.9秒 | 0ms | 2,987,798 bytes | 72件 / 1,241,665 bytes |

各ページのフォント通信は改善前公開値の505〜517件・7.62〜7.81MBから減少した。書体を維持したまま不要な先読みを外せたという実装上の確認になる。一方、**コラムのsimulated performanceは未解消の課題**。再測定でも再現したので初回値を除外していない。無制限条件で観測されたコラムのLCPは約1.39秒だが、こちらをsimulated値の代わりに採用しない。ローカルのHTTP/1.1、render-blocking CSS、初回に取得されるYouTube iframeの配信を分けて診断し、公開後は同一ホスト上の計測で再確認する。

全3ページのLighthouse Accessibility/SEOは100。Best Practicesはホーム・採用動画96、コラム92。ローカル全ページの`/_vercel/insights/script.js`404がconsole減点となり、コラムは加えてYouTube埋め込みのCookie issueがある。Vercel配信固有の計測スクリプトがローカルにないことと、公開サイトのHTTP障害を混同しない。

根拠: [ローカル集計JSON（再測定含む）](evidence/lighthouse-local-summary-20261016.json)、[ホームHTML](evidence/lighthouse-local-home-mobile-20261016.report.html)、[採用動画HTML](evidence/lighthouse-local-service-video-mobile-20261016.report.html)、[コラム初回HTML](evidence/lighthouse-local-column-mobile-20261016.report.html)、[コラム再測定HTML](evidence/lighthouse-local-column-repeat-mobile-20261016.report.html)。全て完全な生JSONを同名`.report.json.gz`として保存した。現時点で「CWV合格」「全ページ高速化完了」「公開後の改善」を意味しない。

## 2026-10-16 公開直前の追記

初期監査後にmainのPR #8/#9でPACEが検索対象として復元された。初期件数は当時の基準として維持する。最新監視では`/lp/pace`をindexable/sitemap必須、`/pace/index.html`を本体と同内容の既知canonical別名、`/pace`をredirectとして検査し、広告LP/別名のsitemap混入は検出する。
