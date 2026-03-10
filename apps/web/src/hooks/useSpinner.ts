import { useEffect, useState } from 'react';

interface useSpinnerOptions {
  loading: boolean;
  minDisplayTime?: number;
}

export function useSpinner({
  loading,
  minDisplayTime = 300,
}: useSpinnerOptions) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (loading) setShow(true);
    else timeoutId = setTimeout(() => setShow(false), minDisplayTime);

    return () => clearTimeout(timeoutId);
  }, [loading, minDisplayTime]);

  return show;
}
