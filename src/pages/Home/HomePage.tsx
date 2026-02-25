import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.homeTitle}>Welcome to Movie Explorer</h1>
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h2>Search movies</h2>
          <span>Quicky find your favorite movies</span>
        </div>
        <div className={styles.featureCard}>
          <h2>Movie details</h2>
          <span>Explore cast and reviews</span>
        </div>
        <div className={styles.featureCard}>
          <h2>Favorites</h2>
          <span>Save your favorite movies</span>
        </div>
      </section>
    </div>
  );
};
