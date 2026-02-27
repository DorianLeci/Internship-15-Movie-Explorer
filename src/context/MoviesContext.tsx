import type { MovieContextType } from '../types/movieContext';
import type { MoviesState } from '../types/movieContext';
import type { MoviesResponse } from '../types/movies';
import { usePaginatedFetch } from '../hooks/usePaginatedFetch';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useFetchedData } from '../hooks/useFetchedData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPageNum: 1,
};

export const MovieProvider = ({ children }: MoviesProviderProps) => {
  const [browseState, setBrowseState] = useState<MoviesState>(initialState);
  const [searchState, setSearchState] = useState<MoviesState>(initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const canLoadBrowse = browseState.page <= browseState.totalPageNum;
  const {
    data: browseData,
    loading: browseLoading,
    error: browseError,
    refetch: browseRefetch,
  } = usePaginatedFetch<MoviesResponse>(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${browseState.page}`,
    !canLoadBrowse,
  );

  const canLoadSearch =
    debouncedQuery && searchState.page <= searchState.totalPageNum;

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = usePaginatedFetch<MoviesResponse>(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(debouncedQuery)}&page=${searchState.page}`,
    !canLoadSearch,
  );

  useFetchedData({ data: browseData, callback: setBrowseState });
  useFetchedData({ data: searchData, callback: setSearchState });

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    setSearchState(initialState);
  };

  return (
    <MovieContext.Provider
      value={{
        browse: {
          moviesState: browseState,
          loading: browseLoading,
          error: browseError,
          refetch: browseRefetch,
          loadMore: () =>
            setBrowseState((prev) => ({
              ...prev,
              page: prev.page + 1,
            })),
        },

        search: {
          moviesState: searchState,
          loading: searchLoading,
          error: searchError,
          refetch: searchRefetch,
          loadMore: () =>
            setSearchState((prev) => ({ ...prev, page: prev.page + 1 })),
        },
        searchQuery,
        setSearchQuery: handleSearchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
