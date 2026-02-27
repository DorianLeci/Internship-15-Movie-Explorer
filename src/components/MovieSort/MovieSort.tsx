import { MovieSortBy } from '../../enums/MovieSortBy';
import { MovieSortDirection } from '../../enums/MovieSortDirection';
import { useMovies } from '../../hooks/useMovies';
import styles from './MovieSort.module.scss';

export const MovieSort = () => {
  const { filters } = useMovies();
  const { sortBy, setSortBy, sortDirection, setSortDirection } = filters;

  return (
    <div className={styles.sortWrapper}>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as MovieSortBy)}
      >
        <option value={MovieSortBy.POPULARITY}>Popularity</option>
        <option value={MovieSortBy.RATING}>Rating</option>
        <option value={MovieSortBy.RELEASE_DATE}>Release date</option>
        <option value={MovieSortBy.TITLE}>Title</option>
      </select>

      <button
        onClick={() =>
          sortDirection === MovieSortDirection.ASC
            ? setSortDirection(MovieSortDirection.DESC)
            : setSortDirection(MovieSortDirection.ASC)
        }
      >
        {sortDirection}
      </button>
    </div>
  );
};
