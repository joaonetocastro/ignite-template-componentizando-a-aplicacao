import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import { MoviesProvider } from './hooks/useMovies';
import { GenresProvider } from './hooks/useGenres';

export function App() {
  return (
    <GenresProvider>
      <MoviesProvider>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar />
          <Content />
        </div>
      </MoviesProvider>
    </GenresProvider>
  )
}