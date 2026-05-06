import { contactCopy } from "@/data/site-content";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[var(--ink)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute -left-20 top-16 h-48 w-[120vw] -rotate-6 bg-[var(--brand)]" />
        <div className="absolute right-10 top-10 h-28 w-28 rotate-12 bg-[var(--accent)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="inline-flex rotate-[-3deg] border-2 border-white bg-[var(--accent)] px-3 py-2 font-latin text-lg font-extrabold uppercase tracking-[0.12em] text-[var(--ink)]">
          {contactCopy.eyebrow}
        </p>
        <p className="mt-8 font-latin text-3xl font-extrabold uppercase tracking-[0.08em] text-[var(--accent)]">
          let&apos;s evolve together
        </p>
        <h2 className="mt-6 whitespace-pre-line text-balance text-4xl font-black leading-tight text-white md:text-6xl">
          {contactCopy.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm font-bold leading-loose text-white/80 md:text-base">
          {contactCopy.body}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={contactCopy.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-sm font-black text-[var(--ink)] shadow-[6px_6px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            {contactCopy.primaryCta.label}
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href={contactCopy.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[var(--ink)]"
          >
            {contactCopy.secondaryCta.label}
          </a>
        </div>

        <p className="mt-12 font-latin text-xs tracking-[0.32em] text-white/50">
          contact@kyute.jp
        </p>
      </div>
    </section>
  );
}
