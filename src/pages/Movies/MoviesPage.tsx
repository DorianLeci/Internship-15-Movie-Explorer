import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { useRef } from 'react';
import { useMovies } from '../../hooks/useMovies';
import style from './MoviesPage.module.scss';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { MovieSearch } from '../../components/MovieSearch/MovieSearch';
import { EmptyStateCard } from '../../components/EmptyStateCard/EmptyStateCard';

export const MoviesPage = () => {
  const { browse, search, searchQuery, debouncedQuery } = useMovies();
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
    <div className={style.wrapper}>
      <div className={style.searchWrapper}>
        <MovieSearch />
      </div>

      <div className={style.container} ref={containerRef}>
        {loading && <Spinner />}
        {error && <ErrorCard message={error} onRetry={refetch} />}
        {moviesToRender.length === 0 &&
          !loading &&
          !error &&
          debouncedQuery && <EmptyStateCard />}
        {moviesToRender.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
