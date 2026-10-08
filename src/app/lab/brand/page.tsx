import type { Metadata } from "next";
import { HankoSeal } from "@/components/brand/HankoSeal";
import { JpLabel } from "@/components/brand/JpLabel";
import { PhoneFrame } from "@/components/brand/PhoneFrame";
import { PlaceholderFrame } from "@/components/brand/PlaceholderFrame";
import { RefImage } from "@/components/brand/RefImage";
import { SwatchBand } from "@/components/brand/SwatchBand";
import { TerminalPanel } from "@/components/brand/TerminalPanel";
import { TrackListTabs } from "@/components/brand/TrackListTabs";
import { formatPeriod, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Brand Lab",
  robots: { index: false, follow: false },
};

function Specimen({ code, title, children }: { code: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-sumi px-gutter py-section-mobile lg:px-gutter-desktop">
      <p className="type-label">{code}</p>
      <h2 className="type-headline mt-2 mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function BrandLab() {
  const [first] = profile.projects;
  return (
    <main>
      <header className="flex items-start justify-between gap-6 px-gutter pt-6 pb-section-mobile lg:px-gutter-desktop">
        <div>
          <p className="type-label">№ LAB-02 / BRAND COMPONENTS</p>
          <h1 className="type-display-vi mt-6 text-signal-red" lang="vi">
            {profile.name.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="type-subtitle mt-4 text-cobalt">
            {profile.role} · {profile.coreStack.join(" · ")}
          </p>
        </div>
        <HankoSeal size={96} className="mt-10 max-md:hidden" />
      </header>

      <Specimen code="01 / SWATCH BAND" title="Hex codes as typography">
        <SwatchBand swatches={["cream", "cobalt", "navy-ink", "signal-red", "wine", "amber", "sumi"]} />
        <p className="type-label mt-6 mb-3">PLATE LABELS (INKS UNDER 4.5:1 FOR 12PX TEXT)</p>
        <SwatchBand swatches={["vermilion", "flame", "denki-cyan", { ink: "acid-screen", label: "SIGNAL" }]} />
      </Specimen>

      <Specimen code="02 / HANKO + JP LABELS" title="Seal and SVG outlines">
        <div className="flex flex-wrap items-center gap-10">
          <HankoSeal />
          <HankoSeal size={120} rotate={5} />
          <div className="flex flex-col gap-4">
            <JpLabel label="works" />
            <JpLabel label="about" />
            <JpLabel label="skills" />
            <JpLabel label="contact" />
          </div>
          <div className="flex gap-6 text-cobalt">
            <JpLabel label="works" vertical size={28} />
            <JpLabel label="contact" vertical size={28} showLatin={false} />
          </div>
        </div>
      </Specimen>

      <section className="border-t-2 border-sumi pt-section-mobile">
        <div className="px-gutter lg:px-gutter-desktop">
          <p className="type-label">03 / TRACK-LIST TABS</p>
          <h2 className="type-headline mt-2 mb-8">Projects as an equalizer</h2>
        </div>
        <TrackListTabs
          label="Projects"
          activeId={first.slug}
          tabs={profile.projects.map((p) => ({ id: p.slug, title: p.name, href: `#${p.slug}`, code: p.code }))}
        />
      </section>

      <Specimen code="04 / TERMINAL PANEL + PHONE FRAME" title="Project panels from profile.ts">
        <div className="grid gap-section-mobile">
          {profile.projects.map((p) => (
            <div key={p.slug} id={p.slug} className="grid scroll-mt-6 items-start gap-8 md:grid-cols-12">
              <TerminalPanel
                className="md:col-span-8"
                title={p.name.toUpperCase()}
                code={p.code}
                jp="works"
                specs={[
                  { label: "PURPOSE", value: p.purpose },
                  { label: "PERIOD", value: formatPeriod(p.period) },
                  { label: "TEAM", value: p.teamSize === 1 ? "Solo" : `${p.teamSize} people` },
                  { label: "STACK", value: p.stack.join(" · ") },
                ]}
                footer={[
                  p.platform.toUpperCase(),
                  `${p.highlights.length} HIGHLIGHTS`,
                  <a key="repo" href={p.repo.href} className="underline decoration-acid-screen decoration-2 underline-offset-4">
                    {p.repo.label.toUpperCase()} ↗
                  </a>,
                ]}
              >
                <ul className="grid gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden="true">■</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </TerminalPanel>
              <PhoneFrame className="md:col-span-4 md:justify-self-end" width={260} alt={`${p.name} screenshot`} />
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen code="05 / PLACEHOLDER + REF IMAGE" title="Honest gaps, temporary refs">
        <div className="grid gap-8 md:grid-cols-3">
          <PlaceholderFrame label="IMAGE PENDING" />
          <RefImage file="manga-cyperpunk.jpg" width={736} height={1040} alt="Reference placeholder" sizes="(min-width: 768px) 33vw, 100vw" />
          <RefImage file="missing-on-purpose.jpg" width={736} height={1040} alt="Reference placeholder" inks="acid" />
        </div>
      </Specimen>

      <section className="pt-section-mobile">
        <SwatchBand swatches={["cobalt", "navy-ink", "signal-red", "cream", "amber"]} />
      </section>
    </main>
  );
}
