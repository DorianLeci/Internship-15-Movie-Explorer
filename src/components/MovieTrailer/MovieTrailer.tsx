import type { MovieVideo } from '../../types/MovieVideo';
import styles from './MovieTrailer.module.scss';

interface MovieTrailerProps {
  videos?: MovieVideo[];
}

export const MovieTrailer = ({ videos }: MovieTrailerProps) => {
  const trailer = videos?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer',
  );

  return (
    <>
      {trailer && (
        <section className={styles.video}>
          <div className={styles.videoContainer}>
            <h2 className={styles.title}>Trailer</h2>
            <iframe
              className={styles.videoFrame}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  );
};
