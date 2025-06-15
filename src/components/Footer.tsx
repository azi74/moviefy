
import { useState } from "react";
import ContactModal from "./ContactModal";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="relative mt-16">
        {/* Glass-like background */}
        <div className="absolute inset-0 bg-gradient-to-t from-moviefy-black/80 via-moviefy-gray-dark/40 to-transparent backdrop-blur-md border-t border-white/10"></div>
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-moviefy-gray-light text-sm">
                © 2024 moviefy. All rights reserved.
              </div>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-moviefy-yellow hover:text-moviefy-yellow-light transition-colors text-sm font-medium hover:scale-105 transform duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
};

export default Footer;
