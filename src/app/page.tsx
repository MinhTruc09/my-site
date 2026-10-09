import { SiteNav } from "@/components/brand/SiteNav";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { Skills } from "@/components/sections/skills/Skills";
import { Works } from "@/components/sections/works/Works";

export default function Home() {
  return (
    <>
      <a
        href="#works"
        className="type-label sr-only z-(--z-overlay) bg-sumi px-4 py-3 text-cream focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to projects
      </a>
      <SiteNav />
      <main id="top">
        <Hero />
        <Works />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
