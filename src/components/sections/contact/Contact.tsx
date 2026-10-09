import Image from "next/image";
import { JpLabel } from "@/components/brand/JpLabel";
import { SwatchBand } from "@/components/brand/SwatchBand";
import { Wordmark } from "@/components/brand/Wordmark";
import { profile } from "@/content/profile";
import { BackToTop, ContactMotion, CopyEmail, LocalTime } from "./ContactBits";
import stamp from "./stamp-saigon.webp";

const LABEL = { phone: "PHONE", github: "GITHUB", linkedin: "LINKEDIN", email: "EMAIL" } as const;

/**
 * CONTACT / 連絡 · the stub below the ✂ cut line, on the navy surface (cream text, amber
 * accents; never red text on navy — DESIGN.md › Surface Pairing). The email is the primary
 * action; phone, GitHub and LinkedIn are ticket rows. Ends the page with the swatch band.
 */
export function Contact() {
  const email = profile.contacts.find((c) => c.kind === "email")!;
  const rows = profile.contacts.filter((c) => c.kind !== "email");
  const year = Number(profile.education.period.end);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-navy-ink text-cream [--ring:var(--color-acid-screen)]"
    >
      <ContactMotion>
        {/* the coupon cut line */}
        <div data-cut aria-hidden="true" className="relative mx-auto flex h-12 max-w-page items-center px-gutter lg:px-gutter-desktop">
          <span data-cut-line className="h-0 flex-1 border-t-2 border-dashed border-cream" />
          <svg
            data-scissors
            viewBox="0 0 24 24"
            className="absolute right-gutter size-7 -scale-x-100 bg-navy-ink text-amber lg:right-gutter-desktop"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M8.5 7.5 20 18M8.5 16.5 20 6" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-page px-gutter pt-section-mobile pb-16 lg:px-gutter-desktop lg:pt-24">
          <header className="flex items-end justify-between gap-6 md:w-2/3">
            <div>
              <h2 id="contact-title" className="type-display">
                Contact
              </h2>
              <p className="type-subtitle mt-3">
                SEEKING · <span className="text-amber">{profile.seeking.toUpperCase()}</span>
              </p>
            </div>
            {/* "CONTACT" fills a phone's width on its own, so the vertical label shows from tablets up */}
            <span aria-hidden="true" className="max-md:hidden">
              <JpLabel label="contact" vertical showLatin={false} size={44} className="text-amber" />
            </span>
          </header>

          <div className="mt-14 grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-12">
            {/* primary: the email */}
            <div className="col-span-4 md:col-span-8">
              <p className="type-label text-amber">WRITE TO</p>
              <a
                id="contact-email"
                href={email.href}
                className="type-headline mt-3 block normal-case [overflow-wrap:anywhere] underline decoration-amber decoration-2 underline-offset-8 hover:bg-amber hover:text-sumi md:break-normal"
              >
                {email.label.split("@")[0]}@<wbr />{email.label.split("@")[1]}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <CopyEmail email={email.label} targetId="contact-email" />
                {profile.cv && (
                  <a
                    href={profile.cv.href}
                    download
                    className="type-label inline-flex min-h-tap items-center gap-2 border-2 border-amber bg-amber px-4 text-sumi transition-colors duration-120 ease-[steps(2)] hover:border-cream hover:bg-cream"
                  >
                    DOWNLOAD CV
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M12 4v15M5 12l7 7 7-7" />
                    </svg>
                  </a>
                )}
              </div>

              {/* the stub rows */}
              <ul className="mt-12 border-t-2 border-cream">
                {rows.map((c) => (
                  <li key={c.kind} data-row className="border-b border-cream/40">
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group grid min-h-tap grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-4 transition-colors duration-120 ease-[steps(2)] hover:bg-cream hover:text-navy-ink md:grid-cols-[9rem_1fr_auto] md:px-3"
                    >
                      <span className="type-label text-amber group-hover:text-cobalt">{LABEL[c.kind]}</span>
                      <span className="type-body min-w-0 [overflow-wrap:anywhere]">
                        <span className="max-md:hidden">{c.label}</span>
                        <span className="md:hidden">{c.label.replace(/^(github|linkedin)\.com\//, "")}</span>
                      </span>
                      <span aria-hidden="true" className="type-label">
                        {c.external ? "↗" : "→"}
                      </span>
                      {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>

              {/* where and when */}
              <dl className="type-label mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-amber">BASED IN</dt>
                  <dd className="mt-2">{profile.location.toUpperCase()}</dd>
                </div>
                <div>
                  <dt className="text-amber">LOCAL TIME</dt>
                  <dd className="type-headline mt-2">
                    <LocalTime />
                  </dd>
                  <dd className="mt-1">GMT+7</dd>
                </div>
                <div>
                  <dt className="text-amber">HANDLE</dt>
                  <dd className="mt-2">№ {profile.name.handle.toUpperCase()}</dd>
                </div>
              </dl>
            </div>

            {/* aside: the stamp */}
            <div className="col-span-4 md:col-span-3 md:col-start-10">
              {/* original code print (src/components/art/stamp), posted like a stamp */}
              <figure data-stamp className="w-full max-w-72 -rotate-3 max-md:mx-auto md:mt-2">
                <Image
                  src={stamp}
                  alt="Halftone print in cobalt and navy: Saigon towers seen from below, a pale sun between them, a flyover cutting across."
                  sizes="288px"
                  className="h-auto w-full drop-shadow-[6px_6px_0_var(--color-cobalt)]"
                />
                <figcaption className="type-label mt-4 text-amber">SAIGON · LOOKING UP</figcaption>
              </figure>

            </div>
          </div>

          {/* the sticker lockup, after the poster's stub: pill mark + certification micro-copy */}
          <div className="mt-20 flex flex-col items-center gap-4 text-center">
            <Wordmark size="lg" className="text-cream" />
            <p className="font-sans font-black tracking-tight uppercase">
              This is a certified print-run portfolio
              <span className="block text-sm font-bold">
                {profile.name.handle.toUpperCase()} &ldquo;PRINT RUN&rdquo; EDITION · {year}
              </span>
            </p>
          </div>

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-cream/40 pt-6">
            <p className="type-label">
              © {year} <span lang="vi">{profile.name.vi.toUpperCase()}</span> · SET IN ARCHIVO &amp; IBM PLEX MONO
            </p>
            <BackToTop />
          </footer>
        </div>

        <SwatchBand swatches={["cobalt", "navy-ink", "signal-red", "cream", "amber"]} heightClassName="h-14 md:h-16" className="border-t border-cream/40" />
      </ContactMotion>
    </section>
  );
}
