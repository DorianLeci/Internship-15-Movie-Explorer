import style from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
      <span className={style.loadingText}>Loading popular movies...</span>
    </div>
  );
};
