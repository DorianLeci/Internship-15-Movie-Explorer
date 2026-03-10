import styles from './MovieCard.module.scss';
import defaultPoster from '../../assets/images/default-poster.svg';
import type { Movie } from '../../types/Movie';
import { useFavorites } from '../../hooks/useFavorites';
import { FaStar } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id.toString());

  return (
    <div className={styles.card} onClick={onClick}>
      {favorite && <FaStar className={styles.starIcon} size={55} />}
      <div className={styles.favoriteBtn}></div>
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        className={styles.poster}
        src={
          movie.poster_path
            ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
            : defaultPoster
        }
        alt={movie.title}
      />
      <div className={styles.info}>
        <p>Release date: {movie.release_date}</p>
        <p className={styles.rating}>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};
