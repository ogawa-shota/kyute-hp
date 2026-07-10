import { CtaButton } from "./CtaButton";

/** Sticky bottom CTA bar shown on mobile only. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line-soft)] bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <CtaButton
        href="/contact"
        cta="mobile-sticky"
        className="w-full"
      >
        無料で相談する
      </CtaButton>
    </div>
  );
}
