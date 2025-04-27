
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ResearchLab</h3>
            <p className="mb-4 text-sm">
              Leading the way in innovative research and academic excellence. Our mission is to advance knowledge
              through collaborative and cutting-edge research.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#publications" className="hover:underline">Publications</a></li>
              <li><a href="#team" className="hover:underline">Team</a></li>
              <li><a href="#events" className="hover:underline">Events</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>123 University Avenue, Research Park, CA 94305</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>contact@researchlab.edu</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe to our newsletter for updates.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 text-gray-800 rounded-md"
                required
              />
              <button 
                type="submit"
                className="bg-accent text-primary-foreground font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-6 text-sm text-center">
          <p>© {currentYear} ResearchLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
