import { useFetch } from './useFetch';

interface PaginatedFetchOptions {
  url: string;
  skip: boolean;
}

export function usePaginatedFetch<T>({
  url,
  skip = false,
}: PaginatedFetchOptions) {
  const fetchUrl = skip ? '' : url;

  const { data, loading, error, refetch } = useFetch<T>(fetchUrl);

  return { data, loading, error, refetch };
}
