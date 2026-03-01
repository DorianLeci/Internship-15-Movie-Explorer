import { useEffect, useMemo, useState } from 'react';
import type { MoviesState } from '../types/MovieContextType';
import type { MoviesResponse } from '../types/MovieResponse';
import { useFetchedData } from './useFetchedData';
import { filterSearchResults } from '../helpers/FilterSearch';
import { useFetchAllPages } from './useFetchAllPages';
import { API_KEY, BASE_URL } from '../api/config';

const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPageNum: 1,
};

interface UseSearchOptions {
  query: string;
  browseState: MoviesState;
  minVoteCount?: number;
  minVoteAverage?: number;
  topResultsCount?: number;
}

export function useSearchMovies({
  query,
  browseState,
  minVoteAverage = 5,
  minVoteCount = 1000,
  topResultsCount = 30,
}: UseSearchOptions) {
  const [searchState, setSearchState] = useState<MoviesState>(initialState);

  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    include_adult: 'false',
  });

  const { data, loading, error, refetch } = useFetchAllPages<MoviesResponse>({
    url: `${BASE_URL}/search/movie?${params}`,
  });

  useEffect(() => {
    if (!query) setSearchState(browseState);
    else setSearchState(initialState);
  }, [query, browseState]);

  const filteredData = useMemo(() => {
    if (!data) return null;
    const allMovies = data.flatMap((page) => page.results);

    return filterSearchResults({
      data: { results: allMovies, refetch, total_pages: 1 },
      minVoteCount,
      minVoteAverage,
      topResultsCount,
    });
  }, [data, minVoteCount, minVoteAverage, topResultsCount]);

  useFetchedData({ data: filteredData, callback: setSearchState });

  return {
    moviesState: searchState,
    loading,
    error,
    refetch,
    loadMore: () => {},
  };
}
