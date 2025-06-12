
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import ActorCard from './ActorCard';

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

const mockActors = [
  { name: 'Leonardo DiCaprio', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', rating: 4.8 },
  { name: 'Scarlett Johansson', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face', rating: 4.7 },
  { name: 'Robert Downey Jr.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face', rating: 4.9 },
  { name: 'Emma Stone', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face', rating: 4.6 },
  { name: 'Ryan Gosling', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', rating: 4.5 },
  { name: 'Margot Robbie', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face', rating: 4.7 }
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

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    // Start with the first question
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

    // Move to next step
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

  const currentStepData = chatSteps[currentStep];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
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
    </div>
  );
};

export default ChatInterface;
