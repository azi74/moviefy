import { useState } from 'react';
import { TrendingUp, Film, Tv, Zap } from 'lucide-react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SeriesCard from '@/components/SeriesCard';
import AnimeCard from '@/components/AnimeCard';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';

const Trending = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const handleContentClick = (content: any) => {
    setSelectedMovie({
      ...content,
      genre: Array.isArray(content.genre) ? content.genre : [content.genre],
      imdbRating: content.rating,
      rottenTomatoesScore: Math.floor(content.rating * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe. The film explores themes of memory, reality, and the subconscious mind through a complex multi-layered storyline that unfolds across different levels of dreams within dreams. Each layer presents its own unique challenges and dangers, creating a thrilling experience that keeps viewers engaged from start to finish. The exceptional cinematography and groundbreaking special effects work in harmony with a compelling score to create an unforgettable cinematic experience that pushes the boundaries of what's possible in modern filmmaking.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  const trendingMovies = [
    {
      title: 'Oppenheimer',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 2023,
      genre: 'Biography',
      rating: 8.4
    },
    {
      title: 'Barbie',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2023,
      genre: 'Comedy',
      rating: 7.0
    },
    {
      title: 'Inception',
      image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8
    },
    {
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      year: 2008,
      genre: 'Action',
      rating: 9.0
    }
  ];

  const trendingSeries = [
    {
      title: 'The Last of Us',
      image: 'https://images.unsplash.com/photo-1594736797933-d0051ba2fe65?w=400&h=600&fit=crop',
      year: 2023,
      genre: 'Drama',
      rating: 8.7,
      seasons: 1
    },
    {
      title: 'Wednesday',
      image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
      year: 2022,
      genre: 'Comedy',
      rating: 8.1,
      seasons: 1
    },
    {
      title: 'House of the Dragon',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      year: 2022,
      genre: 'Fantasy',
      rating: 8.5,
      seasons: 2
    },
    {
      title: 'Stranger Things',
      image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop',
      year: 2016,
      genre: 'Sci-Fi',
      rating: 8.7,
      seasons: 4
    }
  ];

  const trendingAnime = [
    {
      title: 'Demon Slayer',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      year: 2019,
      genre: 'Action',
      rating: 8.7,
      episodes: 44
    },
    {
      title: 'Jujutsu Kaisen',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 2020,
      genre: 'Supernatural',
      rating: 8.6,
      episodes: 24
    },
    {
      title: 'Attack on Titan',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2013,
      genre: 'Action',
      rating: 9.0,
      episodes: 87
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

  const tabs = [
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'TV Shows', icon: Tv },
    { id: 'anime', label: 'Anime', icon: Zap }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingMovies.map((movie, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard
                  title={movie.title}
                  image={movie.image}
                  year={movie.year}
                  genre={movie.genre}
                  rating={movie.rating}
                  onClick={() => handleContentClick(movie)}
                />
              </div>
            ))}
          </div>
        );
      case 'series':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingSeries.map((series, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SeriesCard
                  title={series.title}
                  image={series.image}
                  year={series.year}
                  genre={series.genre}
                  rating={series.rating}
                  seasons={series.seasons}
                  onClick={() => handleContentClick(series)}
                />
              </div>
            ))}
          </div>
        );
      case 'anime':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingAnime.map((anime, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimeCard
                  title={anime.title}
                  image={anime.image}
                  year={anime.year}
                  genre={anime.genre}
                  rating={anime.rating}
                  episodes={anime.episodes}
                  onClick={() => handleContentClick(anime)}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="h-8 w-8 text-moviefy-yellow" />
            <h1 className="text-4xl font-bold text-white">Trending Now</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-moviefy-gray-medium rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-moviefy-yellow text-moviefy-black'
                      : 'text-moviefy-gray-light hover:text-white'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          {renderContent()}
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

export default Trending;
