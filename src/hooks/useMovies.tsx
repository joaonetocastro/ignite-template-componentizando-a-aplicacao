import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from '../services/api';
import { useGenres } from "./useGenres";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextValue {
  movies: MovieProps[];
  setMovies: (movies: MovieProps[]) => void;
}

const MoviesContext = createContext<MoviesContextValue>(
  {} as MoviesContextValue
);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenre } = useGenres();

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre]);

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);