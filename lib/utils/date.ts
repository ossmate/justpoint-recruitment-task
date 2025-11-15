export function getYear(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  return new Date(dateString).getFullYear();
}

export function formatDate(
  dateString: string | null | undefined,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string | null {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString(locale, options);
}
