export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export interface MoviesResponse {
  results: Movie[];
  refetch: () => void;
}
