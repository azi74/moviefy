
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Film } from "lucide-react";
import { Link } from "react-router-dom";
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
            <Link to="/" className="flex items-center space-x-3 animate-fade-in">
              <Film className="h-8 w-8 text-moviefy-yellow" />
              <h1 className="text-2xl font-bold text-white">
                movie<span className="text-moviefy-yellow">fy</span>
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-moviefy-yellow transition-colors duration-200">
                Discover
              </Link>
              <Link to="/trending" className="text-white hover:text-moviefy-yellow transition-colors duration-200">
                Trending
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:text-moviefy-yellow hover:bg-moviefy-gray-dark rounded-full"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                </Link>
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
