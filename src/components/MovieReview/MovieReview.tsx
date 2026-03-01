import type { MovieReview } from '../../types/MovieReview';
import styles from './MovieReview.module.scss';

interface MovieReviewProps {
  reviews?: MovieReview[];
  limit?: number;
}

export const MovieReviews = ({ reviews, limit = 10 }: MovieReviewProps) => {
  if (!reviews?.length) return null;

  return (
    <section className={styles.reviewContainer}>
      <h2 className={styles.title}>Reviews</h2>
      <div className={styles.cardScrollContainer}>
        <div className={styles.cardContainer}>
          {reviews.slice(0, limit).map((review) => (
            <div key={review.id} className={styles.card}>
              <span className={styles.author}>{review.author}: </span>
              <p className={styles.content}>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
