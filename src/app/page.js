import SmoothScroll from "./components/SmoothScroll";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PhilosophySection from "./components/PhilosophySection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import BehindScenes from "./components/BehindScenes";
import ProcessSection from "./components/ProcessSection";
import Testimonials from "./components/Testimonials";
import NumbersSection from "./components/NumbersSection";
import TechPlayground from "./components/TechPlayground";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <PhilosophySection />
        <SkillsSection />
        <BehindScenes />
        <ProcessSection />
        <Testimonials />
        <NumbersSection />
        <TechPlayground />
      </main>
    </SmoothScroll>
  );
}
