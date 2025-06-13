import { useState } from 'react';
import { Search, Sparkles, Film, Tv, Zap } from 'lucide-react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import MovieCard from '@/components/MovieCard';
import SeriesCard from '@/components/SeriesCard';
import AnimeCard from '@/components/AnimeCard';
import CompactMovieCard from '@/components/CompactMovieCard';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const recommendedMovies = [
    {
      title: 'Inception',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8
    },
    {
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
      year: 2008,
      genre: 'Action',
      rating: 9.0
    },
    {
      title: 'Interstellar',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.6
    },
    {
      title: 'Pulp Fiction',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 1994,
      genre: 'Crime',
      rating: 8.9
    }
  ];

  const recommendedSeries = [
    {
      title: 'Breaking Bad',
      image: 'https://images.unsplash.com/photo-1594736797933-d0051ba2fe65?w=400&h=600&fit=crop',
      year: 2008,
      genre: 'Drama',
      rating: 9.5,
      seasons: 5
    },
    {
      title: 'The Last of Us',
      image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop',
      year: 2023,
      genre: 'Drama',
      rating: 8.7,
      seasons: 1
    },
    {
      title: 'Stranger Things',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 2016,
      genre: 'Sci-Fi',
      rating: 8.7,
      seasons: 4
    },
    {
      title: 'Game of Thrones',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      year: 2011,
      genre: 'Fantasy',
      rating: 9.3,
      seasons: 8
    }
  ];

  const recommendedAnime = [
    {
      title: 'Attack on Titan',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      year: 2013,
      genre: 'Action',
      rating: 9.0,
      episodes: 87
    },
    {
      title: 'Death Note',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 2006,
      genre: 'Thriller',
      rating: 9.0,
      episodes: 37
    },
    {
      title: 'Demon Slayer',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2019,
      genre: 'Action',
      rating: 8.7,
      episodes: 44
    },
    {
      title: 'One Piece',
      image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
      year: 1999,
      genre: 'Adventure',
      rating: 9.0,
      episodes: 1000
    }
  ];

  const handleMovieClick = (movie: any) => {
    setSelectedMovie({
      ...movie,
      genre: [movie.genre],
      imdbRating: movie.rating,
      rottenTomatoesScore: Math.floor(movie.rating * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header isLoggedIn={isLoggedIn} onAuthClick={() => setIsLoggedIn(!isLoggedIn)} />
      
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
            <ChatInterface />
          </div>
        </div>

        {/* Recommended Movies Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Film className="h-6 w-6 text-moviefy-yellow" />
            <h2 className="text-3xl font-bold text-white">Recommended Movies</h2>
            <Sparkles className="h-6 w-6 text-moviefy-yellow" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recommendedMovies.map((movie, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard
                  title={movie.title}
                  image={movie.image}
                  year={movie.year}
                  genre={movie.genre}
                  rating={movie.rating}
                  onClick={() => handleMovieClick(movie)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Series Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Tv className="h-6 w-6 text-moviefy-yellow" />
            <h2 className="text-3xl font-bold text-white">Recommended Series</h2>
            <Sparkles className="h-6 w-6 text-moviefy-yellow" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recommendedSeries.map((series, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SeriesCard
                  title={series.title}
                  image={series.image}
                  year={series.year}
                  genre={series.genre}
                  rating={series.rating}
                  seasons={series.seasons}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Anime Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold text-white">Recommended Anime</h2>
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recommendedAnime.map((anime, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimeCard
                  title={anime.title}
                  image={anime.image}
                  year={anime.year}
                  genre={anime.genre}
                  rating={anime.rating}
                  episodes={anime.episodes}
                />
              </div>
            ))}
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
