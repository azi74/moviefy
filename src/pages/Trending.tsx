import { useState } from 'react';
import { TrendingUp, Film, Tv, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SeriesCard from '@/components/SeriesCard';
import AnimeCard from '@/components/AnimeCard';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { tmdbService } from '@/api/tmdbService';

type MediaItem = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
};

type MediaCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  fetchData: () => Promise<MediaItem[]>;
};

const Trending = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedContent, setSelectedContent] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mediaCategories: MediaCategory[] = [
    {
      id: 'movies',
      label: 'Movies',
      icon: Film,
      fetchData: () => tmdbService.getTrendingMovies().then(res => res.results)
    },
    {
      id: 'series',
      label: 'TV Shows',
      icon: Tv,
      fetchData: () => tmdbService.getTrendingTVShows().then(res => res.results)
    },
    {
      id: 'anime',
      label: 'Anime',
      icon: Zap,
      fetchData: () => tmdbService.getTrendingAnime().then(res => res.results)
    }
  ];

  const activeCategory = mediaCategories.find(cat => cat.id === activeTab);

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['trending', activeTab],
    queryFn: activeCategory?.fetchData,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const handleContentClick = (content: MediaItem) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const renderMediaCard = (item: MediaItem) => {
    const commonProps = {
      title: item.title,
      image: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
      year: (item.release_date || item.first_air_date)?.substring(0, 4),
      rating: item.vote_average,
      onClick: () => handleContentClick(item)
    };

    switch (item.media_type) {
      case 'tv':
        return (
          <SeriesCard
            {...commonProps}
            seasons={item.number_of_seasons}
          />
        );
      case 'movie':
      default:
        return <MovieCard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-moviefy-black">
      <Header />
      
      <main className="container flex-auto mx-auto px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="h-8 w-8 text-moviefy-yellow" />
            <h1 className="text-4xl font-bold text-white">Trending Now</h1>
          </div>

          {/* Dynamic Tabs */}
          <div className="relative mb-8">
            <div className="relative bg-moviefy-gray-medium/30 backdrop-blur-sm rounded-2xl p-1.5 border border-moviefy-gray-medium/20 shadow-xl">
              <div 
                className="absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-moviefy-yellow to-moviefy-yellow/90 rounded-xl transition-all duration-300 ease-out shadow-lg"
                style={{
                  width: `${100 / mediaCategories.length}%`,
                  left: `${(mediaCategories.findIndex(cat => cat.id === activeTab) * 100) / mediaCategories.length}%`,
                }}
              />
              
              <div className="relative flex">
                {mediaCategories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = activeTab === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`relative flex-1 flex items-center justify-center space-x-2 md:space-x-3 px-3 md:px-6 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ease-out transform hover:scale-105 group ${
                        isActive
                          ? 'text-moviefy-black z-10'
                          : 'text-moviefy-gray-light hover:text-white'
                      }`}
                    >
                      <div className={`relative transition-all duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${
                          isActive 
                            ? 'drop-shadow-sm' 
                            : 'group-hover:text-moviefy-yellow'
                        }`} />
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        <span className={`transition-all duration-300 ${
                          isActive ? 'font-bold' : 'group-hover:text-moviefy-yellow'
                        }`}>
                          {category.label}
                        </span>
                        
                        {!isLoading && (
                          <div className={`hidden md:flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                            isActive 
                              ? 'bg-moviefy-black/20 text-moviefy-black' 
                              : 'bg-moviefy-yellow/10 text-moviefy-yellow group-hover:bg-moviefy-yellow/20'
                          }`}>
                            {mediaItems?.length || 0}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {mediaCategories.map((category) => (
                <div
                  key={category.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeTab === category.id 
                      ? 'w-8 bg-moviefy-yellow' 
                      : 'w-2 bg-moviefy-gray-medium hover:bg-moviefy-yellow/50 cursor-pointer'
                  }`}
                  onClick={() => setActiveTab(category.id)}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div key={activeTab} className="animate-fade-in">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {mediaItems?.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {renderMediaCard(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {selectedContent && (
        <MovieModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={selectedContent}
        />
      )}
    </div>
  );
};

export default Trending;