import { useMovies } from '../../hooks/useMovies';
import style from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const { searchQuery, setSearchQuery } = useMovies();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies"
      value={searchQuery}
      onChange={handleChange}
      className={style.input}
    ></input>
  );
};
