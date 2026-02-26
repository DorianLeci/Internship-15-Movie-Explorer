import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { AppPaths } from './routes/paths';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { MovieProvider } from './context/MoviesContext';
function App() {
  return (
    <MovieProvider>
      <Layout>
        <Routes>
          <Route path={AppPaths.HOME} element={<HomePage />} />
          <Route path={AppPaths.MOVIES} element={<MoviesPage />} />
        </Routes>
      </Layout>
    </MovieProvider>
  );
}
export default App;
