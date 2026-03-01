import { createContext, useCallback, type ReactNode } from 'react';
import type { FavoritesContextType } from '../types/FavoritesContextType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFavoriteMovies } from '../hooks/useFavoriteMovies';

const STORAGE_KEY = 'favorites';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>({
    key: STORAGE_KEY,
    initialValue: [],
  });

  const {
    data: favoriteMovies,
    loading,
    error,
    refetch,
  } = useFavoriteMovies({ ids: favoriteIds });

  const addFavorite = (id: string) => {
    if (favoriteIds.includes(id)) return;
    setFavoriteIds([...favoriteIds, id]);
  };

  const removeFavorite = (id: string) => {
    if (!favoriteIds.includes(id)) return;
    setFavoriteIds(favoriteIds.filter((favId) => favId != id));
  };

  const isFavorite = useCallback(
    (id: string) => {
      return favoriteIds.includes(id);
    },
    [favoriteIds],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      isFavorite(id) ? removeFavorite(id) : addFavorite(id);
    },
    [favoriteIds, setFavoriteIds],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteMovies,
        toggleFavorite,
        isFavorite,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
