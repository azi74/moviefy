
import { useState } from 'react';
import { Sparkles, TrendingUp, Zap, Film } from 'lucide-react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie({
      ...movie,
      genre: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
      imdbRating: movie.rating || movie.imdbRating,
      rottenTomatoesScore: Math.floor((movie.rating || movie.imdbRating) * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  const featureCards = [
    {
      icon: <TrendingUp className="h-6 w-6 text-moviefy-yellow" />,
      title: "Trending Now",
      description: "Discover what's hot and popular"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-moviefy-yellow" />,
      title: "AI Recommendations", 
      description: "Personalized suggestions powered by AI"
    },
    {
      icon: <Film className="h-6 w-6 text-moviefy-yellow" />,
      title: "Hidden Gems",
      description: "Uncover underrated masterpieces"
    }
  ];

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Feature Cards */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Your Next
              <span className="block text-moviefy-yellow">Favorite Movie</span>
            </h1>
            <p className="text-xl text-moviefy-gray-light mb-12 max-w-2xl mx-auto">
              Let our AI-powered assistant help you find the perfect movie, TV show, or anime based on your mood and preferences.
            </p>

            {/* Feature Cards - Taller and more square */}
            <div className="grid md:grid-cols-3 gap-4 mt-16">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-moviefy-gray-dark/50 border border-moviefy-gray-medium/30 rounded-xl p-8 cursor-pointer hover:border-moviefy-yellow/50 hover:bg-moviefy-gray-dark/70 transition-all duration-300 group aspect-square md:aspect-[4/5] flex flex-col justify-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-moviefy-yellow/10 rounded-lg group-hover:bg-moviefy-yellow/20 transition-colors duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-moviefy-yellow transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-moviefy-gray-light text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Interface with Recommendations */}
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
