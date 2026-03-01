import { CrewJob } from '../../enums/CrewJob';
import type { CrewMember } from '../../types/CrewMember';
import styles from './MovieCrew.module.scss';

interface MovieCrewProps {
  crew?: CrewMember[];
}

export const MovieCrew = ({ crew }: MovieCrewProps) => {
  const filteredCrew = crew?.filter((member) =>
    Object.values(CrewJob).includes(member.job as CrewJob),
  );

  if (!filteredCrew?.length) return null;

  return (
    <section className={styles.crewContainer}>
      <h2 className={styles.title}>Top Crew</h2>
      <div className={styles.cardScrollContainer}>
        <div className={styles.cardContainer}>
          {filteredCrew.map((member) => (
            <div key={`${member.id}-${member.job}`} className={styles.card}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.job}>{member.job}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
