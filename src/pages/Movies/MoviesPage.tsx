import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import { Spinner } from '../../components/Spinner/Spinner';
import { useFetch } from '../../hooks/useFetch';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface MoviesResponse {
  results: Movie[];
  refetch: () => void;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const MoviesPage = () => {
  const { data, loading, error, refetch } = useFetch<MoviesResponse>(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  );

  console.log('Loading: ', loading);
  return (
    <>
      {loading && <Spinner />}
      {error && <ErrorCard message={error} onRetry={refetch} />}
    </>
  );
};
