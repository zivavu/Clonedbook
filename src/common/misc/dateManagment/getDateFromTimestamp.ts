export default function getDateFromTimestamp(seconds: number) {
  if (typeof seconds !== 'number') seconds = Date.now();
  const date = new Date(seconds * 1000);
  date.setMonth(date.getMonth());
  return {
    month: Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
    day: date.getDate(),
    year: date.getFullYear(),
  };
}
