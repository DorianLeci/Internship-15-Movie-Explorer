import type { Movie } from './Movie';

export interface MovieDetails extends Movie {
  runtime: number;
  overview: string;
  genres: { name: string }[];

  credits?: {
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  };

  reviews?: { results: { id: string; author: string; content: string }[] };

  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}
