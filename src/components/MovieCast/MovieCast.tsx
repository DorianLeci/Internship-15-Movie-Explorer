import type { CastMember } from '../../types/CastMember';
import styles from './MovieCast.module.scss';

interface MovieCastProps {
  cast?: CastMember[];
  limit?: number;
}

export const MovieCast = ({ cast, limit = 5 }: MovieCastProps) => {
  if (!cast || cast.length === 0) return null;

  return (
    <section className={styles.castContainer}>
      <h2 className={styles.title}>Top cast</h2>
      <div className={styles.cardContainer}>
        {cast.slice(0, limit).map((actor) => (
          <div key={actor.id} className={styles.card}>
            <span className={styles.name}>{actor.name}</span>
            <span className={styles.character}>as {actor.character}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
