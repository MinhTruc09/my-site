import { JpLabel } from "@/components/brand/JpLabel";
import { PlaceholderFrame } from "@/components/brand/PlaceholderFrame";
import type { JpLabelKey } from "@/components/brand/jp-glyphs";
import { Hero } from "@/components/sections/hero/Hero";
import { Skills } from "@/components/sections/skills/Skills";
import { Works } from "@/components/sections/works/Works";

// Sections after the hero are built next (step E); until then each anchor target is an
// honest, visibly pending block so the hero's nav and "VIEW WORKS" land somewhere real.
const PENDING: { id: string; label: JpLabelKey; title: string }[] = [
  { id: "about", label: "about", title: "About" },
  { id: "contact", label: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <Skills />
      {PENDING.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="border-t-2 border-sumi px-gutter py-section-mobile lg:px-gutter-desktop"
        >
          <div className="mx-auto max-w-page">
            <JpLabel label={s.label} />
            <h2 id={`${s.id}-title`} className="type-headline mt-3 mb-8">
              {s.title}
            </h2>
            <PlaceholderFrame label="SECTION PENDING" aspect="16 / 5" />
          </div>
        </section>
      ))}
    </main>
  );
}
