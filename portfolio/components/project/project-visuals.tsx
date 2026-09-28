import type { ComponentType } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { getDict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./frames";
import { VeloraDesktop, VeloraMobile } from "./previews/velora";
import { NovaDesktop, NovaMobile } from "./previews/nova";
import { FlowfinDashboard, FlowfinTransactions } from "./previews/flowfin";
import { OrbitDesktop, OrbitMobile } from "./previews/orbit";

type VisualSet = {
  url: string;
  desktop?: ComponentType;
  mobile: { component: ComponentType; label: string; tone: "dark" | "light" }[];
};

/** Registry of coded interface previews, keyed by `project.visual`. */
export const visuals: Record<Project["visual"], VisualSet> = {
  velora: {
    url: "velora-estates.app",
    desktop: VeloraDesktop,
    mobile: [{ component: VeloraMobile, label: "Mobile search & listings", tone: "light" }],
  },
  nova: {
    url: "nova-commerce.shop",
    desktop: NovaDesktop,
    mobile: [{ component: NovaMobile, label: "Mobile product page", tone: "light" }],
  },
  flowfin: {
    url: "flowfin.app",
    mobile: [
      { component: FlowfinDashboard, label: "Dashboard", tone: "dark" },
      { component: FlowfinTransactions, label: "Activity", tone: "dark" },
    ],
  },
  orbit: {
    url: "app.orbit.team",
    desktop: OrbitDesktop,
    mobile: [{ component: OrbitMobile, label: "Mobile overview", tone: "light" }],
  },
};

/**
 * The large visual used on project cards and the case-study hero.
 * Uses the project's thumbnail image when one is configured, otherwise
 * composes its coded previews inside device frames.
 */
export function ProjectCover({ project, locale, priority, className }: { project: Project; locale: Locale; priority?: boolean; className?: string }) {
  const set = visuals[project.visual];
  const Desktop = set.desktop;
  const FirstMobile = set.mobile[0].component;

  return (
    <div className={cn("relative aspect-[16/11] overflow-hidden bg-bg-2", className)}>
      <div aria-hidden className="hairline-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {project.thumbnail ? (
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : Desktop ? (
        <>
          <div className="absolute left-[7%] top-[10%] w-[80%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5">
            <BrowserFrame url={set.url}>
              <Desktop />
            </BrowserFrame>
          </div>
          <div className="absolute bottom-[-18%] right-[5%] w-[22%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-3">
            <PhoneFrame tone={set.mobile[0].tone}>
              <FirstMobile />
            </PhoneFrame>
          </div>
        </>
      ) : (
        <div className="absolute inset-x-0 top-[9%] flex justify-center gap-[5%]">
          {set.mobile.slice(0, 2).map(({ component: M, label, tone }, i) => (
            <div
              key={label}
              className={cn(
                "w-[29%] transition-transform duration-700 ease-out-expo",
                i === 0 ? "group-hover:-translate-y-2" : "mt-[8%] group-hover:-translate-y-4",
              )}
            >
              <PhoneFrame tone={tone}>
                <M />
              </PhoneFrame>
            </div>
          ))}
        </div>
      )}
      <span className="sr-only">{getDict(locale).work.preview(project.name)}</span>
    </div>
  );
}
