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
    { id: 'movies', label: 'Movies', icon: Film, count: trendingMovies.length },
    { id: 'series', label: 'TV Shows', icon: Tv, count: trendingSeries.length },
    { id: 'anime', label: 'Anime', icon: Zap, count: trendingAnime.length }
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

          {/* Dynamic Tabs Container */}
          <div className="relative mb-8">
            {/* Tab Navigation */}
            <div className="relative bg-moviefy-gray-medium/30 backdrop-blur-sm rounded-2xl p-1.5 border border-moviefy-gray-medium/20 shadow-xl">
              {/* Background Slider */}
              <div 
                className="absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-moviefy-yellow to-moviefy-yellow/90 rounded-xl transition-all duration-300 ease-out shadow-lg"
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${(tabs.findIndex(tab => tab.id === activeTab) * 100) / tabs.length}%`,
                }}
              />
              
              {/* Tab Buttons */}
              <div className="relative flex">
                {tabs.map((tab, index) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 flex items-center justify-center space-x-2 md:space-x-3 px-3 md:px-6 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ease-out transform hover:scale-105 group ${
                        isActive
                          ? 'text-moviefy-black z-10'
                          : 'text-moviefy-gray-light hover:text-white'
                      }`}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {/* Icon with enhanced animations */}
                      <div className={`relative transition-all duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                        <IconComponent className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${
                          isActive 
                            ? 'drop-shadow-sm' 
                            : 'group-hover:text-moviefy-yellow'
                        }`} />
                        
                        {/* Glow effect for active tab */}
                        {isActive && (
                          <div className="absolute inset-0 -z-10">
                            <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-moviefy-yellow/30 blur-sm" />
                          </div>
                        )}
                      </div>
                      
                      {/* Label with count */}
                      <div className="flex items-center space-x-1.5">
                        <span className={`transition-all duration-300 ${
                          isActive ? 'font-bold' : 'group-hover:text-moviefy-yellow'
                        }`}>
                          {tab.label}
                        </span>
                        
                        {/* Count badge */}
                        <div className={`hidden md:flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                          isActive 
                            ? 'bg-moviefy-black/20 text-moviefy-black' 
                            : 'bg-moviefy-yellow/10 text-moviefy-yellow group-hover:bg-moviefy-yellow/20'
                        }`}>
                          {tab.count}
                        </div>
                      </div>

                      {/* Ripple effect on click */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className={`absolute inset-0 bg-white/10 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-xl ${
                          !isActive ? 'group-active:animate-ping' : ''
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'w-8 bg-moviefy-yellow' 
                      : 'w-2 bg-moviefy-gray-medium hover:bg-moviefy-yellow/50 cursor-pointer'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          {/* Content with fade transition */}
          <div key={activeTab} className="animate-fade-in">
            {renderContent()}
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

export default Trending;
