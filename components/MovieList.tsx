"use client";

import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => console.log(movie)}
        />
      ))}
    </div>
  );
}
