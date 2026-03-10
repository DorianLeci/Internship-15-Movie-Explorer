import styles from './ErrorCard.module.scss';
import { createPortal } from 'react-dom';

interface ErrorCardProps {
  message: string | null;
  onRetry: () => void;
}

export const ErrorCard = ({ message, onRetry }: ErrorCardProps) => {
  return createPortal(
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong!</div>
      <div className={styles.message}>{message}</div>
      <button className={styles.retryButton} onClick={onRetry}>
        Retry
      </button>
    </div>,
    document.body,
  );
};
