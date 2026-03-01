import { useNavigate } from 'react-router-dom';
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { EmptyStateCard } from '../../components/EmptyStateCard/EmptyStateCard';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import styles from './FavoriteMoviesPage.module.scss';

export const FavoriteMoviesPage = () => {
  const navigate = useNavigate();
  const { favoriteMovies, loading, error, refetch } = useFavorites();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Spinner
          text="Loading favorite movies..."
          loading={loading}
          minDisplayTime={300}
        />
        {error && <ErrorCard message={error} onRetry={refetch} />}
        {!loading &&
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
