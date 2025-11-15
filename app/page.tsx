import { getPopularMovies } from "@/lib/api/tmdb";

export default async function Home() {
  const data = await getPopularMovies();

  console.log(data, 'data')

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Popular Movies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.results.map((movie) => (
            <div
              key={movie.id}
              className="border border-foreground/10 rounded-lg p-4 hover:border-foreground/30 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              <p className="text-sm text-foreground/60">
                {movie.release_date || "No release date"}
              </p>
              <p className="text-sm text-foreground/60 mt-1">
                Rating: {movie.vote_average.toFixed(1)}/10
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
