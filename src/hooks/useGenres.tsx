import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from '../services/api';

interface GenreProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresContextValue {
  genres: GenreProps[];
  selectedGenre: GenreProps;
  selectGenre: (genreId: number) => void;
}

const GenresContext = createContext<GenresContextValue>(
  {} as GenresContextValue
);

interface GenresProviderProps {
  children: ReactNode;
}

export const GenresProvider = ({ children }: GenresProviderProps) => {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState({} as GenreProps);

  function selectGenre(genreId: number){
    api.get<GenreProps>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }

  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data);
    });
    selectGenre(1);
  }, []);
  

  return (
    <GenresContext.Provider value={{ genres, selectedGenre, selectGenre }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = () => useContext(GenresContext);