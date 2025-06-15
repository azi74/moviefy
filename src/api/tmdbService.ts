import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbService = {
  getTrendingMovies: () => {
    return axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY }
    }).then(res => res.data);
  },
  
  getTrendingTVShows: () => {
    return axios.get(`${BASE_URL}/trending/tv/week`, {
      params: { api_key: TMDB_API_KEY }
    }).then(res => res.data);
  },
  
  getTrendingAnime: () => {
    return axios.get(`${BASE_URL}/discover/tv`, {
      params: { 
        api_key: TMDB_API_KEY,
        with_genres: '16', // Animation genre
        with_keywords: '210024|287501' // Anime keywords
      }
    }).then(res => res.data);
  },

  getMovieDetails: (id: number) => {
    return axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,recommendations'
      }
    }).then(res => res.data);
  },

  getTVDetails: (id: number) => {
    return axios.get(`${BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,recommendations'
      }
    }).then(res => res.data);
  }
};