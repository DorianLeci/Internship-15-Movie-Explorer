import type { MovieContextType } from '../types/movieContext';
import type { Movie } from '../types/movies';
import { createContext, useRef, useState } from 'react';

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const fetchedPages = useRef<Set<number>>(new Set());

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        page,
        setPage,
        fetchedPages,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
