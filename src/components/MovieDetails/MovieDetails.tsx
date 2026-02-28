import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../api/config';
import { useFetch } from '../../hooks/useFetch';
import { ErrorCard } from '../ErrorCard/ErrorCard';
import { Spinner } from '../Spinner/Spinner';
import type { MovieDetails } from '../../types/MovieDetails';
import styles from './MoveDetails.module.scss';
import { CrewJob } from '../../enums/CrewJob';
import { FaArrowLeft } from 'react-icons/fa';
import { useFavorites } from '../../hooks/useFavorites';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!id) return <div>Invalid movie ID</div>;

  const params = {
    api_key: API_KEY,
    append_to_response: 'credits,videos,reviews',
  };

  const url = `${BASE_URL}/movie/${id}?${new URLSearchParams(params)}`;

  const { data, loading, error, refetch } = useFetch<MovieDetails>(url);

  if (!data) return <div>Not found</div>;
  if (error) return <ErrorCard message={error} onRetry={refetch} />;

  const { title, overview, runtime, genres, credits, reviews, videos } =
    data as MovieDetails;

  const topCast = credits?.cast.slice(0, 5);
  const topCrew = credits?.crew.filter((member) =>
    Object.values(CrewJob).includes(member.job as CrewJob),
  );

  const trailer = videos?.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  const reviewList = reviews?.results.slice(0, 3);

  console.log(isFavorite(id));
  return (
    <div className={styles.container}>
      <Spinner
        text={'Loading movie details...'}
        loading={loading}
        minDisplayTime={300}
      />

      <section className={styles.action}>
        <button type="button" onClick={() => window.history.back()}>
          <FaArrowLeft size={20} />
        </button>

        <button onClick={() => toggleFavorite(id)}>
          {isFavorite(id) ? 'Remove' : 'Add'}
        </button>
      </section>
      <section className={styles.info}>
        <h1>{title}</h1>
        <p>{overview}</p>
        <p>
          <strong>Runtime: </strong>
          {runtime} min
        </p>
        <p>
          <strong>Genres: </strong>
          {genres.map((g) => g.name)}
        </p>
      </section>

      <section className={styles.cast}>
        <ul>
          {topCast?.map((actor) => (
            <li key={actor.id}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.crew}>
        <ul>
          {topCrew?.map((member) => (
            <li key={`${member.id}-${member.job}`}>
              {member.name} ({member.job})
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.rewviewContainer}>
        <ul>
          {reviewList?.map((review) => (
            <li key={review.id}>
              <strong>{review.author}: </strong>
              <span>{review.content}</span>
            </li>
          ))}
        </ul>
      </section>

      {trailer && (
        <section className={styles.video}>
          <h2>Trailer</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
          ></iframe>
        </section>
      )}
    </div>
  );
}
