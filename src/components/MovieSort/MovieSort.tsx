import { MovieSortBy } from '../../enums/MovieSortBy';
import { MovieSortDirection } from '../../enums/MovieSortDirection';
import { useMovies } from '../../hooks/useMovies';
import styles from './MovieSort.module.scss';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export const MovieSort = () => {
  const { filters } = useMovies();
  const { sortBy, setSortBy, sortDirection, setSortDirection } = filters;

  return (
    <div className={styles.sortWrapper}>
      <label className={styles.selectLabel}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as MovieSortBy)}
          disabled={!!filters.query}
        >
          <option value={MovieSortBy.POPULARITY}>Popularity</option>
          <option value={MovieSortBy.RATING}>Rating</option>
          <option value={MovieSortBy.RELEASE_DATE}>Release date</option>
          <option value={MovieSortBy.TITLE}>Title</option>
        </select>
      </label>

      <button
        className={styles.directionButton}
        onClick={() =>
          sortDirection === MovieSortDirection.ASC
            ? setSortDirection(MovieSortDirection.DESC)
            : setSortDirection(MovieSortDirection.ASC)
        }
        disabled={!!filters.query}
      >
        {sortDirection === MovieSortDirection.ASC ? (
          <FaArrowUp></FaArrowUp>
        ) : (
          <FaArrowDown></FaArrowDown>
        )}
      </button>
    </div>
  );
};
