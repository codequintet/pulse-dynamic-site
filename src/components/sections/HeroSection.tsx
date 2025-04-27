
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Advancing Research<br />
            <span className="text-accent">Through Innovation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Pioneering research in computer science, artificial intelligence, and 
            interdisciplinary applications. Join our community of scholars, innovators, 
            and change-makers.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-primary hover:bg-accent hover:text-primary-foreground">
              Explore Our Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Join Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
