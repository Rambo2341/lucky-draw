import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { agents } from "@/data/people-places";
import { getDict, isLocale } from "@/lib/i18n";
import { PageHead, Shell } from "@/components/section";
import { AgentCard } from "@/components/agent-card";

export async function generateMetadata({ params }: PageProps<"/[locale]/agents">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return { title: t.agents.title, description: t.agents.lede, alternates: { canonical: `/${locale}/agents` } };
}

export default async function AgentsPage({ params }: PageProps<"/[locale]/agents">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead title={t.agents.title} lede={t.agents.lede} />
      <div className="bg-paper">
        <Shell className="grid gap-6 py-10 sm:grid-cols-2 md:py-16 xl:grid-cols-4">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} locale={locale} />
          ))}
        </Shell>
      </div>
    </>
  );
}
