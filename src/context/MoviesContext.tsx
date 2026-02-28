import type { MovieContextType } from '../types/movieContext';
import type { MoviesState } from '../types/movieContext';
import { createContext, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { MovieSortBy } from '../enums/MovieSortBy';
import { MovieSortDirection } from '../enums/MovieSortDirection';
import { useBrowseMovies } from '../hooks/useBrowseMovies';
import { useSearchMovies } from '../hooks/useSearchMovies';

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: MoviesProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [sortBy, setSortBy] = useState<MovieSortBy>(MovieSortBy.POPULARITY);
  const [sortDirection, setSortDirection] = useState<MovieSortDirection>(
    MovieSortDirection.DESC,
  );

  const browse = useBrowseMovies({ sortBy, sortDirection });
  const search = useSearchMovies({
    query: debouncedQuery,
    browseState: browse.moviesState,
  });

  return (
    <MovieContext.Provider
      value={{
        browse,
        search,
        filters: {
          query: searchQuery,
          debouncedQuery,
          setQuery: setSearchQuery,
          sortBy,
          setSortBy,
          sortDirection,
          setSortDirection,
        },
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
