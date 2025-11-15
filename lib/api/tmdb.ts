import { Movie, MovieDetails, TMDbMoviesResponse } from '@/types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
  console.warn('TMDB API key is not configured. Please add TMDB_API_KEY to .env.local');
}

async function tmdbFetch<T>(endpoint: string, revalidate = 3600): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function getTMDbImageUrl(
  path: string | null,
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/w500${path}`;
}

export async function getPopularMovies(page = 1): Promise<TMDbMoviesResponse> {
  return tmdbFetch<TMDbMoviesResponse>(`/movie/popular?page=${page}&language=en-US`);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${movieId}?language=en-US`);
}
