import { useState } from 'react';
import { MovieSortBy } from '../../enums/MovieSortBy';
import { MovieSortDirection } from '../../enums/MovieSortDirection';
import { useMovies } from '../../hooks/useMovies';
import styles from './MovieSort.module.scss';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SortOptionsMap } from '../../helpers/SortOptionsMap';
import { useToggle } from '../../hooks/useToggle';

export const MovieSort = () => {
  const { filters } = useMovies();
  const { sortBy, setSortBy, sortDirection, setSortDirection } = filters;
  const { open, setOpen, toggle } = useToggle();

  const handleSelect = (value: MovieSortBy) => {
    setSortBy(value);
    setOpen(false);
  };

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.selectOption}>
        <div
          className={`${styles.inputLike} ${filters.query ? styles.disabled : ''}`}
          onClick={() => toggle()}
        >
          {SortOptionsMap[sortBy]}
        </div>

        <div className={`${styles.options} ${open ? styles.active : ''}`}>
          {Object.entries(SortOptionsMap).map(([value, label]) => (
            <li onClick={() => handleSelect(value as MovieSortBy)} key={value}>
              {label}
            </li>
          ))}
        </div>
      </div>

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
