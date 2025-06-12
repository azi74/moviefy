
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-strong"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-moviefy-gray-dark rounded-2xl p-8 w-full max-w-md animate-scale-in border border-moviefy-yellow/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-moviefy-gray-light hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Moviefy'}
          </h2>
          <p className="text-moviefy-gray-light">
            {isLogin ? 'Sign in to get personalized recommendations' : 'Create your account to start discovering'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-moviefy-gray-light" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-moviefy-gray-light" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-moviefy-gray-light" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-12 pr-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-moviefy-gray-light hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-moviefy-gray-light" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-12 bg-moviefy-gray-medium border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit"
            className="w-full bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl py-3 font-semibold hover-glow"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="text-center mt-6">
          <p className="text-moviefy-gray-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-moviefy-yellow hover:text-moviefy-yellow-light font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
