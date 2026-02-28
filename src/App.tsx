import { Routes, Route, useParams } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { AppPaths } from './routes/paths';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { MovieProvider } from './context/MoviesContext';
import MovieDetailsPage from './components/MovieDetails/MovieDetails';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={AppPaths.HOME} element={<HomePage />} />

        <Route
          path={AppPaths.MOVIES}
          element={
            <MovieProvider>
              <MoviesPage />
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
