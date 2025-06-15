import apiClient from './apiClient';

export const getTrendingMovies = async () => {
  return apiClient.get('/movies/trending');
};

export const searchMovies = async (query) => {
  return apiClient.get('/movies/search', { params: { query } });
};

export const getMovieDetails = async (movieId) => {
  return apiClient.get(`/movies/${movieId}`);
};

export const addToWatchlist = async (movieId, status) => {
  return apiClient.post('/movies/list', { movieId, status });
};

export const getUserWatchlist = async (status) => {
  return apiClient.get('/movies/list', { params: { status } });
};