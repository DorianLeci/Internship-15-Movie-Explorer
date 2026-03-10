import { useEffect, useState } from 'react';
import type { Movie } from '../types/Movie';
import { API_KEY, BASE_URL } from '../api/config';

interface FetchState {
  data: Movie[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface useFavMoviesOptions {
  ids: string[];
}

export function useFavoriteMovies({ ids }: useFavMoviesOptions) {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requests: Promise<Movie>[] = ids.map(async (id) => {
          const res = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
            {
              signal: controller.signal,
            },
          );
          if (!res.ok) throw new Error(`Failed to fetch movie with id: ${id}`);
          return await res.json();
        });

        const results = await Promise.all(requests);

        setData(results);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') return;
          setError(err.message);
        } else setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [ids, reload]);

  return {
    data,
    loading,
    error,
    refetch: () => setReload((prev) => prev + 1),
  } as FetchState;
}
