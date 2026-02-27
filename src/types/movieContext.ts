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

export interface MovieContextType {
  browse: FetchState;
  search: FetchState;
  searchQuery: string;
  debouncedQuery: string;
  setSearchQuery: (query: string) => void;
}
