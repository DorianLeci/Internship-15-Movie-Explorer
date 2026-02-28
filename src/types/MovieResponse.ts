import type { Movie } from './Movie';

export interface MoviesResponse {
  results: Movie[];
  refetch: () => void;
  total_pages: number;
}
