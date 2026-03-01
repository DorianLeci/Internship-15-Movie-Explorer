import { useEffect, useState } from 'react';
import type { MoviesState } from '../types/MovieContextType';
import type { MoviesResponse } from '../types/MovieResponse';
import { usePaginatedFetch } from './usePaginatedFetch';
import { useFetchedData } from './useFetchedData';
import type { MovieSortBy } from '../enums/MovieSortBy';
import type { MovieSortDirection } from '../enums/MovieSortDirection';
import { API_KEY, BASE_URL } from '../api/config';

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPageNum: 1,
};

interface UseBrowseOptions {
  sortBy: MovieSortBy;
  sortDirection: MovieSortDirection;
}

export function useBrowseMovies({ sortBy, sortDirection }: UseBrowseOptions) {
  const [browseState, setBrowseState] = useState<MoviesState>(initialState);

  const canLoad = browseState.page <= browseState.totalPageNum;

  const { data, loading, error, refetch } = usePaginatedFetch<MoviesResponse>({
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}.${sortDirection}&page=${browseState.page}&vote_count.gte=1000&vote_average.gte=5`,
    skip: !canLoad,
  });

  useEffect(() => {
    setBrowseState(initialState);
  }, [sortBy, sortDirection]);

  useFetchedData({ data, callback: setBrowseState });

  console.log(data);
  return {
    moviesState: browseState,
    loading,
    error,
    refetch,
    loadMore: () =>
      setBrowseState((prev) => ({
        ...prev,
        page: prev.page + 1,
      })),
  };
}
