import { useFetch } from './useFetch';

export function usePaginatedFetch<T>(url: string, skip: boolean) {
  const fetchUrl = skip ? '' : url;

  const { data, loading, error, refetch } = useFetch<T>(fetchUrl);

  return { data, loading, error, refetch };
}
