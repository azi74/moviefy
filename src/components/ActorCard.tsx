
import { useState } from 'react';
import { Star, Heart } from 'lucide-react';

interface ActorCardProps {
  name: string;
  image: string;
  rating?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const ActorCard = ({ name, image, rating = 4.5, isSelected = false, onClick }: ActorCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`relative bg-moviefy-gray-dark rounded-2xl overflow-hidden cursor-pointer card-hover group ${
        isSelected ? 'ring-2 ring-moviefy-yellow' : ''
      }`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-moviefy-gray-medium animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-moviefy-gray-light rounded-full opacity-20" />
          </div>
        )}
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face`;
            setImageLoaded(true);
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
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

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 left-4 bg-moviefy-yellow text-moviefy-black px-3 py-1 rounded-full text-sm font-semibold animate-scale-in">
            Selected
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-moviefy-yellow transition-colors">
          {name}
        </h3>
        
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

export default ActorCard;
