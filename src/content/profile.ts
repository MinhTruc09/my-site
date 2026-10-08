/**
 * The single typed source for all CV content (CLAUDE.md › Content and honesty).
 * Every fact here comes from NguyenMinhTruc_CV_MobileDeveloperIntern.pdf via
 * PRODUCT.md › Evidence on Hand. Do not add facts that are not in the CV.
 * Missing assets are `null` and render as placeholder frames.
 */

/** "MM/YYYY", exactly as written in the CV. */
export type MonthYear = `${number}/${number}`;

export type Period = { start: MonthYear; end?: MonthYear };

export type Link = { label: string; href: string };

export type Project = {
  /** Catalog number shown in label voice, newest first. */
  code: `PRJ-${string}`;
  slug: string;
  name: string;
  /** One-line purpose, paraphrased from the CV heading. */
  purpose: string;
  period: Period;
  teamSize: number;
  platform: "Flutter" | "SwiftUI";
  stack: readonly string[];
  /** Bullet points as written in the CV. */
  highlights: readonly string[];
  repo: Link;
  /** App screenshots from the simulator (public/screens/<slug>/…); null until provided. */
  screenshots: readonly string[] | null;
};

export type Experience = {
  role: string;
  org: string;
  /** English name of the organisation, for readers who do not read Vietnamese. */
  orgEn: string;
  period: Period;
  highlights: readonly string[];
};

export type Contact = {
  kind: "email" | "phone" | "github" | "linkedin";
  /** Visible text in label voice. */
  label: string;
  href: string;
  external: boolean;
};

export const profile = {
  name: {
    /** Always rendered inside a lang="vi" element with the type-display-vi token. */
    vi: "Nguyễn Minh Trực",
    /** One word per line at display size (DESIGN.md › The Diacritic Rule). */
    lines: ["Nguyễn", "Minh", "Trực"],
    handle: "MinhTruc09",
  },
  /** Year only (owner request, 2026-10-08). The full birth date is never published. */
  birthYear: 2004,
  role: "Mobile Developer",
  /** The role the CV applies for. */
  seeking: "Intern Mobile Developer",
  coreStack: ["Flutter", "SwiftUI"],
  location: "Ho Chi Minh City, Viet Nam",
  objective:
    "IT graduate with hands-on experience in mobile development using Flutter and Swift/SwiftUI, with skills in UI development, RESTful API integration, debugging, and functional testing. Seeking an Intern Mobile Developer position to contribute to real-world projects while further developing my iOS and mobile development skills.",

  contacts: [
    { kind: "email", label: "nminhtruc0910@gmail.com", href: "mailto:nminhtruc0910@gmail.com", external: false },
    // Published by owner decision (2026-10-08). Contact stub only; never in metadata or OG images.
    { kind: "phone", label: "+84 384 548 931", href: "tel:+84384548931", external: false },
    { kind: "github", label: "github.com/MinhTruc09", href: "https://github.com/MinhTruc09", external: true },
    {
      kind: "linkedin",
      label: "linkedin.com/in/nguyen-minh-truc-aa1a99336",
      href: "https://www.linkedin.com/in/nguyen-minh-truc-aa1a99336",
      external: true,
    },
  ],

  /** Redacted CV (birth date and gender removed). null until the owner provides the file. */
  cv: null as { href: string } | null,

  projects: [
    {
      code: "PRJ-01",
      slug: "swiftui-movie",
      name: "SwiftUI Movie",
      purpose: "Native iOS movie discovery app",
      period: { start: "9/2026" },
      teamSize: 1,
      platform: "SwiftUI",
      stack: ["Swift", "SwiftUI", "SwiftData", "REST APIs", "Xcode"],
      highlights: [
        "Developed a native iOS movie discovery app using SwiftUI with movie/TV search and detail views.",
        "Integrated REST APIs for trending, upcoming, and search results with asynchronous data loading.",
        "Implemented debounced search, navigation, loading/error states, reusable components, and SwiftData for local persistence.",
      ],
      repo: { label: "github.com/MinhTruc09/swiftui-movie", href: "https://github.com/MinhTruc09/swiftui-movie" },
      screenshots: null,
    },
    {
      code: "PRJ-02",
      slug: "sharexe",
      name: "ShareXe",
      purpose: "Carpooling mobile application",
      period: { start: "12/2024", end: "8/2025" },
      teamSize: 2,
      platform: "Flutter",
      stack: ["Flutter", "Dart", "BLoC/Riverpod", "Google Maps API", "Socket.io", "Node.js", "MongoDB", "Firebase"],
      highlights: [
        "Developed the Passenger App UI/UX using Flutter for a cross-platform carpooling platform.",
        "Integrated Google Maps API for location tracking and route navigation, and Socket.io for real-time messaging.",
        "Integrated RESTful APIs and collaborated with the backend to synchronize application data.",
      ],
      repo: { label: "github.com/MinhTruc09/ShareXe", href: "https://github.com/MinhTruc09/ShareXe" },
      screenshots: null,
    },
    {
      code: "PRJ-03",
      slug: "agricultural-traceability",
      name: "Agricultural Product Traceability",
      purpose: "Cross-platform traceability app for agricultural products",
      period: { start: "3/2025", end: "7/2025" },
      teamSize: 2,
      platform: "Flutter",
      stack: ["Flutter", "Solidity", "AI APIs", "Dio", "Node.js", "MySQL"],
      highlights: [
        "Developed a cross-platform Flutter application for agricultural product traceability.",
        "Integrated RESTful APIs using Dio and AI APIs for agricultural product image recognition.",
        "Integrated Blockchain-based traceability records using Solidity.",
      ],
      repo: {
        label: "github.com/MinhTruc09/Agricultural-Traceability",
        href: "https://github.com/MinhTruc09/Agricultural-Traceability",
      },
      screenshots: null,
    },
    {
      code: "PRJ-04",
      slug: "movieom",
      name: "Movieom",
      purpose: "Movie streaming application",
      period: { start: "12/2023", end: "2/2024" },
      teamSize: 3,
      platform: "Flutter",
      stack: ["Flutter", "Chewie Video Player", "RESTful APIs", "Firebase Authentication", "Cloud Firestore"],
      highlights: [
        "Developed a cross-platform movie streaming application for browsing and online video playback.",
        "Integrated RESTful APIs for movie data and Chewie Video Player for video streaming.",
        "Implemented Firebase Authentication and Cloud Firestore for user authentication and favorite movie management.",
      ],
      repo: { label: "github.com/MinhTruc09/LTD", href: "https://github.com/MinhTruc09/LTD" },
      screenshots: null,
    },
  ],

  experience: [
    {
      role: "Intern Mobile Developer",
      org: "Trung tâm Chuyển đổi số tỉnh Tây Ninh",
      orgEn: "Tay Ninh Digital Transformation Center",
      period: { start: "7/2025", end: "12/2025" },
      highlights: [
        "Redesigned the complete UI/UX in Figma for two key projects: the Slaughterhouse Management System and the ICT Document Management System, standardizing internal user workflows and improving usability.",
        "Transformed static Figma designs into fully interactive application interfaces using FlutterFlow, managing the entire process from UI implementation to functional testing.",
        "Developed standalone application prototypes to validate new features, significantly reducing demo preparation time and accelerating requirement validation with the management team.",
      ],
    },
  ],

  education: {
    school: "University of Transport Ho Chi Minh City",
    field: "Information Technology",
    period: { start: "2022", end: "2026" } as { start: string; end: string },
    gpa: { value: "3.30", scale: "4.00" },
    honors: ["Graduated with Good Classification", "Academic Scholarship (First Semester, 2023)"],
  },

  certifications: [
    { name: "Foundations of User Experience (UX) Design", issuer: "Google Learning Program", date: "7/2026" },
    { name: "CS50's Web Programming with Python and JavaScript", issuer: "CS50", date: "10/2026" },
  ],

  skills: [
    { group: "Mobile", items: ["Flutter", "Dart", "Swift", "SwiftUI", "Kotlin"] },
    { group: "State Management", items: ["Riverpod"] },
    { group: "Backend & APIs", items: ["REST APIs", "Dio", "Firebase", "Node.js"] },
    { group: "Database", items: ["MySQL", "MongoDB", "SwiftData", "Cloud Firestore"] },
    { group: "Tools", items: ["Git/GitHub", "Figma", "Swagger", "Xcode"] },
    { group: "Other", items: ["Python", "Django", "Java", "HTML/CSS", "JavaScript", "Prompt Engineering (intermediate)"] },
  ],

  languages: [{ name: "English", level: "Intermediate (approx. IELTS 6.0), strong technical reading" }],

  hobbies: ["Music", "Guitar", "Gym", "Chess", "Reading"],
} as const satisfies {
  projects: readonly Project[];
  experience: readonly Experience[];
  contacts: readonly Contact[];
  [key: string]: unknown;
};

export type Profile = typeof profile;

/** "12/2024 — 8/2025", or a single month for one-month projects. */
export function formatPeriod({ start, end }: { start: string; end?: string }) {
  return end ? `${start} — ${end}` : start;
}
