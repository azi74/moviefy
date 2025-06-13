
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import { Film, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-moviefy-yellow/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-moviefy-yellow/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Discover Your Next
                <span className="block text-moviefy-yellow">Favorite Movie</span>
              </h1>
              <p className="text-xl text-moviefy-gray-light mb-8 max-w-2xl mx-auto">
                Get personalized movie recommendations powered by AI. Tell us what you love, and we'll find your perfect match.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-moviefy-gray-dark/50 backdrop-blur-sm rounded-2xl p-6 animate-slide-up hover-glow border border-moviefy-gray-medium">
                <Film className="h-12 w-12 text-moviefy-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Recommendations</h3>
                <p className="text-moviefy-gray-light">AI-powered suggestions based on your unique taste and preferences</p>
              </div>
              
              <div className="bg-moviefy-gray-dark/50 backdrop-blur-sm rounded-2xl p-6 animate-slide-up hover-glow border border-moviefy-gray-medium" style={{ animationDelay: '0.1s' }}>
                <Sparkles className="h-12 w-12 text-moviefy-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Personalized Experience</h3>
                <p className="text-moviefy-gray-light">Curated content that evolves with your viewing history and ratings</p>
              </div>
              
              <Link to="/trending" className="bg-moviefy-gray-dark/50 backdrop-blur-sm rounded-2xl p-6 animate-slide-up hover-glow border border-moviefy-gray-medium cursor-pointer transition-transform hover:scale-105" style={{ animationDelay: '0.2s' }}>
                <TrendingUp className="h-12 w-12 text-moviefy-yellow mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Trending & Popular</h3>
                <p className="text-moviefy-gray-light">Stay updated with the latest releases and trending content</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Chat Interface Section */}
        <section className="py-16 bg-moviefy-gray-dark/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Start Your Movie Journey
              </h2>
              <p className="text-xl text-moviefy-gray-light max-w-2xl mx-auto">
                Answer a few questions and let our AI find the perfect movies for you
              </p>
            </div>
            
            {/* Chat Interface Container */}
            <div className="bg-moviefy-gray-dark/40 backdrop-blur-sm rounded-3xl border border-moviefy-gray-medium min-h-[600px] animate-scale-in">
              <ChatInterface />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-moviefy-gray-dark">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Film className="h-6 w-6 text-moviefy-yellow" />
            <span className="text-xl font-bold text-white">
              movie<span className="text-moviefy-yellow">fy</span>
            </span>
          </div>
          <p className="text-moviefy-gray-light">
            © 2024 moviefy. Discover your next favorite movie with AI-powered recommendations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
