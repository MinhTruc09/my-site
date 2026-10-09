type Props = {
  code: string;
  name: string;
  platform: string;
  stack: readonly string[];
};

/**
 * The pending-screenshot screen as a mini poster of the app, matching the hero phone's canvas
 * poster (owner decision, 2026-10-08): code tab, platform, the name in heavy red, three stack
 * items, a red sun over a cobalt halftone slab, the swatch band and `[ SCREENSHOT PENDING ]`.
 * Honest (no fake app UI), decorative: the sheet beside it carries the facts.
 */
export function PhonePoster({ code, name, platform, stack }: Props) {
  return (
    <div aria-hidden="true" className="relative flex h-full flex-col overflow-hidden bg-cream text-sumi [container-type:inline-size]">
      <div className="flex items-center justify-between px-[7cqi] pt-[14cqi]">
        <span className="bg-sumi px-[2.5cqi] py-[1cqi] font-mono text-[5cqi] font-medium tracking-[0.15em] text-cream">{code}</span>
        <span className="font-mono text-[4.5cqi] tracking-[0.15em] text-cobalt">{platform.toUpperCase()}</span>
      </div>
      <p className="mt-[8cqi] px-[7cqi] font-sans text-[15cqi] leading-[0.9] font-black text-signal-red uppercase [font-stretch:62%] [overflow-wrap:anywhere]">
        {name}
      </p>
      <ul className="mt-[6cqi] grid gap-[1.5cqi] px-[7cqi] font-mono text-[4.5cqi] tracking-[0.1em] uppercase">
        {stack.slice(0, 3).map((s) => (
          <li key={s}>■ {s}</li>
        ))}
      </ul>
      {/* sun over a halftone slab */}
      <div className="relative mt-auto h-[45%]">
        <div
          className="absolute inset-x-0 top-[22%] bottom-[14%]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-cobalt) 36%, transparent 40%)",
            backgroundSize: "5cqi 5cqi",
          }}
        />
        <span className="absolute top-[4%] right-[14%] aspect-square w-[46%] rounded-full bg-signal-red mix-blend-multiply" />
        <span className="absolute bottom-[18%] left-1/2 -translate-x-1/2 bg-sumi px-[2.5cqi] py-[1cqi] font-mono text-[4cqi] tracking-[0.12em] whitespace-nowrap text-amber">
          [ SCREENSHOT PENDING ]
        </span>
        <div className="absolute inset-x-0 bottom-0 flex h-[14%]">
          <span className="flex-1 bg-cobalt" />
          <span className="flex-1 bg-navy-ink" />
          <span className="flex-1 bg-signal-red" />
          <span className="flex-1 bg-cream" />
          <span className="flex-1 bg-amber" />
        </div>
      </div>
    </div>
  );
}
