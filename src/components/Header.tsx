import { useEffect, useState } from "react";

interface GenreResponseProps {
  title: string;
}

type HeaderProps = {
  genreId: number;
};

import { api } from "../services/api";

export function Header(props: HeaderProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const { genreId } = props;

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${genreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [genreId]);

  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}