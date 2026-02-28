import { useState, useEffect } from 'react';

interface UseFetchAllPagesOptions {
  url: string;
  maxPagesToFetch?: number;
}

interface FetchState<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchAllPages<T>({
  url,
  maxPagesToFetch = 20,
}: UseFetchAllPagesOptions): FetchState<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const initialResponse = await fetch(url, { signal: controller.signal });
        if (!initialResponse.ok)
          throw new Error(`Failed to fetch: ${initialResponse.status}`);

        const initialData = await initialResponse.json();
        const allResults: T[] = [initialData];
        const totalPages = Math.min(maxPagesToFetch, initialData.total_pages);

        if (totalPages > 1) {
          const fetches = [];
          for (let p = 2; p <= totalPages; p++) {
            fetches.push(
              fetch(`${url}&page=${p}`, { signal: controller.signal }),
            );
          }

          const settled = await Promise.allSettled(fetches);

          for (let i = 0; i < settled.length; i++) {
            const res = settled[i];
            if (res.status === 'fulfilled') {
              const pageData = await res.value.json();
              allResults.push(pageData);
            }
          }
        }
        setData(allResults);
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
  }, [url, reload]);

  return { data, loading, error, refetch };
}
