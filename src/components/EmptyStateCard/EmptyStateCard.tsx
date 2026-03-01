import styles from './EmptyStateCard.module.scss';
import { TbMovieOff } from 'react-icons/tb';

interface EmptyStateCardProps {
  query?: string;
  title: string;
  subtitle: string;
}

export const EmptyStateCard = ({
  query,
  title,
  subtitle,
}: EmptyStateCardProps) => {
  return (
    <div className={styles.wrapper}>
      <TbMovieOff className={styles.icon} />
      <h2 className={styles.title}>
        {title}
        {query && <span>"{query}"</span>}
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
