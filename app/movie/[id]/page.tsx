import { getMovieDetails, getTMDbImageUrl } from "@/lib/api/tmdb";
import { getYear, formatDate } from "@/lib/utils/date";
import Image from "next/image";
import { Calendar, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(parseInt(id));

  const posterImageUrl = getTMDbImageUrl(movie.poster_path);
  const backdropImageUrl = getTMDbImageUrl(movie.backdrop_path);

  const releaseYear = getYear(movie.release_date);
  const releaseDate = formatDate(movie.release_date);

  return (
    <div className="min-h-screen bg-gray-50">
      {backdropImageUrl && (
        <div className="relative w-full h-80 md:h-96 bg-gray-900">
          <Image
            src={backdropImageUrl ?? ''}
            alt={movie.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 -mt-40 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </Link>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-xl p-6 md:p-8">
          {posterImageUrl && (
            <div className="flex-shrink-0">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={posterImageUrl ?? ''}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {movie.title}
            </h1>

            {movie.original_title !== movie.title && (
              <p className="text-lg text-gray-600 mb-4 italic">
                {movie.original_title}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {releaseYear && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">{releaseYear}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-yellow-600">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-600 text-sm">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
            </div>

            {movie.overview && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {movie.overview}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {releaseDate && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Release Date
                  </h3>
                  <p className="text-gray-700">{releaseDate}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Original Language
                </h3>
                <p className="text-gray-700 uppercase">
                  {movie.original_language}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Popularity
                </h3>
                <p className="text-gray-700">
                  {movie.popularity.toFixed(0)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Status</h3>
                <p className="text-gray-700">
                  {movie.adult ? "Adult" : "All Ages"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}
