export function getDateFromTimestamp(seconds: number) {
  const date = new Date(seconds * 1000);
  date.setMonth(date.getMonth());
  return {
    month: Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
    day: date.getDate(),
    year: date.getFullYear(),
  };
}
