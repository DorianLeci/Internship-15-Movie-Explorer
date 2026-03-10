import { useMovies } from '../../hooks/useMovies';
import style from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const { filters } = useMovies();
  const { query, setQuery } = filters;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies"
      value={query}
      onChange={handleChange}
      className={style.input}
    ></input>
  );
};
