import { useGenres } from '../../hooks/useGenres';
import { useMovies } from '../../hooks/useMovies';
import { MovieCard } from '../MovieCard';
import styles from './styles.module.scss';

export function Content() {
  const {movies} = useMovies();
  const {selectedGenre} = useGenres();
  
  return (
    <div className={styles.container}>
        <header>
          <span className={styles.category}>Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className={styles['movies-list']}>
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}