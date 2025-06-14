
import { X, Star, Calendar, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MovieDetails {
  title: string;
  image: string;
  year: number;
  genre: string[];
  imdbRating: number;
  rottenTomatoesScore: number;
  description: string;
  cast: string[];
}

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: MovieDetails | null;
}

const MovieModal = ({ isOpen, onClose, movie }: MovieModalProps) => {
  const isMobile = useIsMobile();

  if (!isOpen || !movie) return null;

  // Generate cast member data with placeholder images
  const castWithImages = movie.cast.map((name, index) => ({
    name,
    image: `https://images.unsplash.com/photo-${1500000000 + index}?w=100&h=100&fit=crop&crop=face`
  }));

  // Truncate description to a shorter length
  const truncatedDescription = movie.description.length > 300 
    ? movie.description.substring(0, 300) + "..."
    : movie.description;

  const MovieContent = () => (
    <div className="p-4 md:p-6">
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Movie Poster - Smaller on desktop */}
        <div className="md:col-span-1 space-y-3">
          <div className={`${isMobile ? 'aspect-[3/4] max-w-[200px] mx-auto' : 'aspect-[2/3]'} rounded-lg md:rounded-xl overflow-hidden`}>
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Ratings - Compact with no bottom margin */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-moviefy-gray-medium p-2 rounded-lg text-center">
              <div className="text-moviefy-yellow text-lg font-bold">{movie.imdbRating}</div>
              <div className="text-moviefy-gray-light text-xs">IMDB</div>
            </div>
            <div className="bg-moviefy-gray-medium p-2 rounded-lg text-center">
              <div className="text-moviefy-yellow text-lg font-bold">{movie.rottenTomatoesScore}%</div>
              <div className="text-moviefy-gray-light text-xs">RT</div>
            </div>
          </div>
        </div>

        {/* Movie Details - More space */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{movie.title}</h1>
            
            <div className="flex items-center flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-moviefy-yellow" />
                <span className="text-moviefy-gray-light text-sm">{movie.year}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Film className="h-4 w-4 text-moviefy-yellow" />
                <span className="text-moviefy-gray-light text-sm">{movie.genre.join(', ')}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-moviefy-yellow fill-moviefy-yellow" />
                <span className="text-moviefy-gray-light text-sm">{movie.imdbRating}/10</span>
              </div>
            </div>
          </div>

          {/* Description - Shorter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-moviefy-gray-light text-sm md:text-base leading-relaxed">{truncatedDescription}</p>
          </div>

          {/* Cast - Compact grid */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
            <div className="grid grid-cols-2 gap-3">
              {castWithImages.slice(0, 6).map((actor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={actor.image} alt={actor.name} />
                    <AvatarFallback className="bg-moviefy-gray-medium text-moviefy-gray-light text-xs">
                      {actor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-moviefy-gray-light text-sm truncate">{actor.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3">
            <Button className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-lg px-6 text-sm hover-glow">
              Watch Trailer
            </Button>
            <Button variant="outline" className="border-moviefy-yellow text-moviefy-yellow hover:bg-moviefy-yellow hover:text-moviefy-black rounded-lg px-6 text-sm">
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="bg-moviefy-gray-dark border-t border-moviefy-yellow/20 h-[75vh] max-h-[75vh]">
          <DrawerHeader className="pb-0 pt-2 relative">
            <DrawerTitle className="sr-only">Movie Details</DrawerTitle>
            {/* Close Button for Mobile */}
            <button 
              onClick={onClose}
              className="absolute top-2 right-4 text-moviefy-gray-light hover:text-white transition-colors z-10 bg-moviefy-gray-medium/80 p-2 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Drag Handle */}
            <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-moviefy-gray-light/30" />
          </DrawerHeader>
          <div className="overflow-y-auto flex-1">
            <MovieContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-strong"
        onClick={onClose}
      />
      
      {/* Modal Content - Larger width */}
      <div className="relative bg-moviefy-gray-dark rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-scale-in border border-moviefy-yellow/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-moviefy-gray-light hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        <MovieContent />
      </div>
    </div>
  );
};

export default MovieModal;
