import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { Skills } from "@/components/sections/skills/Skills";
import { Works } from "@/components/sections/works/Works";

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
