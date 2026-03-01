import type { CastMember } from './CastMember';
import type { CrewMember } from './CrewMember';
import type { Movie } from './Movie';
import type { MovieReview } from './MovieReview';
import type { MovieVideo } from './MovieVideo';

export interface MovieDetails extends Movie {
  runtime: number;
  overview: string;
  genres: { id: number; name: string }[];

  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };

  reviews?: { results: MovieReview[] };

  videos?: {
    results: MovieVideo[];
  };
}
