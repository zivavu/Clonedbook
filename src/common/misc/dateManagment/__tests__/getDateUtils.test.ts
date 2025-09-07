import getDateDiffs from '@/common/misc/dateManagment/getDateDiffs';
import getDateFromTimestamp from '@/common/misc/dateManagment/getDateFromTimestamp';
import getShortDate from '@/common/misc/dateManagment/getShortDate';

describe('dateManagment utilities', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-08T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('getDateFromTimestamp returns month/day/year for given seconds', () => {
    const date = new Date('2023-12-31T00:00:00Z');
    const seconds = Math.floor(date.getTime() / 1000);
    const res = getDateFromTimestamp(seconds);
    expect(res.month).toBe('December');
    expect(res.day).toBe(31);
    expect(res.year).toBe(2023);
  });

  it('getDateDiffs computes largest diff unit and values', () => {
    const now = new Date('2024-01-08T12:00:00Z');
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const seconds = Math.floor(fiveMinutesAgo.getTime() / 1000);
    const { dateDifs, largestDiff } = getDateDiffs(seconds);
    expect(dateDifs.m).toBeGreaterThanOrEqual(5);
    expect(['m', 'h', 'd', 'w', 'y']).toContain(largestDiff.unit);
  });

  it('getShortDate returns relative time by default', () => {
    const now = new Date('2024-01-08T12:00:00Z');
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const seconds = Math.floor(twoHoursAgo.getTime() / 1000);
    const res = getShortDate(seconds);
    expect(res).toMatch(/\d+[mhdwy]/);
  });

  it('getShortDate with week threshold returns full date if >= week', () => {
    const now = new Date('2024-01-08T12:00:00Z');
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const seconds = Math.floor(tenDaysAgo.getTime() / 1000);
    const res = getShortDate(seconds, 'week');
    expect(res).toMatch(/\w+ \d{1,2}, \d{4}\./);
  });
});
