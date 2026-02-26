import styles from './MovieCard.module.scss';
import type { Movie } from '../../types/movies';

interface MovieCardProps {
  movie: Movie;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={styles.card}>
      <h1>{movie.title}</h1>
      <img
        className={styles.poster}
        src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Release year:{movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};
