import { JpLabel } from "@/components/brand/JpLabel";
import { formatPeriod, profile } from "@/content/profile";
import { WorksRail, type WorkItem } from "./WorksRail";

// Short, repository-style tab labels so the rotated tabs fit their stage (names stay full elsewhere).
const TAB: Record<string, string> = {
  "agricultural-traceability": "Agri Traceability",
};

const years = profile.projects
  .flatMap((p): string[] => ("end" in p.period ? [p.period.start, p.period.end] : [p.period.start]))
  .map((d) => Number(d.split("/")[1]));

/**
 * WORKS / 作品 · the four CV projects as a press run (see WorksRail).
 * Every fact comes from profile.ts; screenshots render as pending frames until provided.
 */
export function Works() {
  const items: WorkItem[] = profile.projects.map((p) => ({
    code: p.code,
    slug: p.slug,
    name: p.name,
    tab: TAB[p.slug] ?? p.name,
    purpose: p.purpose,
    period: formatPeriod(p.period),
    team: p.teamSize === 1 ? "Solo" : `${p.teamSize} people`,
    platform: p.platform,
    stack: p.stack,
    highlights: p.highlights,
    repo: p.repo,
    screenshot: p.screenshots?.[0] ?? null,
  }));

  return (
    <section id="works" aria-labelledby="works-title" className="relative border-t-2 border-sumi">
      <WorksRail
        items={items}
        header={
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 id="works-title" className="type-display">
                Works
              </h2>
              <p className="type-subtitle mt-3 text-sumi">
                {String(items.length).padStart(2, "0")} PROJECTS · {Math.min(...years)}—{Math.max(...years)}
              </p>
            </div>
            <span aria-hidden="true">
              <JpLabel label="works" vertical showLatin={false} size={44} className="text-signal-red" />
            </span>
          </div>
        }
      />
    </section>
  );
}
