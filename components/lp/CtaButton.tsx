import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** identifier for analytics — value of data-cta */
  cta: string;
  className?: string;
  /** true when placed on a dark background — flips the secondary outline to light */
  onDark?: boolean;
};

/**
 * Shared CTA. Primary = filled gold, Secondary = outlined.
 * Exposes data-cta for after-the-fact event tracking.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  cta,
  className = "",
  onDark = false,
}: CtaButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-[15px] font-semibold tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";
  const secondary = onDark
    ? "border border-white/40 text-white hover:bg-white/10"
    : "border border-[var(--ink-strong)] text-[var(--text-primary)] hover:bg-[var(--brand-soft)]";
  const styles =
    variant === "primary"
      ? "bg-[var(--brand)] text-[var(--text-primary)] shadow-[0_10px_28px_rgba(242,197,63,0.24)] hover:-translate-y-0.5 hover:bg-[var(--brand-deep)]"
      : secondary;

  return (
    <Link href={href} data-cta={cta} className={`${base} ${styles} ${className}`}>
      {children}
      {variant === "primary" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="translate-y-px"
        >
          <path
            d="M3 8h9M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}
