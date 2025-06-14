
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your Next
              <span className="block text-moviefy-yellow">Favorite Movie</span>
            </h1>
            <p className="text-xl text-moviefy-gray-light mb-8 max-w-2xl mx-auto">
              Let our AI-powered assistant help you find the perfect movie, TV show, or anime based on your mood, preferences, and viewing history.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="mb-16">
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
