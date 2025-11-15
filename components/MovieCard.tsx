import { Movie } from "@/types/movie";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className="flex overflow-hidden bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex-shrink-0 relative w-20 h-32 bg-gray-100">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="80px"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex flex-col justify-center flex-1 min-w-0 p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        {releaseYear && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{releaseYear}</span>
          </div>
        )}
      </div>
    </div>
  );
}
