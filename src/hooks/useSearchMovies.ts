import { useEffect, useMemo, useState } from 'react';
import type { MoviesState } from '../types/movieContext';
import type { MoviesResponse } from '../types/movies';
import { usePaginatedFetch } from './usePaginatedFetch';
import { useFetchedData } from './useFetchedData';
import type { MovieSortBy } from '../enums/MovieSortBy';
import type { MovieSortDirection } from '../enums/MovieSortDirection';
import { filterSearchResults } from '../helpers/FilterSearch';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPageNum: 1,
};

interface UseSearchOptions {
  query: string;
  browseState: MoviesState;
  minVoteCount: number;
  minVoteAverage: number;
}

export function useSearchMovies({
  query,
  browseState,
  minVoteAverage,
  minVoteCount,
}: UseSearchOptions) {
  const [searchState, setSearchState] = useState<MoviesState>(initialState);

  const canLoad = query && searchState.page <= searchState.totalPageNum;

  const { data, loading, error, refetch } = usePaginatedFetch<MoviesResponse>({
    url: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${searchState.page}`,
    skip: !canLoad,
  });

  useEffect(() => {
    if (!query) setSearchState(browseState);
    else setSearchState(initialState);
  }, [query, browseState]);

  const filteredData = useMemo(() => {
    if (!data) return null;

    return filterSearchResults({
      data,
      minVoteCount,
      minVoteAverage,
    });
  }, [data]);

  useFetchedData({ data: filteredData, callback: setSearchState });

  return {
    moviesState: searchState,
    loading,
    error,
    refetch,
    loadMore: () => {
      if (filteredData?.results.length === 0) return;
      setSearchState((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    },
  };
}
