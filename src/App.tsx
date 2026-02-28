import { Routes, Route, useParams } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { AppPaths } from './routes/paths';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { MovieProvider } from './context/MoviesContext';
import MovieDetailsPage from './components/MovieDetails/MovieDetails';

function App() {
  return (
    <MovieProvider>
      <Layout>
        <Routes>
          <Route path={AppPaths.HOME} element={<HomePage />} />
          <Route path={AppPaths.MOVIES} element={<MoviesPage />} />
          <Route path={AppPaths.MOVIE_DETAIL} element={<MovieDetailsPage />} />
        </Routes>
      </Layout>
    </MovieProvider>
  );
}
export default App;
