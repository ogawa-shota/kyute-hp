import { Reveal } from "./Reveal";

/**
 * S4 — 転換（価値観の提示）。センター寄せの宣言。前後に十分な余白、背景をわずかに色替え。
 */
export function Shift() {
  return (
    <section className="bg-dark py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.6] text-white">
            採用成果を変えるのは、
            <br />
            「伝える情報」ではなく、
            <span className="text-[var(--brand)]">「伝わる体験」</span>
            です。
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-base leading-[2] text-white/80">
            候補者は、会社を&quot;読んで&quot;いるのではありません。
            <br />
            会社を&quot;感じて&quot;います。
            <br />
            だから私たちは、会社を説明する動画ではなく、
            <br />
            会社を体験できる動画をつくります。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
