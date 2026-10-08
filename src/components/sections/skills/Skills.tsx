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
  Mobile: { surface: "bg-signal-red", ink: "text-cream", code: "text-amber", span: "md:col-span-7 md:row-span-2" },
  "Backend & APIs": { surface: "bg-cobalt", ink: "text-cream", code: "text-amber", span: "md:col-span-5" },
  Database: { surface: "bg-navy-ink", ink: "text-cream", code: "text-amber", span: "md:col-span-5" },
  "State Management": { surface: "bg-amber", ink: "text-sumi", code: "text-sumi", span: "md:col-span-3" },
  Tools: { surface: "bg-paper-grey", ink: "text-sumi", code: "text-cobalt", span: "md:col-span-4" },
  Other: { surface: "bg-cream border-2 border-sumi", ink: "text-sumi", code: "text-signal-red", span: "md:col-span-5" },
};

const ORDER = ["Mobile", "Backend & APIs", "Database", "State Management", "Tools", "Other"];

export function Skills() {
  const groups = ORDER.map((g) => profile.skills.find((s) => s.group === g)).filter((g) => g !== undefined);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t-2 border-sumi">
      <SkillsMotion>
        <div className="mx-auto w-full max-w-page px-gutter py-section-mobile lg:px-gutter-desktop lg:py-section">
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
              <dt className="text-signal-red">PRJ-0X</dt>
              <dd>USED IN A PROJECT</dd>
              <dt className="text-signal-red">INT</dt>
              <dd>INTERNSHIP</dd>
              <dt className="text-signal-red">CERT</dt>
              <dd>CERTIFICATION</dd>
              <dt className="text-signal-red">CV</dt>
              <dd>LISTED IN THE CV</dd>
            </dl>
          </header>

          <div data-bento className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
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
                    <h3 id={`skill-${gi}`} className="type-label">
                      № {String(gi + 1).padStart(2, "0")} · {g.group.toUpperCase()}
                    </h3>
                    {gi > 0 && (
                      <p aria-label={`${g.items.length} skills`} className="type-headline leading-none">
                        <span data-count>{String(g.items.length).padStart(2, "0")}</span>
                      </p>
                    )}
                  </header>
                  {gi === 0 && (
                    /* the red subject meets the blue: a big navy disc crossing the slab edge,
                       carrying the count as a giant numeral (style-nhat-ban-noi-loan's "01") */
                    <div aria-hidden="true" className="relative -mr-6 h-56 md:-mr-8 md:h-auto md:flex-1">
                      <span className="absolute top-1/2 -right-16 aspect-square h-[115%] -translate-y-1/2 rounded-full bg-navy-ink max-md:h-full" />
                      <span className="type-display absolute top-1/2 right-[12%] -translate-y-1/2 text-cream">
                        <span data-count>{String(g.items.length).padStart(2, "0")}</span>
                      </span>
                    </div>
                  )}
                  <ul className={cn("relative grid gap-x-8 gap-y-3", gi === 0 && "md:grid-cols-2")}>
                    {g.items.map((item) => {
                      const proofs = proofsFor(item);
                      return (
                        <li key={item} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/25 pb-2">
                          <span className="type-tab">{item}</span>
                          <span className={cn("type-label tracking-[0.15em]", s.code)}>
                            {proofs.map((p, pi) => (
                              <abbr key={`${p.code}-${pi}`} title={p.title} className="no-underline">
                                {pi > 0 && " "}
                                {p.code}
                              </abbr>
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
