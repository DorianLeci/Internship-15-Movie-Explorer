import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { EmptyStateCard } from '../../components/EmptyStateCard/EmptyStateCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import styles from './FavoriteMoviesPage.module.scss';
import { useSpinner } from '../../hooks/useSpinner';

export const FavoriteMoviesPage = () => {
  const navigate = useNavigate();
  const { favoriteMovies, loading, error, refetch } = useFavorites();
  const showSpinner = useSpinner({ loading });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {showSpinner && <Spinner text="Loading favorite movies..." />}
        {!showSpinner && error && (
          <ErrorCard message={error} onRetry={refetch} />
        )}
        {!showSpinner &&
          !error &&
          (!favoriteMovies || favoriteMovies.length === 0) && (
            <EmptyStateCard
              title="You have no favorite movies yet"
              subtitle="Add some movies to your favorites to see them here"
            />
          )}
        {favoriteMovies?.map((movie) => (
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
