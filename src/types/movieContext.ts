import type { Movie } from './movies';

export interface MovieContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchedPages: React.RefObject<Set<number>>;
}
