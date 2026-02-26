import styles from './MovieCard.module.scss';
import type { Movie } from '../../types/movies';
import defaultPoster from '../../assets/images/default-poster.png';

interface MovieCardProps {
  movie: Movie;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={styles.card}>
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
