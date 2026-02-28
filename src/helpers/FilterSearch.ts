import type { Movie, MoviesResponse } from '../types/movies';

interface FilterOptions {
  data: MoviesResponse | null;
  minVoteCount: number;
  minVoteAverage: number;
  topResultsCount: number;
}

export function filterSearchResults({
  data,
  minVoteCount,
  minVoteAverage,
  topResultsCount,
}: FilterOptions): MoviesResponse | null {
  if (!data || !data.results) return null;

  const filteredResults: Movie[] = data.results
    .filter(
      (m) => m.vote_count >= minVoteCount && m.vote_average >= minVoteAverage,
    )
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, topResultsCount);

  return {
    ...data,
    results: filteredResults,
  };
}
