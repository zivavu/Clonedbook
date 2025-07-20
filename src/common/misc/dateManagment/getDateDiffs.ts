export type TTimeDiffUnit = 'm' | 'h' | 'd' | 'w' | 'y';

type TTimeDiffMap = {
  [key in TTimeDiffUnit]: number;
};

export interface ITimeDiff {
  unit: TTimeDiffUnit;
  value: number;
}

export default function getDateDiffs(seconds: number) {
  if (typeof seconds !== 'number') seconds = Date.now();
  const timeDifference = new Date().getTime() - seconds * 1000;
  const currDate = new Date();
  const pastDate = new Date(seconds * 1000);
  const minutesDiff = Math.max(Math.ceil(timeDifference / (1000 * 60)), 1);
  const hoursDiff = Math.floor(timeDifference / (1000 * 3600));
  const daysDiff = Math.floor(timeDifference / (1000 * 3600 * 24));
  const weeksDiff = Math.floor(timeDifference / (1000 * 3600 * 24 * 7));
  const yearsDiff = currDate.getFullYear() - pastDate.getFullYear();
  const diffsMap: TTimeDiffMap = {
    m: minutesDiff,
    h: hoursDiff,
    d: daysDiff,
    w: weeksDiff,
    y: yearsDiff,
  };

  const pressentDiffs = Object.entries(diffsMap).filter(([, value]) => value > 0);
  const largestDiff = pressentDiffs[pressentDiffs.length - 1];
  const largestDiffObj: ITimeDiff = {
    unit: largestDiff[0] as TTimeDiffUnit,
    value: largestDiff[1],
  };

  return { dateDifs: diffsMap, largestDiff: largestDiffObj };
}
