import { createContext, useCallback, type ReactNode } from 'react';
import type { FavoritesContextType } from '../types/FavoritesContextType';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'favorites';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: STORAGE_KEY,
    initialValue: [],
  });

  const addFavorite = (id: string) => {
    if (favorites.includes(id)) return;
    setFavorites([...favorites, id]);
  };

  const removeFavorite = (id: string) => {
    if (!favorites.includes(id)) return;
    setFavorites(favorites.filter((favId) => favId != id));
  };

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      isFavorite(id) ? removeFavorite(id) : addFavorite(id);
    },
    [favorites, setFavorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
