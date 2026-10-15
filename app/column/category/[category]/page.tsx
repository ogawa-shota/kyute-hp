import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/lp/PageHeader";
import { CategoryNav, ColumnGrid } from "@/components/column/ColumnParts";
import { SERVICES, getColumns, type ServiceId } from "@/lib/column";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const service = SERVICES[category as ServiceId];
  if (!service) return {};
  return {
    title: `${service.label}のコラム｜KYUTE`,
    description: `${service.name}について、KYUTEが現場で得た知見をもとに解説するコラムの一覧です。`,
    alternates: { canonical: `/column/category/${category}` },
    // An empty category is a thin page; keep it out of search until it has articles.
    robots: getColumns(category as ServiceId).some((c) => c.status === "published")
      ? undefined
      : { index: false, follow: true },
  };
}

export default async function ColumnCategoryPage({ params }: Props) {
  const { category } = await params;
  const id = category as ServiceId;
  const service = SERVICES[id];
  if (!service) notFound();
  return (
    <>
      <PageHeader eyebrow="COLUMN" title={`${service.label}のコラム`} />
      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <CategoryNav current={id} />
          <div className="mt-12">
            <ColumnGrid columns={getColumns(id)} />
          </div>
        </div>
      </section>
    </>
  );
}
