import { Hero } from "@/components/lp/Hero";
import { Youtube } from "@/components/lp/Youtube";
import { Services } from "@/components/lp/Services";
import { Funnel } from "@/components/lp/Funnel";
import { Closing } from "@/components/lp/Closing";

export default function Home() {
  return (
    <>
      {/* 成果の約束 */}
      <Hero />
      {/* なぜYouTubeなのか（消える広告から貯まる資産へ） */}
      <Youtube />
      {/* サービス一望（概要） */}
      <Services />
      {/* 効果の証明（採用ファネル図） */}
      <Funnel />
      {/* ブランドクロージング＋CTA */}
      <Closing />
    </>
  );
}
