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
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-[#0a0a0a]">
        <HeroSection />
        <AboutSection />
        <PhilosophySection />
        <SkillsSection />
        <ProjectsSection />
        <BehindScenes />
        <ProcessSection />
        <Testimonials />
        <NumbersSection />
        <TechPlayground />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
