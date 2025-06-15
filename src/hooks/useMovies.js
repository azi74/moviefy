import { useQuery } from '@tanstack/react-query';
import { getTrendingMovies, searchMovies } from '../api/movieApi';

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  });
};

export const useMovieSearch = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
};