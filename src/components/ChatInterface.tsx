import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Film, Tv, Zap } from "lucide-react";
import ActorCard from './ActorCard';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';
import AnimeCard from './AnimeCard';
import CompactMovieCard from './CompactMovieCard';
import MovieModal from './MovieModal';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatStep {
  question: string;
  type: 'text' | 'actors' | 'genres' | 'movies';
  options?: any[];
}

interface ChatInterfaceProps {
  onMovieClick?: (movie: any) => void;
}

const mockActors = [
  { name: 'Leonardo DiCaprio', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', rating: 4.8 },
  { name: 'Scarlett Johansson', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face', rating: 4.7 },
  { name: 'Robert Downey Jr.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face', rating: 4.9 },
  { name: 'Emma Stone', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face', rating: 4.6 },
  { name: 'Ryan Gosling', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', rating: 4.5 },
  { name: 'Margot Robbie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face', rating: 4.7 }
];

const mockMovies = [
  {
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
    year: 2010,
    genre: ['Sci-Fi', 'Thriller'],
    rating: 8.8,
    imdbRating: 8.8,
    rottenTomatoesScore: 87,
    description: 'A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Ellen Page']
  },
  {
    title: 'The Dark Knight',
    image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
    year: 2008,
    genre: ['Action', 'Crime'],
    rating: 9.0,
    imdbRating: 9.0,
    rottenTomatoesScore: 94,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine']
  },
  {
    title: 'Interstellar',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
    year: 2014,
    genre: ['Sci-Fi', 'Drama'],
    rating: 8.6,
    imdbRating: 8.6,
    rottenTomatoesScore: 72,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine']
  },
  {
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    year: 1994,
    genre: ['Crime', 'Drama'],
    rating: 8.9,
    imdbRating: 8.9,
    rottenTomatoesScore: 92,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis']
  }
];

const mockSeries = [
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

const mockAnime = [
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

const chatSteps: ChatStep[] = [
  {
    question: "Hi! I'm your personal movie recommendation assistant. What are some of your favorite movies you've watched recently?",
    type: 'text'
  },
  {
    question: "Great taste! Now, who are your favorite actors or actresses? Select as many as you like:",
    type: 'actors',
    options: mockActors
  },
  {
    question: "Excellent choices! What genres do you enjoy the most?",
    type: 'genres',
    options: ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Sci-Fi', 'Horror', 'Animation']
  }
];

const ChatInterface = ({ onMovieClick }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (messages.length === 0) {
      const firstMessage: Message = {
        id: '1',
        text: chatSteps[0].question,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([firstMessage]);
    }
  }, []);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');

    setTimeout(() => {
      if (currentStep < chatSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        addMessage(chatSteps[nextStep].question, 'bot');
      } else {
        addMessage("Perfect! Based on your preferences, here are some recommendations I think you'll love. Let me analyze your taste and find the perfect matches!", 'bot');
      }
    }, 1000);
  };

  const handleActorSelect = (actorName: string) => {
    setSelectedActors(prev => 
      prev.includes(actorName) 
        ? prev.filter(name => name !== actorName)
        : [...prev, actorName]
    );
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleNextStep = () => {
    const currentStepData = chatSteps[currentStep];
    
    if (currentStepData.type === 'actors') {
      addMessage(`Selected actors: ${selectedActors.join(', ')}`, 'user');
    } else if (currentStepData.type === 'genres') {
      addMessage(`Preferred genres: ${selectedGenres.join(', ')}`, 'user');
    }

    setTimeout(() => {
      if (currentStep < chatSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        addMessage(chatSteps[nextStep].question, 'bot');
      } else {
        addMessage("Excellent! Let me analyze your preferences and create personalized recommendations just for you. This might take a moment... ✨", 'bot');
      }
    }, 1000);
  };

  const handleMovieClick = (movie: any) => {
    if (onMovieClick) {
      onMovieClick(movie);
    } else {
      setSelectedMovie(movie);
      setShowMovieModal(true);
    }
  };

  const currentStepData = chatSteps[currentStep];

  return (
    <>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Chat Messages */}
            {messages.map((message, index) => (
              <div 
                key={message.id}
                className={`flex items-start space-x-4 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === 'bot' 
                    ? 'bg-moviefy-yellow text-moviefy-black' 
                    : 'bg-moviefy-gray-dark text-white'
                }`}>
                  {message.sender === 'bot' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>

                {/* Message */}
                <div className={`flex-1 p-4 rounded-2xl ${
                  message.sender === 'bot' 
                    ? 'bg-moviefy-gray-dark text-white' 
                    : 'bg-moviefy-yellow text-moviefy-black'
                }`}>
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Actor Selection Cards */}
            {currentStepData?.type === 'actors' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {mockActors.map((actor, index) => (
                    <div 
                      key={actor.name}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className="animate-slide-up"
                    >
                      <ActorCard
                        name={actor.name}
                        image={actor.image}
                        rating={actor.rating}
                        isSelected={selectedActors.includes(actor.name)}
                        onClick={() => handleActorSelect(actor.name)}
                      />
                    </div>
                  ))}
                </div>
                {selectedActors.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <Button 
                      onClick={handleNextStep}
                      className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-full px-8 hover-glow"
                    >
                      Continue ({selectedActors.length} selected)
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Genre Selection */}
            {currentStepData?.type === 'genres' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  {currentStepData.options?.map((genre, index) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreSelect(genre)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className={`p-4 rounded-xl transition-all duration-200 animate-slide-up ${
                        selectedGenres.includes(genre)
                          ? 'bg-moviefy-yellow text-moviefy-black'
                          : 'bg-moviefy-gray-dark text-white hover:bg-moviefy-gray-medium'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {selectedGenres.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <Button 
                      onClick={handleNextStep}
                      className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-full px-8 hover-glow"
                    >
                      Get My Recommendations ({selectedGenres.length} selected)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        {currentStepData?.type === 'text' && (
          <div className="p-6 border-t border-moviefy-gray-dark">
            <div className="flex space-x-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your response here..."
                className="flex-1 bg-moviefy-gray-dark border-moviefy-gray-light text-white placeholder-moviefy-gray-light rounded-xl focus:border-moviefy-yellow focus:ring-moviefy-yellow"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl hover-glow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* All Recommendations in Chat */}
        <div className="p-6 border-t border-moviefy-gray-dark">
          {/* Movie Recommendations */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Film className="h-6 w-6 text-moviefy-yellow" />
              <h3 className="text-xl font-semibold text-white">Recommended Movies</h3>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4 md:overflow-x-auto pb-4">
              {mockMovies.map((movie, index) => (
                <div
                  key={movie.title}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-fade-in md:flex-shrink-0 md:w-48 w-full"
                >
                  {isMobile ? (
                    <CompactMovieCard
                      title={movie.title}
                      image={movie.image}
                      year={movie.year}
                      genre={movie.genre.join(', ')}
                      rating={movie.rating}
                      onClick={() => handleMovieClick(movie)}
                    />
                  ) : (
                    <MovieCard
                      title={movie.title}
                      image={movie.image}
                      year={movie.year}
                      genre={movie.genre.join(', ')}
                      rating={movie.rating}
                      onClick={() => handleMovieClick(movie)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Series Recommendations */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Tv className="h-6 w-6 text-moviefy-yellow" />
              <h3 className="text-xl font-semibold text-white">Recommended Series</h3>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4 md:overflow-x-auto pb-4">
              {mockSeries.map((series, index) => (
                <div
                  key={series.title}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-fade-in md:flex-shrink-0 md:w-48 w-full"
                >
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

          {/* Anime Recommendations */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-white">Recommended Anime</h3>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4 md:overflow-x-auto pb-4">
              {mockAnime.map((anime, index) => (
                <div
                  key={anime.title}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-fade-in md:flex-shrink-0 md:w-48 w-full"
                >
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
        </div>
      </div>

      {/* Movie Modal */}
      <MovieModal
        isOpen={showMovieModal}
        onClose={() => setShowMovieModal(false)}
        movie={selectedMovie}
      />
    </>
  );
};

export default ChatInterface;
