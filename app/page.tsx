import { Hero } from "@/components/lp/Hero";
import { Concept } from "@/components/lp/Concept";
import { Services } from "@/components/lp/Services";
import { Funnel } from "@/components/lp/Funnel";
import { Closing } from "@/components/lp/Closing";

export default function Home() {
  return (
    <>
      {/* 成果の約束 */}
      <Hero />
      {/* 参考サイトGLISのように、大きな思想セクションで世界観を補強 */}
      <Concept />
      {/* サービス一望（概要） */}
      <Services />
      {/* 効果の証明（採用ファネル図） */}
      <Funnel />
      {/* ブランドクロージング＋CTA */}
      <Closing />
    </>
  );
}
