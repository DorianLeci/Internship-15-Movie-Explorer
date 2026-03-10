import styles from './HomePage.module.scss';
import { FaFilm, FaStar, FaChartLine } from 'react-icons/fa';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.homeTitle}>Welcome to Movie Explorer</h1>
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h2 className={styles.title}>Search movies</h2>
          <span className={styles.subtitle}>
            Quicky find most popular movies
          </span>
          <FaChartLine size={80} color="red" />
        </div>
        <div className={styles.featureCard}>
          <h2 className={styles.title}>Movie details</h2>
          <span className={styles.subtitle}>Explore cast and reviews</span>
          <FaFilm size={80} color="cyan" />
        </div>
        <div className={styles.featureCard}>
          <h2 className={styles.title}>Favorites</h2>
          <span className={styles.subtitle}>Save your favorite movies</span>
          <FaStar size={80} color="yellow" />
        </div>
      </section>
    </div>
  );
};
