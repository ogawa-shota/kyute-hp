import { pageMetadata } from "@/app/seo";
import UndoJobContent from "@/app/lp/undo-job/UndoJobContent";

export const metadata = pageMetadata({
  path: "/media",
  title: "運動部のシゴト。｜1日密着型採用メディア｜KYUTE",
  description:
    "体育会人材を採用したい企業のための1日密着型採用メディア「運動部のシゴト。」。採用広報・YouTube・体育会理解を組み合わせ、人・仕事・チームを伝える採用動画を企画・制作・公開します。",
  image: "/lp-assets/studio/okada-2.webp",
});

export default function MediaPage() {
  return <UndoJobContent embedded />;
}
