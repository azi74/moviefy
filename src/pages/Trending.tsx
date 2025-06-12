
import { useState } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieModal from '@/components/MovieModal';

// Extended mock movies for the trending page
const trendingMovies = [
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
  },
  {
    title: 'Goodfellas',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    year: 1990,
    genre: ['Crime', 'Drama'],
    rating: 8.7,
    imdbRating: 8.7,
    rottenTomatoesScore: 96,
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
    cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci', 'Lorraine Bracco']
  },
  {
    title: 'The Shawshank Redemption',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    year: 1994,
    genre: ['Drama'],
    rating: 9.3,
    imdbRating: 9.3,
    rottenTomatoesScore: 91,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler']
  },
  {
    title: 'The Godfather',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    year: 1972,
    genre: ['Crime', 'Drama'],
    rating: 9.2,
    imdbRating: 9.2,
    rottenTomatoesScore: 97,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton']
  },
  {
    title: 'Forrest Gump',
    image: 'https://images.unsplash.com/photo-1489599009821-f8e1b0a9a0e1?w=400&h=600&fit=crop',
    year: 1994,
    genre: ['Drama', 'Romance'],
    rating: 8.8,
    imdbRating: 8.8,
    rottenTomatoesScore: 71,
    description: 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise', 'Sally Field']
  },
  {
    title: 'Fight Club',
    image: 'https://images.unsplash.com/photo-1478720568477-b0ac8d6c6d27?w=400&h=600&fit=crop',
    year: 1999,
    genre: ['Drama'],
    rating: 8.8,
    imdbRating: 8.8,
    rottenTomatoesScore: 79,
    description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Meat Loaf']
  },
  {
    title: 'The Matrix',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
    year: 1999,
    genre: ['Action', 'Sci-Fi'],
    rating: 8.7,
    imdbRating: 8.7,
    rottenTomatoesScore: 88,
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving']
  },
  {
    title: 'Star Wars: A New Hope',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
    year: 1977,
    genre: ['Adventure', 'Fantasy', 'Sci-Fi'],
    rating: 8.6,
    imdbRating: 8.6,
    rottenTomatoesScore: 93,
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy.',
    cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Alec Guinness']
  },
  {
    title: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    year: 1942,
    genre: ['Drama', 'Romance', 'War'],
    rating: 8.5,
    imdbRating: 8.5,
    rottenTomatoesScore: 99,
    description: 'A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.',
    cast: ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid', 'Claude Rains']
  }
];

const Trending = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-moviefy-black">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Trending <span className="text-moviefy-yellow">Movies</span>
              </h1>
              <p className="text-xl text-moviefy-gray-light max-w-2xl mx-auto">
                Discover the most popular and trending movies right now
              </p>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingMovies.map((movie, index) => (
                <div
                  key={movie.title}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-fade-in"
                >
                  <MovieCard
                    title={movie.title}
                    image={movie.image}
                    year={movie.year}
                    genre={movie.genre.join(', ')}
                    rating={movie.rating}
                    onClick={() => handleMovieClick(movie)}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
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

export default Trending;
