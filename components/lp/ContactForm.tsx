const GOOGLE_FORM_URL = "https://forms.gle/zR4SMCiroG739n1R7";
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOgXzFc4zxbbpM-gGva7KDwkIC1vUR5ajfvKe57fNs6z_YPw/viewform?embedded=true";

/**
 * GoogleフォームをCONTACTページ内に埋め込む。
 * 埋め込みを表示できない環境向けに、元のフォームへのリンクも用意する。
 */
export function ContactForm() {
  return (
    <div data-cta="contact-form">
      <iframe
        src={GOOGLE_FORM_EMBED_URL}
        title="お問い合わせフォーム"
        className="h-[1200px] w-full border-0"
      >
        読み込んでいます…
      </iframe>
      <p className="mt-4 text-center text-sm text-[var(--ink-soft)]">
        フォームが表示されない場合は、
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--ink)] underline decoration-[var(--brand)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--brand-deep)]"
        >
          こちらからお問い合わせください
        </a>
        。
      </p>
    </div>
  );
}
