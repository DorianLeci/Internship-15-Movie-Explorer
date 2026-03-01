import { CrewJob } from '../../enums/CrewJob';
import type { CrewMember } from '../../types/CrewMember';
import styles from '../../styles/MoviePeople.module.scss';

interface MovieCrewProps {
  crew?: CrewMember[];
}

export const MovieCrew = ({ crew }: MovieCrewProps) => {
  const filteredCrew = crew?.filter((member) =>
    Object.values(CrewJob).includes(member.job as CrewJob),
  );

  if (!filteredCrew?.length) return null;

  return (
    <section className={styles.peopleContainer}>
      <h2 className={styles.title}>Top Crew</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.cardContainer}>
          {filteredCrew.map((member) => (
            <div key={`${member.id}-${member.job}`} className={styles.card}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.role}>{member.job}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
