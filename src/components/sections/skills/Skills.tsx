import { JpLabel } from "@/components/brand/JpLabel";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { proofsFor } from "./skill-proof";
import { SkillsMotion } from "./SkillsMotion";

/**
 * Slab per CV skill group (DESIGN.md › Shapes: rounded slabs for full-colour blocks with no
 * controls; Surface Pairing for text colours). The order and spans compose a poster bento:
 * the Mobile slab is the red subject, cobalt and navy carry the cool field.
 */
const SLAB: Record<string, { surface: string; ink: string; code: string; span: string }> = {
  // tablets: a 2-column stack; desktops: the 12-column poster bento
  Mobile: { surface: "bg-signal-red", ink: "text-cream", code: "text-cream", span: "md:col-span-2 lg:col-span-7 lg:row-span-2" },
  "Backend & APIs": { surface: "bg-cobalt", ink: "text-cream", code: "text-amber", span: "lg:col-span-5" },
  Database: { surface: "bg-navy-ink", ink: "text-cream", code: "text-amber", span: "lg:col-span-5" },
  "State Management": { surface: "bg-amber", ink: "text-sumi", code: "text-sumi", span: "lg:col-span-3" },
  Tools: { surface: "bg-paper-grey", ink: "text-sumi", code: "text-cobalt", span: "lg:col-span-4" },
  Other: { surface: "bg-cream border-2 border-sumi", ink: "text-sumi", code: "text-signal-red", span: "md:col-span-2 lg:col-span-5" },
};

const ORDER = ["Mobile", "Backend & APIs", "Database", "State Management", "Tools", "Other"];

export function Skills() {
  const groups = ORDER.map((g) => profile.skills.find((s) => s.group === g)).filter((g) => g !== undefined);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t-2 border-sumi">
      <SkillsMotion>
        <div className="mx-auto w-full max-w-page px-gutter py-section-mobile lg:px-gutter-desktop lg:pt-24 lg:pb-section">
          <header className="mb-10 grid grid-cols-4 items-end gap-x-6 md:grid-cols-12">
            <div className="col-span-4 flex items-end justify-between gap-6 md:col-span-8">
              <div>
                <h2 id="skills-title" className="type-display">
                  Skills
                </h2>
                <p className="type-subtitle mt-3 text-sumi">
                  {String(total).padStart(2, "0")} TOOLS · {String(groups.length).padStart(2, "0")} GROUPS
                </p>
              </div>
              <span aria-hidden="true">
                <JpLabel label="skills" vertical showLatin={false} size={44} className="text-cobalt" />
              </span>
            </div>
            {/* legend: what the proof codes mean */}
            <dl className="type-label col-span-4 mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 md:col-span-4 md:mt-0 md:justify-self-end">
              <dt className="text-signal-red">NAME·0X</dt>
              <dd>USED IN PROJECT 0X</dd>
              <dt className="text-signal-red">INT</dt>
              <dd>INTERNSHIP</dd>
              <dt className="text-signal-red">CERT</dt>
              <dd>CERTIFICATION</dd>
              <dt className="text-signal-red">CV</dt>
              <dd>LISTED IN THE CV</dd>
            </dl>
          </header>

          <div data-bento className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12">
            {groups.map((g, gi) => {
              const s = SLAB[g.group];
              return (
                <article
                  key={g.group}
                  data-slab
                  aria-labelledby={`skill-${gi}`}
                  className={cn(
                    "relative isolate flex flex-col gap-6 overflow-hidden rounded-slab p-6 md:p-8",
                    s.surface,
                    s.ink,
                    s.span,
                  )}
                >
                  <header className="flex items-start justify-between gap-4">
                    <h3 id={`skill-${gi}`} className="type-label min-w-0">
                      № {String(gi + 1).padStart(2, "0")} · {g.group.toUpperCase()}
                    </h3>
                    {gi > 0 && (
                      <p aria-label={`${g.items.length} skills`} className="type-headline shrink-0 leading-none">
                        <span data-count>{String(g.items.length).padStart(2, "0")}</span>
                      </p>
                    )}
                  </header>
                  {gi === 0 && (
                    /* the red subject meets the blue: a big navy disc crossing the slab edge,
                       carrying the count as a giant numeral (style-nhat-ban-noi-loan's "01") */
                    <div aria-hidden="true" className="relative -mr-6 h-40 max-lg:order-last md:-mr-8 md:h-48 lg:h-auto lg:flex-1">
                      <span className="absolute top-1/2 -right-16 aspect-square h-[115%] -translate-y-1/2 rounded-full bg-navy-ink max-md:h-full" />
                      <span className="type-display absolute top-1/2 right-[12%] -translate-y-1/2 text-cream">
                        <span data-count>{String(g.items.length).padStart(2, "0")}</span>
                      </span>
                    </div>
                  )}
                  <ul className={cn("relative grid gap-x-8 gap-y-3", (gi === 0 || g.group === "Other") && "md:grid-cols-2")}>
                    {g.items.map((item) => {
                      const proofs = proofsFor(item);
                      return (
                        <li key={item} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/25 pb-2">
                          <span className="type-tab">{item}</span>
                          <span className={cn("type-label flex flex-wrap gap-x-3 tracking-[0.12em] normal-case", s.code)}>
                            {proofs.map((p, pi) => (
                              <span key={`${p.code}-${pi}`}>
                                {p.href ? (
                                  <a
                                    href={p.href}
                                    aria-label={p.code === "CERT" || p.code === "INT" ? `${p.code}: ${p.title}` : `Used in ${p.code} ${p.title}`}
                                    title={p.title}
                                    className="hit-area inline-flex min-h-6 items-center underline decoration-1 underline-offset-4 hover:decoration-2"
                                  >
                                    {p.label}
                                  </a>
                                ) : (
                                  <abbr title={p.title} className="no-underline">
                                    {p.label}
                                  </abbr>
                                )}
                              </span>
                            ))}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </SkillsMotion>
    </section>
  );
}
