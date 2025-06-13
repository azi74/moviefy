
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '' });
  };

  const AuthContent = () => (
    <div className="p-4 md:p-6">
      <div className="relative mb-6">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 md:top-0 md:right-0 text-moviefy-gray-light hover:text-white transition-colors bg-moviefy-gray-medium/80 p-2 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">
            {isSignUp ? 'Join moviefy' : 'Welcome back'}
          </h2>
          <p className="text-moviefy-gray-light text-sm">
            {isSignUp ? 'Create your account to get personalized recommendations' : 'Sign in to continue your movie journey'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field for sign up with smooth transition */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isSignUp ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
        }`}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-moviefy-gray-light" />
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className="pl-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
              required={isSignUp}
            />
          </div>
        </div>

        {/* Email field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-moviefy-gray-light" />
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
            required
          />
        </div>

        {/* Password field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-moviefy-gray-light" />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-12 pr-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-moviefy-gray-light hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Submit button */}
        <Button 
          type="submit"
          className="w-full bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl font-semibold py-3 hover-glow transition-all duration-200"
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>

      {/* Toggle between sign in and sign up */}
      <div className="text-center mt-6 space-y-3">
        {!isSignUp && (
          <a href="#" className="block text-moviefy-yellow hover:text-moviefy-yellow-light text-sm transition-colors">
            Forgot your password?
          </a>
        )}
        
        <div className="border-t border-moviefy-gray-medium pt-4">
          <p className="text-moviefy-gray-light text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            type="button"
            onClick={toggleMode}
            className="text-moviefy-yellow hover:text-moviefy-yellow-light font-semibold text-sm mt-1 transition-colors duration-200"
          >
            {isSignUp ? 'Sign in here' : 'Sign up for free'}
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="bg-moviefy-gray-dark border-t border-moviefy-yellow/20 h-[85vh] max-h-[85vh] animate-scale-in">
          <DrawerHeader className="pb-0 pt-2">
            <DrawerTitle className="sr-only">Authentication</DrawerTitle>
            {/* Drag Handle */}
            <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-moviefy-gray-light/30" />
          </DrawerHeader>
          <div className="overflow-y-auto">
            <AuthContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`bg-moviefy-gray-dark border-moviefy-yellow/20 text-white transition-all duration-500 ease-in-out ${
        isSignUp ? 'max-w-md' : 'max-w-sm'
      } animate-scale-in`}>
        <DialogHeader className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <AuthContent />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
