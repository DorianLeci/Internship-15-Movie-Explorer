import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../api/config';
import { useFetch } from '../../hooks/useFetch';
import type { MovieDetails } from '../../types/MovieDetails';
import styles from './MoveDetailsPage.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useFavorites } from '../../hooks/useFavorites';
import { Spinner } from '../../components/Spinner/Spinner';
import { MovieCast } from '../../components/MovieCast/MovieCast';
import { MovieCrew } from '../../components/MovieCrew/MovieCrew';
import { MovieReviews } from '../../components/MovieReview/MovieReview';
import { MovieTrailer } from '../../components/MovieTrailer/MovieTrailer';
import { useEffect } from 'react';
import { AppPaths } from '../../routes/paths';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const params = {
    api_key: API_KEY,
    append_to_response: 'credits,videos,reviews',
  };

  const url = `${BASE_URL}/movie/${id}?${new URLSearchParams(params)}`;

  const { data, loading, error } = useFetch<MovieDetails>(url);

  useEffect(() => {
    if (error || !id) {
      navigate(AppPaths.NOT_FOUND, { replace: true });
    }
  }, [error, id]);

  return (
    <div className={styles.container}>
      <Spinner
        text="Loading movie details..."
        loading={loading}
        minDisplayTime={300}
      />

      {data ? (
        <>
          <section className={styles.action}>
            <button
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
              <FaArrowLeft size={40} />
            </button>

            <button
              className={`${styles.toggleFavoriteButton} ${isFavorite(id) ? styles.remove : styles.add}`}
              onClick={() => toggleFavorite(id)}
            >
              {isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </section>

          <section className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.additional}>
              <p className={styles.overview}>{data.overview}</p>
              <p className={styles.runtime}>
                <strong className={styles.label}>Runtime: </strong>
                <span className={styles.value}>{data.runtime} min</span>
              </p>
              <p className={styles.genres}>
                <strong className={styles.label}>Genres: </strong>
                {data.genres.map((g) => (
                  <span key={g.id} className={styles.value}>
                    {g.name}
                  </span>
                ))}
              </p>
            </div>
          </section>

          <MovieCast cast={data.credits?.cast} />
          <MovieCrew crew={data.credits?.crew} />
          <MovieReviews reviews={data.reviews?.results} />
          <MovieTrailer videos={data.videos?.results} />
        </>
      ) : null}
    </div>
  );
};
