import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Heart, Eye, Clock, Tv, Zap } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserWatchlist } from '../api/movieApi';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SeriesCard from '@/components/SeriesCard';
import AnimeCard from '@/components/AnimeCard';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

type MediaItem = {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genres: string[];
  media_type: 'movie' | 'tv';
  number_of_seasons?: number;
  number_of_episodes?: number;
};

const Profile = () => {
  const { user } = useAuth();
  const [selectedContent, setSelectedContent] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all watchlist categories in parallel
  const { data: watchlists, isLoading } = useQuery({
    queryKey: ['userWatchlist'],
    queryFn: async () => {
      const [favorites, watched, toWatch] = await Promise.all([
        getUserWatchlist('favorite'),
        getUserWatchlist('watched'),
        getUserWatchlist('to_watch')
      ]);
      return { favorites, watched, toWatch };
    }
  });

  const handleContentClick = (content: MediaItem) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const MediaSection = ({ 
    title, 
    items, 
    icon,
    isLoading
  }: { 
    title: string; 
    items?: MediaItem[];
    icon: React.ReactNode;
    isLoading: boolean;
  }) => (
    <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {icon}
          <span>{title}</span>
          {!isLoading && (
            <span className="text-moviefy-gray-light text-sm">({items?.length || 0})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.media_type === 'tv' ? (
                  <SeriesCard
                    title={item.title}
                    image={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    year={item.first_air_date ? new Date(item.first_air_date).getFullYear() : undefined}
                    genre={item.genres.join(', ')}
                    rating={item.vote_average}
                    seasons={item.number_of_seasons}
                    onClick={() => handleContentClick(item)}
                  />
                ) : (
                  <MovieCard
                    title={item.title}
                    image={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    year={item.release_date ? new Date(item.release_date).getFullYear() : undefined}
                    genre={item.genres.join(', ')}
                    rating={item.vote_average}
                    onClick={() => handleContentClick(item)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-moviefy-gray-light text-center py-8">No {title.toLowerCase()} yet</p>
        )}
      </CardContent>
    </Card>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-moviefy-black">
        <Header />
        <main className="container mx-auto px-6 pt-24 pb-8">
          <div className="max-w-6xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-white mb-4">Please sign in to view your profile</h1>
            <Button className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* User Info */}
          <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="bg-moviefy-gray-medium text-moviefy-gray-light text-xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{user.username}</h1>
                  <p className="text-moviefy-gray-light">{user.email}</p>
                  <p className="text-moviefy-gray-light text-sm">
                    Member since {format(new Date(user.createdAt), 'MMMM yyyy')}
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">
                        {isLoading ? '--' : watchlists?.favorites?.length || 0}
                      </div>
                      <div className="text-moviefy-gray-light">Favorites</div>
                    </div>
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">
                        {isLoading ? '--' : watchlists?.watched?.length || 0}
                      </div>
                      <div className="text-moviefy-gray-light">Watched</div>
                    </div>
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">
                        {isLoading ? '--' : watchlists?.toWatch?.length || 0}
                      </div>
                      <div className="text-moviefy-gray-light">To Watch</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl px-6"
                  disabled={isLoading}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Media Lists */}
          <div className="space-y-6">
            <MediaSection
              title="Favorite Movies & Shows"
              items={watchlists?.favorites}
              icon={<Heart className="h-5 w-5 text-moviefy-yellow" />}
              isLoading={isLoading}
            />
            
            <MediaSection
              title="Watched"
              items={watchlists?.watched}
              icon={<Eye className="h-5 w-5 text-moviefy-yellow" />}
              isLoading={isLoading}
            />
            
            <MediaSection
              title="To Watch"
              items={watchlists?.toWatch}
              icon={<Clock className="h-5 w-5 text-moviefy-yellow" />}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Content Modal */}
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

export default Profile;