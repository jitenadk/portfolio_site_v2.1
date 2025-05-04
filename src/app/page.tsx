import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PhotographySection from "@/components/sections/PhotographySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-24 py-24">
      <HeroSection />
      <AboutSection />
      {/* <SkillsSection /> */}
      <ProjectsSection />
      {/* <PhotographySection /> */}
      <ContactSection />
    </div>
  );
}

