
import { useState } from 'react';
import { Star, Play, Heart } from 'lucide-react';

interface MovieCardProps {
  title: string;
  image: string;
  year: number;
  genre: string;
  rating: number;
  onClick?: () => void;
}

const MovieCard = ({ title, image, year, genre, rating, onClick }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="relative bg-moviefy-gray-dark rounded-2xl overflow-hidden cursor-pointer card-hover group"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="aspect-[2/3] relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-moviefy-gray-medium animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-moviefy-gray-light rounded-full opacity-20" />
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
            target.src = `https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop`;
            setImageLoaded(true);
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-moviefy-yellow/90 text-moviefy-black p-4 rounded-full">
            <Play className="h-6 w-6" />
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-white'
            }`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-moviefy-yellow transition-colors line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-moviefy-gray-light text-sm">{year}</span>
          <span className="text-moviefy-gray-light text-sm">{genre}</span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-moviefy-yellow fill-moviefy-yellow" />
          <span className="text-moviefy-gray-light text-sm">{rating}</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-moviefy-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default MovieCard;
