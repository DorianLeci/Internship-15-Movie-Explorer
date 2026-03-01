import type { CastMember } from '../../types/CastMember';
import styles from '../../styles/MoviePeople.module.scss';

interface MovieCastProps {
  cast?: CastMember[];
  limit?: number;
}

export const MovieCast = ({ cast, limit = 10 }: MovieCastProps) => {
  if (!cast?.length) return null;

  return (
    <section className={styles.peopleContainer}>
      <h2 className={styles.title}>Top cast</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.cardContainer}>
          {cast.slice(0, limit).map((actor) => (
            <div key={actor.id} className={styles.card}>
              <span className={styles.name}>{actor.name}</span>
              <span className={styles.role}>as {actor.character}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
