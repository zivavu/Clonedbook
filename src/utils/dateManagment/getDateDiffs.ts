export type TTimeDiffUnit = 'm' | 'h' | 'd' | 'w' | 'y';

type TTimeDiffMap = {
  //eslint-disable-next-line no-unused-vars
  [key in TTimeDiffUnit]: number;
};

export interface ITimeDiff {
  unit: TTimeDiffUnit;
  value: number;
}

export default function getDateDiffs(seconds: number) {
  const timeDifference = new Date().getTime() - seconds * 1000;
  const currDate = new Date();
  const pastDate = new Date(seconds * 1000);
  const minutesDiff = Math.floor(timeDifference / (1000 * 60));
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
  //eslint-disable-next-line no-unused-vars
  const pressentDiffs = Object.entries(diffsMap).filter(([_, value]) => value > 0);
  const largestDiff = pressentDiffs[pressentDiffs.length - 1];
  const largestDiffObj: ITimeDiff = {
    unit: largestDiff[0] as TTimeDiffUnit,
    value: largestDiff[1],
  };

  return { dateDifs: diffsMap, largestDiff: largestDiffObj };
}
