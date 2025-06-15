
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
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-moviefy-gray-light">
              © 2025 moviefy
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-moviefy-gray-light hover:text-white transition-colors text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
};

export default Footer;
