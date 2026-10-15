import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { CategoryNav, ColumnGrid } from "@/components/column/ColumnParts";
import { getColumns } from "@/lib/column";

export const metadata: Metadata = {
  title: "お役立ちコラム｜KYUTE",
  description:
    "採用動画・採用YouTube・採用広報について、KYUTEが現場で得た知見をもとに解説します。",
  alternates: { canonical: "/column" },
};

export default function ColumnIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="COLUMN"
        title="採用広報のお役立ちコラム"
        lead="採用動画・採用YouTube・採用広報について、KYUTEが現場で得た知見をもとに解説します。"
      />
      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <CategoryNav />
          <div className="mt-12">
            <ColumnGrid columns={getColumns()} />
          </div>
        </div>
      </section>
    </>
  );
}
