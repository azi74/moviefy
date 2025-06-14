
import { useState } from 'react';
import { Star, Play, Heart, Zap } from 'lucide-react';

interface CompactAnimeCardProps {
  title: string;
  image: string;
  year: number;
  genre: string;
  rating: number;
  episodes?: number;
  onClick?: () => void;
}

const CompactAnimeCard = ({ title, image, year, genre, rating, episodes, onClick }: CompactAnimeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="relative bg-moviefy-gray-dark rounded-xl overflow-hidden cursor-pointer card-hover group flex md:block h-24 md:h-auto"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="w-16 md:w-full md:aspect-[2/3] relative overflow-hidden flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-moviefy-gray-medium animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 md:w-16 md:h-16 bg-moviefy-gray-light rounded-full opacity-20" />
          </div>
        )}
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop`;
            setImageLoaded(true);
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Anime Icon */}
        <div className="absolute top-1 left-1 md:top-4 md:left-4 bg-purple-500/90 text-white p-1 md:p-2 rounded-full">
          <Zap className="h-2 w-2 md:h-4 md:w-4" />
        </div>
        
        {/* Play Button - Hidden on mobile for compact view */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-moviefy-yellow/90 text-moviefy-black p-4 rounded-full">
            <Play className="h-6 w-6" />
          </div>
        </div>

        {/* Like Button - Smaller on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-1 right-1 md:top-4 md:right-4 p-1 md:p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
        >
          <Heart 
            className={`h-3 w-3 md:h-5 md:w-5 transition-colors ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-white'
            }`} 
          />
        </button>
      </div>

      {/* Content - Optimized for mobile horizontal layout */}
      <div className="flex-1 p-2 md:p-4 flex flex-col justify-center md:justify-start">
        <h3 className="text-white font-semibold text-sm md:text-lg mb-1 md:mb-2 group-hover:text-moviefy-yellow transition-colors line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-1 md:mb-2 text-xs md:text-sm">
          <span className="text-moviefy-gray-light">{year}</span>
          <span className="text-moviefy-gray-light truncate ml-2">{genre}</span>
        </div>
        
        {episodes && (
          <div className="text-moviefy-gray-light text-xs md:text-sm mb-1 md:mb-2">
            {episodes} Episode{episodes > 1 ? 's' : ''}
          </div>
        )}
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="h-3 w-3 md:h-4 md:w-4 text-moviefy-yellow fill-moviefy-yellow" />
          <span className="text-moviefy-gray-light text-xs md:text-sm">{rating}</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-moviefy-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default CompactAnimeCard;
