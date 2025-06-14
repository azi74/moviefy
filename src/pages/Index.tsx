
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
      imdbRating: movie.rating,
      rottenTomatoesScore: Math.floor(movie.rating * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe. The film explores themes of memory, reality, and the subconscious mind through a complex multi-layered storyline that unfolds across different levels of dreams within dreams. Each layer presents its own unique challenges and dangers, creating a thrilling experience that keeps viewers engaged from start to finish. The exceptional cinematography and groundbreaking special effects work in harmony with a compelling score to create an unforgettable cinematic experience that pushes the boundaries of what's possible in modern filmmaking.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  const featureCards = [
    {
      icon: <TrendingUp className="h-8 w-8 text-moviefy-yellow" />,
      title: "Trending Now",
      description: "Discover what's hot and popular right now across movies, TV shows, and anime.",
      bgImage: "https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=300&fit=crop"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-moviefy-yellow" />,
      title: "AI Recommendations",
      description: "Get personalized suggestions powered by advanced AI that understands your taste.",
      bgImage: "https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=300&fit=crop"
    },
    {
      icon: <Film className="h-8 w-8 text-moviefy-yellow" />,
      title: "Discover Hidden Gems",
      description: "Uncover underrated masterpieces and hidden treasures you might have missed.",
      bgImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop"
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
              Let our AI-powered assistant help you find the perfect movie, TV show, or anime based on your mood, preferences, and viewing history.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className="relative bg-moviefy-gray-dark rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-moviefy-yellow/20 group h-64"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={card.bgImage} 
                      alt={card.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-moviefy-black via-moviefy-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-moviefy-yellow/20 rounded-full border border-moviefy-yellow/30 group-hover:bg-moviefy-yellow/30 transition-colors duration-300">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-moviefy-yellow transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>
                    
                    <p className="text-moviefy-gray-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-moviefy-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 border-2 border-moviefy-yellow/0 group-hover:border-moviefy-yellow/50 rounded-2xl transition-all duration-300" />
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
