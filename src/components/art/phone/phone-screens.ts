import { profile } from "@/content/profile";

export type PhoneScreen = {
  code: string;
  name: string;
  platform: string;
  /** First three stack items, for the placeholder poster. */
  stack: readonly string[];
  /** First real screenshot of the app, or null → placeholder screen. */
  src: string | null;
};

// The phone cycles through the four CV projects in catalog order (PRJ-01 → PRJ-04).
export const PHONE_SCREENS: readonly PhoneScreen[] = profile.projects.map((p) => ({
  code: p.code,
  name: p.name,
  platform: p.platform,
  stack: p.stack.slice(0, 3),
  src: p.screenshots?.[0] ?? null,
}));

/** iPhone simulator screen ratio (width / height). */
export const SCREEN_ASPECT = 9 / 19.5;
