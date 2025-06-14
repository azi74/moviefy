import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Heart, Eye, Clock, Tv, Film as FilmIcon, Zap } from "lucide-react";
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SeriesCard from '@/components/SeriesCard';
import AnimeCard from '@/components/AnimeCard';
import MovieModal from '@/components/MovieModal';
import Footer from '@/components/Footer';

const Profile = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const handleContentClick = (content: any) => {
    setSelectedMovie({
      ...content,
      genre: Array.isArray(content.genre) ? content.genre : [content.genre],
      imdbRating: content.rating,
      rottenTomatoesScore: Math.floor(content.rating * 10),
      description: "An epic journey through time and space that challenges the very fabric of reality. This masterpiece combines stunning visuals with a mind-bending narrative that will leave you questioning everything you thought you knew about the universe. The film explores themes of memory, reality, and the subconscious mind through a complex multi-layered storyline that unfolds across different levels of dreams within dreams. Each layer presents its own unique challenges and dangers, creating a thrilling experience that keeps viewers engaged from start to finish. The exceptional cinematography and groundbreaking special effects work in harmony with a compelling score to create an unforgettable cinematic experience that pushes the boundaries of what's possible in modern filmmaking.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
    });
    setIsMovieModalOpen(true);
  };

  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "January 2024"
  });

  const favoriteMovies = [
    {
      title: 'Inception',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8
    },
    {
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
      year: 2008,
      genre: 'Action',
      rating: 9.0
    }
  ];

  const watchedMovies = [
    {
      title: 'Interstellar',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.6
    },
    {
      title: 'Pulp Fiction',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      year: 1994,
      genre: 'Crime',
      rating: 8.9
    }
  ];

  const toWatchMovies = [
    {
      title: 'Dune',
      image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop',
      year: 2021,
      genre: 'Sci-Fi',
      rating: 8.0
    }
  ];

  const series = [
    {
      title: 'Breaking Bad',
      image: 'https://images.unsplash.com/photo-1594736797933-d0051ba2fe65?w=400&h=600&fit=crop',
      year: 2008,
      genre: 'Drama',
      rating: 9.5,
      seasons: 5
    },
    {
      title: 'Stranger Things',
      image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
      year: 2016,
      genre: 'Sci-Fi',
      rating: 8.7,
      seasons: 4
    }
  ];

  const anime = [
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
    }
  ];

  const MovieSection = ({ title, movies, icon }: { title: string; movies: any[]; icon: React.ReactNode }) => (
    <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {icon}
          <span>{title}</span>
          <span className="text-moviefy-gray-light text-sm">({movies.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard
                  title={movie.title}
                  image={movie.image}
                  year={movie.year}
                  genre={movie.genre}
                  rating={movie.rating}
                  onClick={() => handleContentClick(movie)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-moviefy-gray-light text-center py-8">No {title.toLowerCase()} yet</p>
        )}
      </CardContent>
    </Card>
  );

  const SeriesSection = ({ title, series, icon }: { title: string; series: any[]; icon: React.ReactNode }) => (
    <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {icon}
          <span>{title}</span>
          <span className="text-moviefy-gray-light text-sm">({series.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {series.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {series.map((show, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SeriesCard
                  title={show.title}
                  image={show.image}
                  year={show.year}
                  genre={show.genre}
                  rating={show.rating}
                  seasons={show.seasons}
                  onClick={() => handleContentClick(show)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-moviefy-gray-light text-center py-8">No {title.toLowerCase()} yet</p>
        )}
      </CardContent>
    </Card>
  );

  const AnimeSection = ({ title, anime, icon }: { title: string; anime: any[]; icon: React.ReactNode }) => (
    <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {icon}
          <span>{title}</span>
          <span className="text-moviefy-gray-light text-sm">({anime.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {anime.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {anime.map((show, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimeCard
                  title={show.title}
                  image={show.image}
                  year={show.year}
                  genre={show.genre}
                  rating={show.rating}
                  episodes={show.episodes}
                  onClick={() => handleContentClick(show)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-moviefy-gray-light text-center py-8">No {title.toLowerCase()} yet</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-moviefy-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* User Info */}
          <Card className="bg-moviefy-gray-dark border-moviefy-gray-medium animate-fade-in">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-moviefy-gray-medium text-moviefy-gray-light text-xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-moviefy-gray-light mb-2">{user.email}</p>
                  <p className="text-moviefy-gray-light text-sm mb-4">Member since {user.joinDate}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">{favoriteMovies.length}</div>
                      <div className="text-moviefy-gray-light">Favorites</div>
                    </div>
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">{watchedMovies.length}</div>
                      <div className="text-moviefy-gray-light">Watched</div>
                    </div>
                    <div className="text-center">
                      <div className="text-moviefy-yellow font-bold text-lg">{toWatchMovies.length}</div>
                      <div className="text-moviefy-gray-light">To Watch</div>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light rounded-xl px-6">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Movie Lists */}
          <div className="space-y-6">
            <MovieSection 
              title="Favorite Movies" 
              movies={favoriteMovies} 
              icon={<Heart className="h-5 w-5 text-moviefy-yellow" />}
            />
            
            <MovieSection 
              title="Watched Movies" 
              movies={watchedMovies} 
              icon={<Eye className="h-5 w-5 text-moviefy-yellow" />}
            />
            
            <MovieSection 
              title="To Watch Movies" 
              movies={toWatchMovies} 
              icon={<Clock className="h-5 w-5 text-moviefy-yellow" />}
            />
            
            <SeriesSection 
              title="Series" 
              series={series} 
              icon={<Tv className="h-5 w-5 text-moviefy-yellow" />}
            />
            
            <AnimeSection 
              title="Anime" 
              anime={anime} 
              icon={<Zap className="h-5 w-5 text-purple-500" />}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Movie Modal */}
      <MovieModal 
        isOpen={isMovieModalOpen}
        onClose={() => setIsMovieModalOpen(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Profile;
