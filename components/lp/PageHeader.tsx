import { Reveal } from "./Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/** サブページ共通の見出しブロック。ヘッダー分の余白を確保。 */
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
