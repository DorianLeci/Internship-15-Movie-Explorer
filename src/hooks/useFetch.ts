import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok)
          throw new Error(`Falied to fetch: ${response.status}`);

        const result = await response.json();

        setData(result);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError')
          setError(err.message);
        else setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, reload]);

  return { data, loading, error, refetch } as FetchState<T>;
}
