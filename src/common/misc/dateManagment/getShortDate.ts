import getDateDiffs from './getDateDiffs';
import getDateFromTimestamp from './getDateFromTimestamp';

export default function getShortDate(seconds: number, fullDateTrehsold?: 'week') {
  const fullDate = getDateFromTimestamp(seconds);
  if (typeof seconds !== 'number') return null;
  const { dateDifs, largestDiff } = getDateDiffs(seconds);
  const displayFullDate = dateDifs.w >= 1;

  let shortDate: string = '';
  if (!fullDateTrehsold) {
    shortDate = `${largestDiff.value}${largestDiff.unit}`;
  }
  if (fullDateTrehsold === 'week') {
    shortDate = displayFullDate
      ? `${fullDate.month} ${fullDate.day}, ${fullDate.year}.`
      : `${largestDiff.value}${largestDiff.unit}`;
  }
  return shortDate;
}
