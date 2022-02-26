import { useGenres } from '../../hooks/useGenres';
import styles from './styles.module.scss';
import { Button } from '../Button';

export function SideBar() {
  const {genres, selectGenre, selectedGenre} = useGenres();
  
  return (
    <nav className={styles.sidebar}>
        <span>Watch<p>Me</p></span>

        <div className={styles['buttons-container']}>
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => selectGenre(genre.id)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}