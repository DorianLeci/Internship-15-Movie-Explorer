import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { AppPaths } from './routes/paths';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { MovieProvider } from './context/MoviesContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { MovieDetailsPage } from './pages/MovieDetails/MovieDetailsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={AppPaths.HOME} element={<HomePage />} />

        <Route
          path={AppPaths.MOVIES}
          element={
            <MovieProvider>
              <FavoritesProvider>
                <MoviesPage />
              </FavoritesProvider>
            </MovieProvider>
          }
        />

        <Route
          path={AppPaths.MOVIE_DETAIL}
          element={
            <FavoritesProvider>
              <MovieDetailsPage />
            </FavoritesProvider>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
