import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { useRef } from 'react';
import { useMovies } from '../../hooks/useMovies';
import style from './MoviesPage.module.scss';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { MovieSearch } from '../../components/MovieSearch/MovieSearch';

export const MoviesPage = () => {
  const { browse, search, searchQuery } = useMovies();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeState = searchQuery ? search : browse;

  const moviesToRender = activeState.moviesState.movies;
  const loading = activeState.loading;
  const error = activeState.error;
  const refetch = activeState.refetch;
  const loadMore = activeState.loadMore;

  useInfiniteScroll({
    containerRef,
    callback: () => loadMore(),
    canLoadMore: !loading,
  });

  return (
    <div className={style.container} ref={containerRef}>
      <MovieSearch />
      {loading && <Spinner />}
      {error && <ErrorCard message={error} onRetry={refetch} />}
      {moviesToRender.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
