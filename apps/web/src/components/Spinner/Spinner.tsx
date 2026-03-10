import style from './Spinner.module.scss';
import { createPortal } from 'react-dom';

interface SpinnerProps {
  text: string;
}

export const Spinner = ({ text }: SpinnerProps) => {
  return createPortal(
    <div className={style.container}>
      <div className={style.spinner}></div>
      <span className={style.loadingText}>{text}</span>
    </div>,
    document.body,
  );
};
