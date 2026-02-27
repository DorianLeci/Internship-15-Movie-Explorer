import type { Movie } from './movies';
import type { MoviesResponse } from '../../types/movies';

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
}
