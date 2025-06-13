
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Film, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from './AuthModal';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTestToggle, setShowTestToggle] = useState(false);

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

            {/* Auth Buttons and Test Toggle */}
            <div className="flex items-center space-x-4">
              {/* Test Toggle Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTestToggle(!showTestToggle)}
                className="text-moviefy-gray-light hover:text-white hover:bg-moviefy-gray-dark rounded-full p-2"
                title="Toggle test controls"
              >
                <Settings className="h-4 w-4" />
              </Button>

              {/* Test Toggle Panel */}
              {showTestToggle && (
                <div className="absolute top-16 right-6 bg-moviefy-gray-dark border border-moviefy-gray-medium rounded-xl p-4 shadow-lg backdrop-blur-sm animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <span className="text-white text-sm">Logged In:</span>
                    <Switch 
                      checked={isLoggedIn} 
                      onCheckedChange={setIsLoggedIn}
                    />
                  </div>
                  <p className="text-moviefy-gray-light text-xs mt-2">
                    Toggle to test logged-in state
                  </p>
                </div>
              )}

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
