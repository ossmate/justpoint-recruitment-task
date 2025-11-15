import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieCard } from './MovieCard';
import { mockMovie } from '@/test/mocks';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock('@/lib/api/tmdb', () => ({
  getTMDbImageUrl: (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : null,
}));

describe('MovieCard', () => {
  it('should render movie title', () => {
    const onClick = vi.fn();
    render(<MovieCard movie={mockMovie} onClick={onClick} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<MovieCard movie={mockMovie} onClick={onClick} />);

    const card = screen.getByText('Test Movie').closest('div');
    if (card) {
      await user.click(card);
    }

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not render release year when release_date is empty', () => {
    const movieWithoutDate = { ...mockMovie, release_date: '' };
    const onClick = vi.fn();

    render(<MovieCard movie={movieWithoutDate} onClick={onClick} />);

    expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
  });
});
