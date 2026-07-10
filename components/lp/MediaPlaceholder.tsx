type MediaPlaceholderProps = {
  label?: string;
  className?: string;
  ratio?: string; // tailwind aspect ratio class, e.g. "aspect-video"
};

/**
 * 差し替え: ダミーのメディア枠。実際の密着動画サムネ/クリップに差し替えてください。
 * ドキュメンタリー調・自然光のトーンの静止画/動画を想定。
 */
export function MediaPlaceholder({
  label = "密着映像",
  className = "",
  ratio = "aspect-video",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative ${ratio} overflow-hidden rounded-xl bg-[var(--bg-tint)] ${className}`}
      role="img"
      aria-label={`${label}（差し替え用プレースホルダー）`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-soft)] to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-[var(--ink-mute)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
          </svg>
          <span className="text-xs tracking-wide">{label}</span>
        </div>
      </div>
    </div>
  );
}
