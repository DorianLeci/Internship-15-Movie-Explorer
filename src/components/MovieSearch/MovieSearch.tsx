import { useMovies } from '../../hooks/useMovies';
import style from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const { searchQuery, setSearchQuery } = useMovies();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleChange}
      ></input>
    </div>
  );
};
