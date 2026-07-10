import Image from "next/image";
import logo from "@/public/kyute-logo.png";

type LogoProps = {
  className?: string;
};

/** KYUTE コーポレートロゴ（ゴールドKマーク＋ワードマーク）。 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="KYUTE"
      priority
      className={`h-7 w-auto ${className}`}
      sizes="132px"
    />
  );
}
