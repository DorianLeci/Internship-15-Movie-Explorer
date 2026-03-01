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
    <MovieProvider>
      <Layout>
        <Routes>
          <Route path={AppPaths.HOME} element={<HomePage />} />

          <Route
            path={AppPaths.MOVIES}
            element={
              <FavoritesProvider>
                <MoviesPage />
              </FavoritesProvider>
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
    </MovieProvider>
  );
}

export default App;
