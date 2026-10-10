import { profile } from "@/content/profile";

/**
 * Where each CV skill is evidenced (PRODUCT.md › Proof over claims). Only explicit CV facts:
 * - PRJ-0x: the project's stack lists it, or one of its CV bullets names it
 * - INT:    the internship bullets name it
 * - CERT:   a certification's title names it
 * - CV:     listed in the CV's skills only; shown as such, never given an invented source
 */
/** `href` points at the evidence on this page: the project sheet in Works, or the About timeline. */
export type Proof = { code: string; title: string; label: string; href?: string };

// Display names on the proof links: the CV name, cut to its distinctive word when it is too long
// for a chip (a truncation, never a new name), plus the catalog number: "ShareXe·02".
const SHORT: Record<string, string> = { "agricultural-traceability": "Traceability" };
const projectLabel = (p: { slug: string; name: string; code: string }) =>
  `${SHORT[p.slug] ?? p.name}·${p.code.slice(-2)}`;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Stack entries that name a skill under another spelling.
const ALIASES: Record<string, string[]> = {
  "rest apis": ["restful apis", "rest apis"],
  riverpod: ["bloc riverpod"],
  firebase: ["firebase", "firebase authentication"],
};

// Whole-phrase match on normalised text, so "swift" never matches "swiftui".
const mentions = (text: string, phrase: string) => ` ${norm(text)} `.includes(` ${phrase} `);

/** A project proves a skill when its stack lists it or one of its CV bullets names it. */
function projectProofs(skill: string): Proof[] {
  const key = norm(skill);
  const names = ALIASES[key] ?? [key];
  return profile.projects
    .filter(
      (p) =>
        p.stack.some((s) => names.includes(norm(s))) ||
        p.highlights.some((h) => names.some((n) => mentions(h, n))),
    )
    .map((p) => ({ code: p.code, title: p.name, label: projectLabel(p), href: `#prj-${p.slug}` }));
}

export function proofsFor(skill: string): Proof[] {
  const key = norm(skill);
  const out = projectProofs(skill);

  // Every project ships as a public GitHub repository.
  if (key === "git github") {
    out.push(
      ...profile.projects.map((p) => ({ code: p.code, title: `${p.name} repository`, label: projectLabel(p), href: `#prj-${p.slug}` })),
    );
  }
  const intern = profile.experience[0];
  if (intern.highlights.some((h) => mentions(h, key))) {
    out.push({ code: "INT", title: `${intern.role}, ${intern.orgEn}`, label: "INT", href: "#experience" });
  }
  for (const c of profile.certifications) {
    if (mentions(c.name, key)) out.push({ code: "CERT", title: c.name, label: "CERT", href: "#certifications" });
  }
  return out.length ? out : [{ code: "CV", title: "Listed in the CV", label: "CV" }];
}
