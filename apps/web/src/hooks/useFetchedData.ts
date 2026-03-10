import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { MoviesResponse } from '../types/MovieResponse';
import type { MoviesState } from '../types/MovieContextType';

interface UseFetchedDataOptions {
  data: MoviesResponse | null | undefined;
  callback: Dispatch<SetStateAction<MoviesState>>;
}

export function useFetchedData({ data, callback }: UseFetchedDataOptions) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!data?.results) return;

    savedCallback.current((prev) => {
      const existingIds = new Set(prev.movies.map((movie) => movie.id));

      const newMovies = data.results.filter(
        (movie) => !existingIds.has(movie.id),
      );

      return {
        ...prev,
        movies: [...prev.movies, ...newMovies],
        totalPageNum: data.total_pages,
      };
    });
  }, [data]);
}
