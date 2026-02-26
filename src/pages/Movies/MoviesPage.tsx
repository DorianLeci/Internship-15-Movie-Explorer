import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import type { MoviesResponse } from '../../types/movies';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMovies } from '../../hooks/useMovies';
import type { Movie } from '../../types/movies';
import style from './MoviesPage.module.scss';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const PAGE_LENGTH = 20;

export const MoviesPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const { movies, setMovies, page, setPage, fetchedPages } = useMovies();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error, refetch } = usePaginatedFetch<MoviesResponse>(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    fetchedPages.current.has(page) || !hasMore,
  );

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!data?.results) return;

    setMovies((prev: Movie[]) => {
      const existingIds = prev.map((movie) => movie.id);

      const newMovies = data.results.filter(
        (movie) => !existingIds.includes(movie.id),
      );

      return [...prev, ...newMovies];
    });

    fetchedPages.current.add(page);

    if (data.results.length < PAGE_LENGTH) setHasMore(false);
  }, [data]);

  return (
    <div className={style.container} ref={containerRef}>
      {loading && <Spinner />}
      {error && <ErrorCard message={error} onRetry={refetch} />}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
