"use client";

import { useId, useState } from "react";
import "./culture-engine.css";

const steps = [
  {
    title: "採用・チャンネル戦略",
    short: "戦略",
    purpose: "誰に、どんな会社として選ばれたいか。採用の課題から、発信の軸を定めます。",
    output: "採用ターゲット／伝える価値／チャンネル方針",
    handoff: "届けたい相手とメッセージを、企画の判断基準に。",
  },
  {
    title: "企画",
    short: "企画",
    purpose: "人柄や価値観が表れる場面を探し、見たくなる切り口と構成に落とし込みます。",
    output: "企画案／出演者・取材テーマ／構成案",
    handoff: "撮るべき場面と、聞くべき問いを撮影チームへ。",
  },
  {
    title: "撮影",
    short: "撮影",
    purpose: "働く人の言葉、表情、日常のやりとり。その会社らしさがにじむ瞬間を捉えます。",
    output: "インタビュー／仕事風景／職場の日常の映像",
    handoff: "映像と取材で見えた魅力を、編集のストーリーへ。",
  },
  {
    title: "編集・サムネイル",
    short: "編集",
    purpose: "伝えたい魅力を、最後まで見たくなる物語へ。動画の入口になるサムネイルも設計します。",
    output: "編集動画／サムネイル／タイトル案",
    handoff: "動画の内容と入口の見せ方を揃え、公開準備へ。",
  },
  {
    title: "投稿・運用",
    short: "投稿",
    purpose: "動画を公開し、採用情報への導線を整備。見てもらった先の企業理解につなげます。",
    output: "動画公開／概要欄・採用導線／投稿管理",
    handoff: "公開した動画の視聴データを集め、分析へ。",
  },
  {
    title: "分析",
    short: "分析",
    purpose: "どんな入口が選ばれ、どこまで見られたか。共有いただいた採用反応と合わせて振り返ります。",
    output: "視聴データの振り返り／反応の整理／課題の特定",
    handoff: "届いた魅力と伝わりきらなかった点を、改善の材料に。",
  },
  {
    title: "改善",
    short: "改善",
    purpose: "反応をもとに、切り口や見せ方を見直す。次の一本で、伝わる精度を高めていきます。",
    output: "改善方針／次回の検証テーマ／企画への反映",
    handoff: "得られた学びを、次の企画へ戻します。",
  },
] as const;

const ringNodes = [
  { x: 240, y: 95, labelX: 240, labelY: 65 },
  { x: 382.9, y: 177.5, labelX: 422, labelY: 164 },
  { x: 382.9, y: 342.5, labelX: 422, labelY: 368 },
  { x: 240, y: 425, labelX: 240, labelY: 468 },
  { x: 97.1, y: 342.5, labelX: 55, labelY: 368 },
  { x: 97.1, y: 177.5, labelX: 55, labelY: 164 },
];

function arcPath(index: number) {
  // A gap around each node makes the direction of the six-stage loop clear.
  const start = ((index * 60 - 90 + 9) * Math.PI) / 180;
  const end = ((index * 60 - 90 + 51) * Math.PI) / 180;
  const point = (angle: number) => `${240 + 165 * Math.cos(angle)} ${260 + 165 * Math.sin(angle)}`;
  return `M ${point(start)} A 165 165 0 0 1 ${point(end)}`;
}

export default function CultureEngine() {
  const [selected, setSelected] = useState(0);
  const markerId = useId().replace(/:/g, "");
  const detailId = `${markerId}-detail`;
  const step = steps[selected];

  return (
    <section id="operation" className="ce-section" aria-labelledby={`${markerId}-heading`}>
      <div className="ce-inner">
        <header className="ce-heading">
          <h2 id={`${markerId}-heading`}>一本の先を、<br />つくり続ける。</h2>
          <p>採用反応と視聴データを、次の企画に戻す。<br />つくって終わらない、採用YouTubeの継続運用。</p>
        </header>

        <div className="ce-layout">
          <div className="ce-cycle">
            <svg className="ce-diagram" viewBox="0 0 480 500" aria-hidden="true" focusable="false">
              <defs>
                <marker id={`${markerId}-arrow`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M 1 1 L 6 4 L 1 7" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </marker>
              </defs>
              <path className={`ce-entry${selected === 0 ? " ce-is-active" : ""}`} d="M 65 60 L 65 95 L 218 95" markerEnd={`url(#${markerId}-arrow)`} />
              <text x="65" y="40" textAnchor="middle" className={`ce-strategy${selected === 0 ? " ce-is-active" : ""}`}>戦略</text>
              {ringNodes.map((node, index) => (
                <g key={steps[index + 1].short} className={`ce-node${selected === index + 1 ? " ce-is-active" : ""}`}>
                  <path className="ce-arc" d={arcPath(index)} markerEnd={`url(#${markerId}-arrow)`} />
                  <circle className="ce-node-dot" cx={node.x} cy={node.y} r="10" />
                  <circle className="ce-node-halo" cx={node.x} cy={node.y} r="19" />
                  <text x={node.labelX} y={node.labelY} textAnchor="middle" className="ce-node-label">{steps[index + 1].short}</text>
                </g>
              ))}
              <text className="ce-center-kicker" x="240" y="221" textAnchor="middle">見えてきた魅力を、</text>
              <text className="ce-center-main" x="240" y="266" textAnchor="middle">次の一本へ。</text>
              <path className="ce-center-arrow" d="M 215 300 C 215 322 265 322 265 300 M 259 305 L 265 299 L 271 305" />
            </svg>
            <p className="ce-cycle-note">伝える。反応を見る。また、磨く。</p>
          </div>

          <div className="ce-controls">
            <p className="ce-instruction">工程を選ぶと、支援内容が見られます。</p>
            <div className="ce-step-list" aria-label="継続運用の7つの工程">
              {steps.map((item, index) => (
                <button
                  key={item.short}
                  type="button"
                  className={`ce-step${selected === index ? " ce-is-active" : ""}`}
                  aria-pressed={selected === index}
                  aria-controls={detailId}
                  onClick={() => setSelected(index)}
                >
                  <span className="ce-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ce-step-title">{item.title}</span>
                  <span className="ce-step-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div className="ce-detail" id={detailId} aria-live="polite" aria-atomic="true">
              <h3 className="ce-detail-title">{step.title}</h3>
              <p className="ce-purpose">{step.purpose}</p>
              <dl className="ce-outputs">
                <div><dt>具体的なアウトプット</dt><dd>{step.output}</dd></div>
                <div><dt>{selected === 6 ? "次の企画へ" : "次の工程へ"}</dt><dd>{step.handoff}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
