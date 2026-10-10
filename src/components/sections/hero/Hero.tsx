import { getImageProps } from "next/image";
import { HalftoneField } from "@/components/art/halftone/HalftoneField";
import { ActionLink } from "@/components/brand/ActionLink";
import { HankoSeal } from "@/components/brand/HankoSeal";
import { Wordmark } from "@/components/brand/Wordmark";
import { SwatchBand } from "@/components/brand/SwatchBand";
import { profile } from "@/content/profile";
import { HeroIntro } from "./HeroIntro";
import { HeroPhone } from "./HeroPhone";
import bgDesktop from "./hero-bg-desktop.webp";
import bgMobile from "./hero-bg-mobile.webp";

const NAV = [
  { href: "#works", label: "WORKS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
] as const;

const { education: edu } = profile;

// Ticket stub rows: every value is a CV fact (PRODUCT.md › Evidence on Hand).
const intern = profile.experience[0];
const STUB: readonly { label: string; value: string; href?: string }[] = [
  { label: "BORN", value: `${profile.birthYear} · ${profile.location.split(",")[0].toUpperCase()}` },
  { label: "SCHOOL", value: "UNIVERSITY OF TRANSPORT HCMC" },
  { label: "MAJOR", value: `${edu.field.toUpperCase()} · ${edu.period.start}—${edu.period.end}` },
  // the strongest proof, one tap from the hero (critique 2026-10-09); opens the About timeline entry
  {
    label: "EXPERIENCE",
    value: `${intern.role.toUpperCase()} · ${intern.period.start.split("/")[1]}`,
    href: "#experience",
  },
];

// Where the name's stripe cuts sit (fraction of the line box) and which line gets a speed bar.
const CUTS = [0.58, 0.5, 0.62];

/**
 * No-WebGL fallback: finished frames of the oil shader itself (captured from the live hero with
 * everything else hidden, 1440×900 and 390×844), so the hero looks the same without a GPU.
 */
function HeroPrintFallback() {
  const common = { alt: "", priority: true, sizes: "100vw" } as const;
  const { props: desktop } = getImageProps({ ...common, src: bgDesktop });
  const { props: mobile } = getImageProps({ ...common, src: bgMobile });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img
        {...mobile}
        alt=""
        className="absolute inset-0 size-full object-cover object-top"
      />
    </picture>
  );
}

/**
 * HERO · Print Run. A poster on cream stock: a full-bleed moving halftone (GPU) is the whole
 * hero's background, the sun centred behind the turning phone and the type knocked out to bare
 * stock; name, role and actions on the left, the swatch band along the foot.
 * 5-Second Rule: name, role, stack and the primary action are in the first viewport
 * at 375×667 and 1440×900, with no animation gating them.
 */
export function Hero() {
  const email = profile.contacts.find((c) => c.kind === "email")!;
  const cv = profile.cv;

  return (
    <section aria-labelledby="hero-name" className="relative isolate flex min-h-svh flex-col overflow-x-clip">
      {/* the Fever "oil" wash runs behind the name (data-oil-anchor) and simply sits under all the type */}
      <HalftoneField fallback={<HeroPrintFallback />} />
      <HeroIntro>
        {/* corner metadata + slash nav */}
        <header className="flex flex-wrap items-center justify-between gap-x-6 px-gutter pt-3 lg:px-gutter-desktop">
          <p className="flex min-h-tap items-center text-sumi">
            <span className="sr-only">Handle: </span>
            <Wordmark />
          </p>
          <nav aria-label="Sections" className="max-md:-mx-gutter max-md:w-[calc(100%+2*var(--spacing-gutter))] max-md:overflow-x-auto">
            <ul className="type-label flex items-center max-md:px-gutter max-md:tracking-[0.2em]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="flex min-h-tap items-center px-2 whitespace-nowrap underline-offset-[6px] hover:underline hover:decoration-signal-red hover:decoration-2"
                  >
                    <span aria-hidden="true" className="mr-2">/</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mx-auto grid w-full max-w-page flex-1 grid-cols-4 grid-rows-[auto_1fr] gap-x-6 px-gutter pt-6 md:grid-cols-12 lg:px-gutter-desktop lg:pt-4">
          {/* LEFT: name, role, actions, stub */}
          <div className="relative z-(--z-subject) col-span-4 flex flex-col md:col-span-7 md:row-start-1">
            <h1 id="hero-name" lang="vi" data-oil-anchor className="type-display-vi text-signal-red">
              {profile.name.lines.map((line, i) => {
                // FEVER stripe cut: a real gap masked out of the letters, so the oil shows through.
                // The masked box is padded 0.4em above and 0.25em below (and pulled back with negative
                // margins) so stacked marks like the tilde on Ễ and the dot under Ự stay inside it.
                const cut = `calc(0.4em + ${CUTS[i] * 1.05}em)`;
                return (
                  <span key={line} className="relative flow-root w-fit">
                    <span
                      className="-mt-[0.4em] -mb-[0.25em] block pt-[0.4em] pb-[0.25em]"
                      style={{
                        maskImage: `linear-gradient(to bottom, var(--color-sumi) calc(${cut} - 0.035em), transparent 0 calc(${cut} + 0.035em), var(--color-sumi) 0)`,
                      }}
                    >
                      {line}
                    </span>
                    {i === 1 && (
                      /* speed bar: the cut on MINH runs on past the word in vermilion */
                      <span
                        data-cut
                        aria-hidden="true"
                        className="absolute left-full h-[0.07em] w-[1.6em] bg-vermilion max-md:w-[0.8em]"
                        style={{ top: `calc(${CUTS[i] * 1.05}em - 0.035em)` }}
                      />
                    )}
                    {/* the trailing space keeps the accessible name "Nguyễn Minh Trực", not one word */}
                    {i < profile.name.lines.length - 1 && " "}
                  </span>
                );
              })}
            </h1>

            <p className="type-subtitle mt-4 w-fit text-sumi max-md:text-base max-md:tracking-[0.25em]">
              {profile.role.toUpperCase()}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {profile.coreStack.join(" · ").toUpperCase()}
            </p>

            <div className="mt-6 flex w-fit flex-wrap gap-3">
              {cv ? (
                <>
                  <ActionLink href={cv.href} download arrow="down">
                    DOWNLOAD CV
                  </ActionLink>
                  <ActionLink href={email.href} variant="ghost">
                    EMAIL ME
                  </ActionLink>
                </>
              ) : (
                <>
                  <ActionLink href={email.href}>EMAIL ME</ActionLink>
                  <ActionLink href="#works" variant="ghost" arrow="down">
                    VIEW WORKS
                  </ActionLink>
                </>
              )}
            </div>

          </div>

          {/* ticket stub */}
          <dl className="type-label max-md:tracking-[0.12em] relative z-(--z-subject) col-span-4 mt-10 grid w-full max-w-[34rem] grid-cols-[auto_1fr] self-start border-2 border-l-0 border-sumi bg-cream max-md:order-3 max-md:mt-8 md:col-span-7 md:row-start-2 md:mt-8">
            {/* perforated edge */}
            <span aria-hidden="true" className="absolute inset-y-[-2px] left-0 border-l-2 border-dashed border-sumi" />
            {STUB.map((row) => (
              <div key={row.label} className="contents">
                <dt className="border-b border-sumi py-2 pr-4 pl-4 text-cobalt">{row.label}</dt>
                <dd className="border-b border-sumi py-2 pr-4">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="hit-area underline decoration-signal-red decoration-2 underline-offset-4 hover:bg-signal-red hover:text-cream"
                    >
                      <span data-decode>{row.value}</span> <span aria-hidden="true">↓</span>
                    </a>
                  ) : (
                    <span data-decode>{row.value}</span>
                  )}
                </dd>
              </div>
            ))}
            <dt className="py-2 pr-4 pl-4 text-cobalt">SEEKING</dt>
            <dd className="flex items-center gap-2 py-2 pr-4">
              <span aria-hidden="true" className="size-2.5 shrink-0 bg-amber outline outline-1 outline-sumi" />
              <span data-decode>{profile.seeking.toUpperCase()}</span>
            </dd>
          </dl>

          {/* RIGHT: the turning phone, standing on its own; the sun centres on it */}
          <div className="relative col-span-4 mt-4 h-[46svh] max-md:order-2 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:mt-0 md:h-auto md:min-h-[32rem]">
            <HeroPhone className="absolute inset-x-0 top-0 -bottom-12 z-(--z-subject) md:-bottom-16" />
          </div>
        </div>

        {/* foot: swatch band with the seal stamped across its top edge */}
        <div className="relative mt-10 md:mt-4">
          <SwatchBand swatches={["cobalt", "navy-ink", "signal-red", "cream", "amber"]} heightClassName="h-14 md:h-16" />
          <div
            data-seal
            className="absolute -top-14 right-gutter z-(--z-sticker) lg:right-gutter-desktop max-md:-top-10"
          >
            <HankoSeal size={72} rotate={-6} className="max-md:size-14" />
          </div>
        </div>
      </HeroIntro>
    </section>
  );
}
