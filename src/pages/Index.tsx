
import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Zap, Film } from 'lucide-react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show chat interface when user scrolls down half the viewport height
      setShowChatInterface(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie({
      ...movie,
      genre: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
      imdbRating: movie.rating,
      rottenTomatoesScore: Math.floor(movie.rating * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe. The film explores themes of memory, reality, and the subconscious mind through a complex multi-layered storyline that unfolds across different levels of dreams within dreams. Each layer presents its own unique challenges and dangers, creating a thrilling experience that keeps viewers engaged from start to finish. The exceptional cinematography and groundbreaking special effects work in harmony with a compelling score to create an unforgettable cinematic experience that pushes the boundaries of what's possible in modern filmmaking.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  const featureCards = [
    {
      icon: <TrendingUp className="h-12 w-12 text-moviefy-yellow" />,
      title: "Trending Now",
      description: "Discover what's hot and popular right now across movies, TV shows, and anime.",
      gradient: "from-moviefy-yellow/20 to-orange-500/20"
    },
    {
      icon: <Sparkles className="h-12 w-12 text-purple-400" />,
      title: "AI Recommendations",
      description: "Get personalized suggestions powered by advanced AI that understands your taste.",
      gradient: "from-purple-400/20 to-blue-500/20"
    },
    {
      icon: <Film className="h-12 w-12 text-green-400" />,
      title: "Discover Hidden Gems",
      description: "Uncover underrated masterpieces and hidden treasures you might have missed.",
      gradient: "from-green-400/20 to-teal-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in min-h-[80vh] flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Your Next
              <span className="block text-moviefy-yellow">Favorite Movie</span>
            </h1>
            <p className="text-xl text-moviefy-gray-light mb-12 max-w-2xl mx-auto">
              Let our AI-powered assistant help you find the perfect movie, TV show, or anime based on your mood, preferences, and viewing history.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${card.gradient} bg-moviefy-gray-dark/50 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:scale-105 transition-all duration-300 border border-moviefy-gray-medium/30 group`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-fit p-4 bg-moviefy-gray-medium/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                    <p className="text-moviefy-gray-light text-sm leading-relaxed">{card.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-moviefy-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Chat Interface - Shows on scroll */}
          {showChatInterface && (
            <div className="mb-16 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ask Our AI Assistant
                </h2>
                <p className="text-moviefy-gray-light">
                  Describe what you're in the mood for, and we'll find the perfect match.
                </p>
              </div>
              <ChatInterface onMovieClick={handleMovieClick} />
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Movie Modal */}
      <MovieModal 
        isOpen={isMovieModalOpen}
        onClose={() => setIsMovieModalOpen(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Index;
