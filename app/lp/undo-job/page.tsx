import type { Metadata } from 'next';
import UndoJobContent from './UndoJobContent';

export const metadata: Metadata = {
  title: '運動部のシゴト。｜挑戦したい人に刺さる、採用PR動画を制作します。',
  description: '体育会人材を採用したい企業のための1日密着型採用メディア。採用広報・YouTube・体育会理解を組み合わせ、人・仕事・チームを伝える採用動画を企画・制作・公開します。',
  alternates: { canonical: 'https://www.kyute.jp/lp/undo-job' },
  robots: { index: false, follow: true }, // ad/sales LP; the corporate service pages are the search entry
  openGraph: { title: '挑戦したい人に刺さる、採用PR動画を制作します。', description: '採用のプロと体育会出身の制作陣が、挑戦したい人に刺さる1日密着型採用動画をつくります。', url: 'https://www.kyute.jp/lp/undo-job', images: [{ url: '/lp-assets/studio/okada-2.webp', width: 1112, height: 626 }], locale: 'ja_JP', type: 'website' },
};
export default function UndoJobPage() {
  return <UndoJobContent />;
}
