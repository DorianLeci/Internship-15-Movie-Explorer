import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { AppPaths } from './routes/paths';
import { MoviesPage } from './pages/Movies/MoviesPage';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path={AppPaths.HOME} element={<HomePage />} />
        <Route path={AppPaths.MOVIES} element={<MoviesPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
