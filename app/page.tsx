import { getPopularMovies } from "@/lib/api/tmdb";
import { MovieList } from "@/components/MovieList";

export default async function Home() {
  const data = await getPopularMovies();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Popular Movies
        </h1>

        <MovieList movies={data.results} />
      </main>
    </div>
  );
}
