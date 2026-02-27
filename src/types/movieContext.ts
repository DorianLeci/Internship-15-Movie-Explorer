import type { Dispatch, SetStateAction } from 'react';
import type { MovieSortBy } from '../enums/MovieSortBy';
import type { MovieSortDirection } from '../enums/MovieSortDirection';
import type { Movie } from './movies';

export interface MoviesState {
  movies: Movie[];
  page: number;
  totalPageNum: number;
}

interface FetchState {
  moviesState: MoviesState;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  loadMore: () => void;
}

interface FiltersState {
  query: string;
  setQuery: (query: string) => void;
  sortBy: MovieSortBy;
  setSortBy: Dispatch<SetStateAction<MovieSortBy>>;
  sortDirection: MovieSortDirection;
  setSortDirection: Dispatch<SetStateAction<MovieSortDirection>>;
}

export interface MovieContextType {
  browse: FetchState;
  search: FetchState;
  filters: FiltersState;
}
