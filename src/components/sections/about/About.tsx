import { JpLabel } from "@/components/brand/JpLabel";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { AboutMotion } from "./AboutMotion";

const { education: edu, experience, certifications, languages, hobbies } = profile;
const intern = experience[0];

type Entry = {
  when: string;
  title: string;
  where?: string;
  /** Lang for `where`, e.g. the Vietnamese organisation name. */
  whereLang?: string;
  note?: string;
  bullets?: readonly string[];
  pipeline?: readonly string[];
  kind: "school" | "work" | "cert";
  /** Anchor target for links from the hero stub and Skills proof codes. */
  id?: string;
};

// Every line is a CV fact (PRODUCT.md › Evidence on Hand), in chronological order.
const TIMELINE: Entry[] = [
  { when: edu.period.start, title: "Enrolled", where: edu.school, note: edu.field, kind: "school" },
  { when: "2023", title: "Academic Scholarship", note: "First semester, 2023", kind: "school" },
  {
    when: `${intern.period.start} — ${intern.period.end}`,
    title: intern.role,
    where: intern.org,
    whereLang: "vi",
    note: intern.orgEn,
    bullets: intern.highlights,
    pipeline: ["FIGMA", "FLUTTERFLOW", "TESTING"],
    kind: "work",
    id: "experience",
  },
  {
    when: edu.period.end,
    title: "Graduated",
    where: edu.school,
    // the GPA is printed once, on the disc
    note: edu.honors[0],
    kind: "school",
  },
  ...certifications.map((c, i) => ({
    when: c.date,
    title: c.name,
    note: c.issuer,
    kind: "cert" as const,
    id: i === 0 ? "certifications" : undefined,
  })),
];

const KIND = {
  school: { tag: "EDU", dot: "bg-cobalt" },
  work: { tag: "WORK", dot: "bg-signal-red" },
  cert: { tag: "CERT", dot: "bg-amber" },
} as const;

// Keywords a recruiter scans for, highlighted inside the verbatim objective.
const KEYWORDS = ["Flutter", "Swift/SwiftUI", "Intern Mobile Developer"];
const OBJECTIVE = profile.objective
  .split(new RegExp(`(${KEYWORDS.join("|")})`))
  .filter(Boolean)
  .map((text) => ({ text, key: KEYWORDS.includes(text) }));

// Sticker tilt per hobby: fixed, so server and client agree and the set reads as hand-placed.
const TILT = [-4, 3, -2, 5, -3];
const STICKER = ["bg-signal-red text-cream", "bg-cream text-sumi", "bg-amber text-sumi", "bg-cobalt text-cream", "bg-navy-ink text-cream"];

/**
 * ABOUT / 概要 · the paper-tape timeline (education, internship, certifications) on the left;
 * on the right the GPA printed on a big cobalt disc, the language line and hobby stickers.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t-2 border-sumi">
      <AboutMotion>
        <div className="mx-auto w-full max-w-page px-gutter py-section-mobile lg:px-gutter-desktop lg:py-section">
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 md:grid-cols-12">
          {/* intro: heading + objective (left); the GPA disc now fills the opener's right half */}
          <div className="col-span-4 md:col-span-7 md:row-start-1">
          <header className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 id="about-title" className="type-display">
                About
              </h2>
              <p className="type-subtitle mt-3 text-sumi">IT · CLASS OF {edu.period.end}</p>
            </div>
            <span aria-hidden="true">
              <JpLabel label="about" vertical showLatin={false} size={44} className="text-signal-red" />
            </span>
          </header>

          {/* the CV objective, verbatim, as the section's opening statement */}
          <p data-lead className="type-lead max-w-[60ch] text-sumi md:text-balance">
            {OBJECTIVE.map((part, i) =>
              part.key ? (
                <strong key={i} className="font-bold whitespace-nowrap text-signal-red">
                  {part.text}
                </strong>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
          </div>

            {/* RIGHT on desktop (both rows, sticky), between intro and timeline on phones */}
            <aside
              data-aside
              aria-label="At a glance"
              className="col-span-4 self-start md:sticky md:top-20 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-cobalt" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-cream">
                  <p className="type-label">CUMULATIVE GPA</p>
                  <p className="type-display-vi leading-none">
                    <span data-decode>{edu.gpa.value}</span>
                  </p>
                  <p className="type-label mt-2">/ {edu.gpa.scale} · {edu.honors[0].replace("Graduated with ", "").toUpperCase()}</p>
                </div>
              </div>

              <dl className="mt-10 grid gap-6">
                <div>
                  <dt className="type-label text-cobalt">LANGUAGE</dt>
                  {languages.map((l) => (
                    <dd key={l.name} className="mt-2">
                      <span className="type-headline block">{l.name}</span>
                      <span className="type-body">{l.level}</span>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="type-label text-cobalt">OFF THE KEYBOARD</dt>
                  <dd className="mt-4">
                    <ul className="flex flex-wrap gap-3">
                      {hobbies.map((h, i) => (
                        <li
                          key={h}
                          data-sticker
                          className={cn(
                            "type-tab rounded-full border-2 border-sumi px-4 py-1.5",
                            STICKER[i % STICKER.length],
                          )}
                          style={{ rotate: `${TILT[i % TILT.length]}deg` }}
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>

            {/* LEFT: the paper tape */}
            <ol data-timeline className="relative col-span-4 md:col-span-7 md:row-start-2 lg:mt-10">
              <span data-rule aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-sumi" />
              {TIMELINE.map((e) => {
                const k = KIND[e.kind];
                return (
                  <li
                    key={`${e.when}-${e.title}`}
                    id={e.id}
                    data-entry
                    className="relative grid scroll-mt-24 gap-2 pb-10 pl-10 last:pb-0"
                  >
                    <span aria-hidden="true" className={cn("absolute top-1.5 left-0 size-3 outline-2 outline-sumi", k.dot)} />
                    <p className="type-label flex flex-wrap items-center gap-x-3">
                      <time className="text-signal-red">{e.when}</time>
                      <span className="bg-sumi px-1.5 py-0.5 text-cream">{k.tag}</span>
                    </p>
                    <h3 className="type-headline">{e.title}</h3>
                    {e.where && (
                      <p className="type-body" lang={e.whereLang}>
                        {e.where}
                      </p>
                    )}
                    {e.note && <p className="type-label text-cobalt">{e.note}</p>}
                    {e.pipeline && (
                      <p aria-label={`Workflow: ${e.pipeline.join(" to ")}`} className="type-label mt-2 flex flex-wrap items-center gap-2">
                        {e.pipeline.map((step, i) => (
                          <span key={step} className="flex items-center gap-2">
                            {i > 0 && (
                              <span aria-hidden="true" className="text-signal-red">
                                →
                              </span>
                            )}
                            <span className="border-2 border-sumi px-2 py-1">{step}</span>
                          </span>
                        ))}
                      </p>
                    )}
                    {e.bullets && (
                      <ul className="type-body mt-2 grid max-w-[65ch] gap-2">
                        {e.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span aria-hidden="true" className="text-signal-red">
                              ■
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </AboutMotion>
    </section>
  );
}
