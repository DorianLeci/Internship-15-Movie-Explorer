import { useContext } from 'react';
import { MovieContext } from '../context/MoviesContext';

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error('useMovies must be used within a MoviesProvider');
  return context;
};
