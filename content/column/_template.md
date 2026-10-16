---
# ファイル名は slug と同じにする（例: content/column/recruit-video-cost.md）
title: 採用動画の費用相場と、失敗しない発注のポイント
description: 検索結果に出る説明文。70〜130文字で、誰の・どんな悩みに・何が分かるかを書く。
slug: recruit-video-cost
service: recruit-video        # recruit-video / recruit-youtube / ai-casual-interview / experience-briefing / general
keyword: 採用動画 費用         # 狙う検索ワード。1記事1つ。他の記事と重複不可
strategy:                     # CV戦略。書く前に決める（.claude/skills/column/references/cv-design.md）。review 以降は必須
  reader: 採用動画の外注を初めて検討している、従業員100〜300名の人事担当者
  intent: 採用動画の費用相場と、見積もりが高くなる条件を知って予算を決めたい
  stage: compare              # learn（情報収集）/ compare（比較検討）/ decide（発注直前）
  value: 費用の内訳と、金額が変わる条件を自分で判断できるようになる
  strength: 料金を公開しており、自社メディアで企画から撮影・編集まで実践している
cta: download-recruit-video   # 末尾CTA。省略するとサービスから自動で決まる（lib/column/core.mjs の CTAS）
eyecatch:                     # review 以降は必須。1600×900 のJPG・300KB以下。npm run column:eyecatch で作る
  src: /column/recruit-video-cost/eyecatch.jpg   # public/column/<slug>/ に置く
  alt: 三脚に載せたカメラが、打ち合わせ用の机と資料に向けられている様子
references:                   # 参考にした記事・出典の URL
  - https://example.com/source
primarySources:               # KYUTEにしか書けない一次情報。1つ以上必須。公開してよい内容だけ書く
  - 2026年9月の1日密着撮影で、出演者の事前ヒアリングを30分から60分に延ばした結果
author: kyute-editorial       # content/authors/<id>.json
status: draft                 # draft → review → published（公開を依頼されたら published）
mode: auto                    # auto（おまかせ）/ plan（じっくり）
publishedAt: 2026-11-01       # 公開日。未来の日付にすると、その日まで公開されない
# updatedAt: 2026-12-01
---

導入。読者の悩みと、この記事で分かることを3〜4文で。

## 見出しは「読者の疑問」に答える形で

最初の1〜2文で答えを書く。KYUTEの一次情報は、必ずどこかの見出しの中心に置く。

比較・数字は表にする。表の直前か直後に「この表から何が分かるか」を1〜2文で書き、出典を添える。

| 項目 | 内容 | 費用への影響 |
|---|---|---|
| 撮影日数 | 1日／2日 | 大きい |
| 出演者の人数 | 1名／複数名 | 中くらい |

出典：〇〇調査（発行者、2026年）

手順や仕組みは図にする。画像は public/column/<slug>/ に置き、alt に図の内容を、"..." にキャプションを書く。

![制作の流れ。ヒアリング、企画、撮影、編集、納品の5段階を縦に並べた図](/column/recruit-video-cost/flow.svg "採用動画ができるまでの流れ（KYUTEの場合）")

> [!POINT]
> 章の要点を1〜2文で。1記事に2〜3個まで。

読者が行動を考えた直後に、本文中のCTAを置く。直前の段落で「KYUTEの場合は〜」と1〜2文でつなぐ。compare・decide の記事は1つ以上必須、多くても3つ。

<!-- cta: price-recruit-video -->

## 2つ目の見出し

サービスページ・制作事例へのリンクは、リンク先で何が分かるかを書く（例: [採用動画の料金表](/service/recruit-video#price)）。関連コラムへのリンクは2本以上（例: [関連記事](/column/xxx)）。

YouTube の URL だけの段落は、動画プレイヤーになる。「運動部のシゴト。」の動画は、自社メディアであることを書く。

https://www.youtube.com/watch?v=QzPRS_T-D4Q

## まとめ

要点を3つ以内で。末尾のCTAは自動で入るので、本文には書かない。
