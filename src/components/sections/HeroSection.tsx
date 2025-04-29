
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom min-h-[70vh] flex flex-col justify-center py-20 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-5xl lg:text-3xl font-bold text-white leading-tight mb-6">
            Dr. Gaurav Varshney<br />
            <span className="text-accent ext-2xl md:text-5xl lg:text-2xl">Assistant Professor, CSE, IIT Jammu | Programme Director, PG Diploma in Cyber Security</span>
          </h1>
          
        
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Ph.D. & M.Tech (IIT Roorkee) with 10+ years of experience in academia and industry (Qualcomm, NIIT). My work focuses on web/network security, memory forensics, and privacy-preserving tech. I’ve published 25+ research papers and collaborate with global institutes like SUNY Albany and SUTD. Passionate about secure systems, innovation, and education.
          </p>
          
          <div className="flex space-x-4">
            
            <Button variant="default" className="text-white">
              <a href="#projects" className="flex items-center">
              View Projects
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="default" className="text-white">
              <a href="#contact" className="flex items-center">
                Contact Me
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
