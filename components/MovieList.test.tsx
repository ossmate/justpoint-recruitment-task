import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieList } from './MovieList';
import { mockMovies } from '@/test/mocks';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/lib/api/tmdb', () => ({
  getTMDbImageUrl: (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : null,
}));

describe('MovieList', () => {
  it('should render all movies', () => {
    render(<MovieList movies={mockMovies} />);

    expect(screen.getByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
  });

  it('should render correct number of movie cards', () => {
    render(<MovieList movies={mockMovies} />);

    const movieTitles = mockMovies.map((movie) =>
      screen.getByText(movie.title)
    );
    expect(movieTitles).toHaveLength(2);
  });

  it('should open modal when movie card is clicked', async () => {
    const user = userEvent.setup();
    render(<MovieList movies={mockMovies} />);

    const movieCard = screen.getByText('Movie One').closest('div');
    if (movieCard) {
      await user.click(movieCard);
    }
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<MovieList movies={mockMovies} />);

    const movieCard = screen.getByText('Movie One').closest('div');
    if (movieCard) {
      await user.click(movieCard);
    }

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('should render empty list when no movies provided', () => {
    const { container } = render(<MovieList movies={[]} />);

    const movieCards = container.querySelectorAll('[data-testid="movie-card"]');
    expect(movieCards).toHaveLength(0);
  });
});
