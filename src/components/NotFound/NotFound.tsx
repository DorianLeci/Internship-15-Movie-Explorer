import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <FaExclamationTriangle size={180} color="yellow" />
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Page not found</p>
    </div>
  );
};
