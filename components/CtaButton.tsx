import Link from "next/link";

type Variant = "primary" | "line" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--brand)] text-white hover:brightness-105 shadow-sm border border-transparent",
  line: "bg-[#06C755] text-white hover:brightness-105 shadow-sm border border-transparent",
  outline:
    "bg-white text-[var(--ink)] border border-[var(--line)] hover:border-[var(--brand)] hover:text-[var(--brand)]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  external?: boolean;
  onClick?: () => void;
};

export function CtaButton({
  href,
  children,
  className = "",
  variant = "primary",
  external,
  onClick,
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${styles[variant]} ${className}`;

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
