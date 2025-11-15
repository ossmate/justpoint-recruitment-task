import { describe, it, expect } from 'vitest';
import { getYear, formatDate } from './date';

describe('getYear', () => {
  it('should return the year from a valid date string', () => {
    expect(getYear('2024-03-15')).toBe(2024);
    expect(getYear('2023-12-31')).toBe(2023);
  });

  it('should return null for null, undefined, or empty string', () => {
    expect(getYear(null)).toBeNull();
    expect(getYear(undefined)).toBeNull();
    expect(getYear('')).toBeNull();
  });

  it('should return NaN for invalid date strings', () => {
    expect(getYear('invalid-date')).toBe(NaN);
  });
});

describe('formatDate', () => {
  it('should format a valid date string with default options', () => {
    const result = formatDate('2024-03-15');
    expect(result).toBe('March 15, 2024');
  });

  it('should return null for null, undefined, or empty string', () => {
    expect(formatDate(null)).toBeNull();
    expect(formatDate(undefined)).toBeNull();
    expect(formatDate('')).toBeNull();
  });

  it('should format date with custom locale', () => {
    const result = formatDate('2024-03-15', 'en-GB');
    expect(result).toBe('15 March 2024');
  });

  it('should format date with custom options', () => {
    const result = formatDate('2024-03-15', 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    expect(result).toBe('Mar 15, 2024');
  });
});
