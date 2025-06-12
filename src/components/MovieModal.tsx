
import { X, Star, Calendar, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-strong"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-moviefy-gray-dark rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in border border-moviefy-yellow/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-moviefy-gray-light hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Movie Poster */}
          <div className="space-y-6">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Ratings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-moviefy-gray-medium p-4 rounded-xl text-center">
                <div className="text-moviefy-yellow text-2xl font-bold">{movie.imdbRating}</div>
                <div className="text-moviefy-gray-light text-sm">IMDB Rating</div>
              </div>
              <div className="bg-moviefy-gray-medium p-4 rounded-xl text-center">
                <div className="text-moviefy-yellow text-2xl font-bold">{movie.rottenTomatoesScore}%</div>
                <div className="text-moviefy-gray-light text-sm">Rotten Tomatoes</div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-moviefy-yellow" />
                  <span className="text-moviefy-gray-light">{movie.year}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Film className="h-5 w-5 text-moviefy-yellow" />
                  <span className="text-moviefy-gray-light">{movie.genre.join(', ')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-moviefy-yellow fill-moviefy-yellow" />
                  <span className="text-moviefy-gray-light">{movie.imdbRating}/10</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <p className="text-moviefy-gray-light leading-relaxed">{movie.description}</p>
            </div>

            {/* Cast */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span 
                    key={index}
                    className="bg-moviefy-gray-medium px-3 py-1 rounded-full text-moviefy-gray-light text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl px-8 hover-glow">
                Watch Trailer
              </Button>
              <Button variant="outline" className="border-moviefy-yellow text-moviefy-yellow hover:bg-moviefy-yellow hover:text-moviefy-black rounded-xl px-8">
                Add to List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
