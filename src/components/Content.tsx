import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

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
type ContentProps = {
  genreId: number;
};
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { genreId } = props;
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then((response) => {
      setMovies(response.data);
    });
  }, [genreId]);
  return (
    <div className="container">
      <Header genreId={genreId} />
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}