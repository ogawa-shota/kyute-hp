import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { thumb, youtubeUrl, type Video } from "./data";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  size?: "md" | "sm";
  cta: string;
  className?: string;
  onDark?: boolean;
};

/** Pill button. data-cta lets analytics tell placements apart. */
export function Button({ href, children, variant = "primary", size = "md", cta, className = "", onDark = false }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition duration-200";
  const sizes = size === "sm" ? "h-11 px-5 text-[15px]" : "h-14 px-8 text-base";
  const variants = {
    primary: "bg-[var(--brand)] text-[var(--ink-strong)] hover:bg-[var(--brand-deep)]",
    dark: "bg-[var(--ink-strong)] text-white hover:bg-black",
    outline: onDark
      ? "border-2 border-white text-white hover:bg-white/10"
      : "border-2 border-[var(--ink-strong)] bg-white text-[var(--ink-strong)] hover:bg-[var(--bg-soft)]",
  }[variant];
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      data-cta={cta}
      className={`${base} ${sizes} ${variants} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  tone?: "white" | "soft" | "dark" | "tint";
  id?: string;
  className?: string;
  labelledBy?: string;
};

export function Section({ children, tone = "white", id, className = "", labelledBy }: SectionProps) {
  const tones = {
    white: "bg-white",
    soft: "bg-[var(--bg-soft)]",
    tint: "bg-[var(--bg-tint)]",
    dark: "bg-[var(--ink-strong)] text-white",
  }[tone];
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-20 py-20 md:py-28 ${tones} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`mb-4 font-[family-name:var(--font-en)] text-sm font-bold tracking-[0.14em] ${onDark ? "text-[var(--brand)]" : "text-[var(--brand-ink)]"}`}>
      {children}
    </p>
  );
}

export function Heading({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`text-[28px] leading-[1.45] md:text-[44px] ${className}`}>
      {children}
    </h2>
  );
}

export function Lead({ children, onDark = false, className = "" }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={`mt-5 text-[17px] leading-[1.9] md:text-[19px] ${onDark ? "text-white/75" : "text-[var(--ink-soft)]"} ${className}`}>
      {children}
    </p>
  );
}

export function Pill({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "outline" | "dark" }) {
  const tones = {
    brand: "bg-[var(--brand)] text-[var(--ink-strong)]",
    outline: "border border-[var(--ink-strong)] bg-white text-[var(--ink-strong)]",
    dark: "bg-[var(--ink-strong)] text-white",
  }[tone];
  return <span className={`inline-flex self-start whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-bold ${tones}`}>{children}</span>;
}

/** A video thumbnail that opens the video on YouTube. */
export function VideoThumb({ video, priority = false, sizes = "(min-width: 768px) 50vw, 100vw", play = true, className = "" }: {
  video: Video;
  priority?: boolean;
  sizes?: string;
  play?: boolean;
  className?: string;
}) {
  return (
    <a
      href={youtubeUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${video.title}（YouTubeで見る）`}
      className={`group relative block aspect-video overflow-hidden rounded-2xl bg-[var(--line)] ${className}`}
    >
      <Image
        src={thumb(video.id)}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {play && (
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-lg shadow-lg">
          ▶
        </span>
      )}
    </a>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="mt-8 border-t border-[var(--line)]">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-[var(--line)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-bold md:text-[19px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">＋</span>
          </summary>
          <div className="pb-6 text-[16px] leading-[1.9] text-[var(--ink-soft)] md:text-[17px]">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-sm text-[var(--ink-mute)]">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">›</span>}
          {item.href ? <Link href={item.href} className="hover:text-[var(--ink-strong)]">{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/** Title block for simple subpages. */
export function PageIntro({ eyebrow, title, lead, crumbs }: { eyebrow: string; title: ReactNode; lead?: ReactNode; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="bg-white pb-12 pt-10 md:pb-16 md:pt-14">
      <Container>
        <Breadcrumb items={crumbs} />
        <div className="mt-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[36px] leading-[1.35] md:text-[60px]">{title}</h1>
          {lead && <Lead className="max-w-[44rem]">{lead}</Lead>}
        </div>
      </Container>
    </section>
  );
}
