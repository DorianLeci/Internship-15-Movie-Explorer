import type { Movie, MoviesResponse } from '../types/movies';

interface FilterOptions {
  data: MoviesResponse | null;
  minVoteCount: number;
  minVoteAverage: number;
}

export function filterSearchResults({
  data,
  minVoteCount,
  minVoteAverage,
}: FilterOptions): MoviesResponse | null {
  if (!data?.results) return data;

  const filteredResults = data.results.filter(
    (movie) =>
      movie.vote_count >= minVoteCount && movie.vote_average >= minVoteAverage,
  );

  return {
    ...data,
    results: filteredResults,
  };
}
