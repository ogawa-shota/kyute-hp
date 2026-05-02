import { contactCopy } from "@/data/site-content";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] via-[#15376b] to-[#2d6bff]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
        <div className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-[var(--brand)] opacity-30 blur-3xl animate-drift" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="font-latin text-[11px] font-medium uppercase tracking-[0.32em] text-white/70">
          {contactCopy.eyebrow}
        </p>
        <p className="mt-4 font-script text-3xl text-white/90 md:text-4xl">
          let&apos;s evolve together
        </p>
        <h2 className="mt-4 whitespace-pre-line text-balance text-3xl font-bold leading-tight text-white md:text-5xl">
          {contactCopy.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-loose text-white/80 md:text-base">
          {contactCopy.body}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={contactCopy.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--bg)] hover:shadow-2xl"
          >
            {contactCopy.primaryCta.label}
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href={contactCopy.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {contactCopy.secondaryCta.label}
          </a>
        </div>

        <p className="mt-12 font-latin text-xs tracking-[0.32em] text-white/50">
          ogawa@kyute.jp
        </p>
      </div>
    </section>
  );
}
