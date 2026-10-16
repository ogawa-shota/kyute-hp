# SEO変更履歴

## 2026-10-16 — 優先改善と計測・運用基盤（本番未反映）

作業ブランチ：`codex/seo-audit-foundation-20261016`。開始SHA：`c3fa40bdcbd93bd1cbdc90fb341e1bc801351b49`。

### 正規URL・配信HTML

- `app/seo.ts`を共通metadata/schema入口にし、配信本体の`https://www.kyute.jp`へcanonical/OG/Twitterを統一。`app/contact/page.tsx`にもmetadataを設定。
- `public/robots.txt`と`app/sitemap.ts`を整合。`lib/column/`でJSTの公開条件、実在日付、最大更新日を使い、未来記事/previewが混在しないよう修正。
- 旧LPのnoindex、空カテゴリのnoindex、既存redirect、URL構造を維持。DNS/ドメイン配信設定は変更していない。

### 主題・信頼・記事導線

- `app/page.tsx`と2サービスに、表示内容に一致するOrganization/WebSite/Service/BreadcrumbのJSON-LDを追加。安全なシリアライズを共通化。
- `components/site/RecruitVideoPage.tsx`、`RecruitYoutubePage.tsx`は既存の見た目と言葉を保ちながらH1の主題を明確化。
- `content/authors/`と記事ページでOrganization/Personを分離。`components/column/ColumnParts.tsx`に内容確認者と出典表示を追加。
- 既存比較記事のfrontmatterへ検討段階・CV仮説を追加し、費用節の文脈に沿う既存料金CTAを1つ配置。新しい料金/実績/保証文言は作っていない。
- `docs/COLUMN.md`は既存column skillへの入口を維持し、静的生成サイトの未来日公開に再ビルドが必要な点を明確化。

### 性能

- `app/layout.tsx`で日本語2書体のpreloadを無効化し、書体/weight/displayは維持。Interの先読みは維持。
- 実配信前のfont preload483件と修正後local1件を比較。通信量の削減を確認。コラムのLab性能は残件として保存し、全ページ高速化完了とはしていない。

### 計測・フォーム

- `lib/analytics.ts`、`components/analytics/`で共通CTA/資料成功/任意GA4を実装。記事CTAの既存イベント名を維持し、共通trackerとの二重計測を避ける。
- `components/site/MaterialForm.tsx`で通信成功後のみ資料成功イベントを送り、連打と重複成功計測を防止。
- 送信値を公開pathnameと定義済みIDに限定し、query/hash/フォーム値を送らない。GA4はID未設定・localhost・preview hostで無効。第三者通信全般の匿名性を保証するものではない。
- `.env.example`に空の任意GA4 IDを追加。GTM/GA4管理画面・本番環境変数は変更していない。

### 検証・監視・ドキュメント

- `scripts/audit-seo.mjs`でGET限定HTMLクロール、robots/sitemap/metadata/内部リンク/意図したindex方針を検査しJSON/CSVを出力。
- crawler、analytics、SEOの回帰テストを追加。独立reviewで見つかったnoindex/sitemap/Googlebotの検出漏れをfixture化して修正。
- `package.json`へ型チェックとクロールコマンド、`.github/workflows/check.yml`へビルド後検査を追加。`seo-monitor.yml`で週次監視を準備。
- `docs/SITE.md`、`docs/DESIGN.md`、root `README.md`を現在の実装へ更新。`docs/seo/`へ依頼された16文書と補足所見・証跡を保存。

検証の結果・警告・未実施範囲は[PROGRESS.md](PROGRESS.md)。公開後の変更は日付とdeploymentを追記し、改善前証跡を上書きしない。
