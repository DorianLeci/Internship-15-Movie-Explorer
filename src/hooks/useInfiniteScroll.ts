import { useRef, useEffect } from 'react';

interface UserInfiniteScrollOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  callback: () => void;
  canLoadMore: boolean;
}

export function useInfiniteScroll({
  containerRef,
  callback,
  canLoadMore,
}: UserInfiniteScrollOptions) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!canLoadMore) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        savedCallback.current();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [canLoadMore]);
}
