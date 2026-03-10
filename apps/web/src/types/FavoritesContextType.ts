import type { Movie } from './Movie';

export interface FavoritesContextType {
  favoriteIds: string[];
  favoriteMovies: Movie[] | null;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
