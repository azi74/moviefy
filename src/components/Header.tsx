
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, Film } from "lucide-react";
import AuthModal from './AuthModal';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-moviefy-black/80 backdrop-blur-md border-b border-moviefy-gray-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <Film className="h-8 w-8 text-moviefy-yellow" />
              <h1 className="text-2xl font-bold text-white">
                Movie<span className="text-moviefy-yellow">fy</span>
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-moviefy-yellow transition-colors duration-200">
                Discover
              </a>
              <a href="#" className="text-white hover:text-moviefy-yellow transition-colors duration-200">
                Trending
              </a>
              {isLoggedIn && (
                <a href="#" className="text-white hover:text-moviefy-yellow transition-colors duration-200">
                  My Lists
                </a>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-moviefy-yellow hover:bg-moviefy-gray-dark rounded-full"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-full px-6 hover-glow"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowAuthModal(false);
        }}
      />
    </>
  );
};

export default Header;
