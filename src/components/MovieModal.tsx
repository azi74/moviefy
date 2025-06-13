
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

  const MovieContent = () => (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Movie Poster */}
        <div className="space-y-4">
          <div className="aspect-[2/3] rounded-2xl overflow-hidden">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Ratings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-moviefy-gray-medium p-3 rounded-xl text-center">
              <div className="text-moviefy-yellow text-xl font-bold">{movie.imdbRating}</div>
              <div className="text-moviefy-gray-light text-xs">IMDB Rating</div>
            </div>
            <div className="bg-moviefy-gray-medium p-3 rounded-xl text-center">
              <div className="text-moviefy-yellow text-xl font-bold">{movie.rottenTomatoesScore}%</div>
              <div className="text-moviefy-gray-light text-xs">Rotten Tomatoes</div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">{movie.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
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

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-moviefy-gray-light text-sm leading-relaxed">{movie.description}</p>
          </div>

          {/* Cast */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
            <div className="grid grid-cols-2 gap-3">
              {castWithImages.map((actor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
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
          <div className="flex space-x-3 pt-4">
            <Button className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl px-6 text-sm hover-glow">
              Watch Trailer
            </Button>
            <Button variant="outline" className="border-moviefy-yellow text-moviefy-yellow hover:bg-moviefy-yellow hover:text-moviefy-black rounded-xl px-6 text-sm">
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
        <DrawerContent className="bg-moviefy-gray-dark border-t border-moviefy-yellow/20 max-h-[90vh]">
          <DrawerHeader className="pb-0">
            <DrawerTitle className="sr-only">Movie Details</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto">
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
      
      {/* Modal Content - Reduced size from max-w-4xl to max-w-2xl */}
      <div className="relative bg-moviefy-gray-dark rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in border border-moviefy-yellow/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-moviefy-gray-light hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        <MovieContent />
      </div>
    </div>
  );
};

export default MovieModal;
