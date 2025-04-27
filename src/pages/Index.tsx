
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import TeamSection from "@/components/sections/TeamSection";
import EventsSection from "@/components/sections/EventsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProjectsSection />
      <PublicationsSection />
      <TeamSection />
      <EventsSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
