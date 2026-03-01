import { useEffect, useState } from 'react';
import style from './Spinner.module.scss';
import { createPortal } from 'react-dom';

interface SpinnerProps {
  loading: boolean;
  text: string;
  minDisplayTime: number;
}

export const Spinner = ({ loading, text, minDisplayTime }: SpinnerProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (loading) setShow(true);
    else timeoutId = setTimeout(() => setShow(false), minDisplayTime);

    return () => clearTimeout(timeoutId);
  }, [loading, minDisplayTime]);

  if (!show) return null;

  return createPortal(
    <div className={style.container}>
      <div className={style.spinner}></div>
      <span className={style.loadingText}>{text}</span>
    </div>,
    document.body,
  );
};
