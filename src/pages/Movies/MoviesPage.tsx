import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { useRef } from 'react';
import { useMovies } from '../../hooks/useMovies';
import styles from './MoviesPage.module.scss';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { MovieSearch } from '../../components/MovieSearch/MovieSearch';
import { EmptyStateCard } from '../../components/EmptyStateCard/EmptyStateCard';
import { MovieSort } from '../../components/MovieSort/MovieSort';
import { useNavigate } from 'react-router-dom';
import { useSpinner } from '../../hooks/useSpinner';

export const MoviesPage = () => {
  const navigate = useNavigate();
  const { browse, search, filters } = useMovies();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeState = filters.query ? search : browse;

  const moviesToRender = activeState.moviesState.movies;
  const loading = activeState.loading;
  const error = activeState.error;
  const refetch = activeState.refetch;
  const loadMore = activeState.loadMore;

  const showSpinner = useSpinner({ loading });

  useInfiniteScroll({
    containerRef,
    callback: () => loadMore(),
    canLoadMore: !loading,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <MovieSearch />
        <MovieSort />
      </div>

      <div className={styles.container} ref={containerRef}>
        {showSpinner && <Spinner text="Loading movies..." />}
        {!showSpinner && error && (
          <ErrorCard message={error} onRetry={refetch} />
        )}
        {!showSpinner && !error && moviesToRender.length === 0 && (
          <EmptyStateCard
            title="No films found for"
            subtitle="Try adjusting your keywords"
            query={filters.debouncedQuery}
          />
        )}
        {moviesToRender.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
