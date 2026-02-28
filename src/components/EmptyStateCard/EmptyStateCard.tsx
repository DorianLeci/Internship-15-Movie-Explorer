import { useMovies } from '../../hooks/useMovies';
import styles from './EmptyStateCard.module.scss';
import { TbMovieOff } from 'react-icons/tb';

interface EmptyStateCardProps {
  query: string;
}

export const EmptyStateCard = ({ query }: EmptyStateCardProps) => {
  return (
    <div className={styles.wrapper}>
      <TbMovieOff className={styles.icon} />
      <h2 className={styles.title}>
        No films found for <span>"{query}"</span>
      </h2>
      <p className={styles.subtitle}>Try adjusting your keywords</p>
    </div>
  );
};
