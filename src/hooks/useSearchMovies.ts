import { useEffect, useMemo, useState } from 'react';
import type { MoviesState } from '../types/movieContext';
import type { MoviesResponse } from '../types/movies';
import { useFetchedData } from './useFetchedData';
import { filterSearchResults } from '../helpers/FilterSearch';
import { useFetchAllPages } from './useFetchAllPages';

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

  const { data, loading, error, refetch } = useFetchAllPages<MoviesResponse>({
    url: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`,
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
  }, [data]);

  useFetchedData({ data: filteredData, callback: setSearchState });

  return {
    moviesState: searchState,
    loading,
    error,
    refetch,
    loadMore: () => {},
  };
}
