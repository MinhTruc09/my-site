import { cn } from "@/lib/utils";
import { JpLabel } from "./JpLabel";
import type { JpLabelKey } from "./jp-glyphs";

type Spec = { label: string; value: React.ReactNode };

type Props = {
  /** Header after the slash, e.g. "SHAREXE". */
  title: string;
  /** Catalog code in the header's right corner, e.g. "PRJ-02". */
  code?: string;
  /** Optional bilingual SVG label next to the title. */
  jp?: JpLabelKey;
  /** Bordered spec list (stack, team size, dates…), rendered as a <dl>. */
  specs?: readonly Spec[];
  /** Up to three footer cells (DESIGN.md: a 3-cell footer row). The last cell takes the remaining width (repo links). */
  footer?: readonly React.ReactNode[];
  /** Heading level for the title, so panels fit the page outline. */
  headingLevel?: 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
};

// "Product card as terminal" (design-refs/02): sumi ground in the terminal register,
// `/TITLE` header, bordered spec list, optional 3-cell footer. Used for project details.
export function TerminalPanel({
  title,
  code,
  jp,
  specs,
  footer,
  headingLevel = 3,
  children,
  className,
}: Props) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article
      data-register="terminal"
      className={cn("border border-cream bg-background text-foreground", className)}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-cream px-4 py-3 md:px-6">
        <Heading className="type-headline min-w-0 [overflow-wrap:anywhere]">
          <span aria-hidden="true">/&nbsp;</span>
          {title}
          {jp && <JpLabel label={jp} showLatin={false} size={20} className="ml-3 align-middle" />}
        </Heading>
        {code && <span className="type-label shrink-0 text-acid-screen">{code}</span>}
      </header>

      {children && <div className="type-body border-b border-cream px-4 py-4 md:px-6">{children}</div>}

      {specs && specs.length > 0 && (
        <dl className="grid gap-px bg-cream sm:grid-cols-[minmax(8rem,auto)_1fr]">
          {specs.map((s) => (
            <div key={s.label} className="contents">
              <dt className="type-label bg-background px-4 py-3 text-paper-grey md:px-6">{s.label}</dt>
              <dd className="type-body bg-background px-4 pb-3 sm:py-3 md:px-6">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {footer && footer.length > 0 && (
        <footer className="grid grid-cols-1 gap-px border-t border-cream bg-cream sm:grid-cols-[auto_auto_1fr]">
          {footer.slice(0, 3).map((cell, i) => (
            <div key={i} className="type-label bg-background px-4 py-3 [overflow-wrap:anywhere] md:px-6">
              {cell}
            </div>
          ))}
        </footer>
      )}
    </article>
  );
}
