import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
