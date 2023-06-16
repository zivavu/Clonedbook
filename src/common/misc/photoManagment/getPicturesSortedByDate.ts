import { IPicturesMap } from '@/types/picture';

interface IGetPicturesSortedByDate {
  picturesMap: IPicturesMap | undefined;
  type: 'account' | 'background';
}

export default function getPicturesSortedByDate({ picturesMap, type }: IGetPicturesSortedByDate) {
  return picturesMap
    ? Object.values(picturesMap[type])
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    : [];
}
