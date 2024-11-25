import { intervalToDuration } from "date-fns";

export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000, // seconds in a year
    month: 2592000, // seconds in a month (30 days)
    day: 86400, // seconds in a day
    hour: 3600, // seconds in an hour
    minute: 60, // seconds in a minute
    second: 1,
  };

  for (const [key, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `1 ${key}` : `${interval} ${key}s`;
    }
  }

  return "just now";
};

export const datesToDurationString = (
  end: string | null | undefined,
  start: string | null | undefined
) => {
  if (!start || !end) return null;

  const start_date = new Date(start);
  const end_date = new Date(end);

  const time_elapsed = end_date.getTime() - start_date.getTime();

  if (time_elapsed < 1000) return `${time_elapsed}ms`;

  const duration = intervalToDuration({ start: 0, end: time_elapsed });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
