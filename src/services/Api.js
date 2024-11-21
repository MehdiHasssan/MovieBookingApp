import axios from 'axios';
import { TMDB_API_KEY } from '@env';


// Base URL for The Movie Database API
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: TMDB_API_KEY, 
  },
});

// Fetch upcoming movies
export const getUpcomingMovies = async () => {
  try {
    const response = await apiClient.get('/movie/upcoming');
    // console.log(response.data.results,'response from upcoming movies')
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Fetch movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Fetch movie trailer by ID
export const getMovieTrailers = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie trailers:', error);
    throw error;
  }
};

// Fetch movie images by ID
export const getMovieImages = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie images:', error);
    throw error;
  }
};

// Search for movies
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export default apiClient;
