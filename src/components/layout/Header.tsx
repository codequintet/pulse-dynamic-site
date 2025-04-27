
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container-custom flex justify-between items-center py-4">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">ResearchLab</a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="font-medium text-gray-700 hover:text-primary transition-colors">Home</a>
          <a href="#projects" className="font-medium text-gray-700 hover:text-primary transition-colors">Projects</a>
          <a href="#publications" className="font-medium text-gray-700 hover:text-primary transition-colors">Publications</a>
          <a href="#team" className="font-medium text-gray-700 hover:text-primary transition-colors">Team</a>
          <a href="#events" className="font-medium text-gray-700 hover:text-primary transition-colors">Events</a>
          <a href="#contact" className="font-medium text-gray-700 hover:text-primary transition-colors">Contact</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a href="/" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Home</a>
            <a href="#projects" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Projects</a>
            <a href="#publications" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Publications</a>
            <a href="#team" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Team</a>
            <a href="#events" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Events</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
