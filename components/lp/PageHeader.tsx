import { Reveal } from "./Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/** サブページ共通の見出しブロック。ヘッダー分の余白を確保。 */
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <section className="bg-white pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="max-w-[18em] text-3xl font-bold leading-[1.35] text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-[44rem] text-base leading-[1.95] text-[var(--ink-soft)]">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
