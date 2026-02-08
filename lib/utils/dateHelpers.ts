export const DATE_FORMAT_OPTIONS = {
  long: {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
  short: {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  },
  time: {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  },
};

export function formatDate(
  date: Date | string,
  format: keyof typeof DATE_FORMAT_OPTIONS = "short",
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS[format]);
}

export function formatTime(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleTimeString("en-US", DATE_FORMAT_OPTIONS.time);
}
