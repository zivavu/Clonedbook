import useFetchUsersPictures from '@/common/readData/useFetchUsersPictures';
import { useEffect, useState } from 'react';
import ElementInfo from '../../ElementInfo';
import FullPagePhotosWrapper from '../../FullPagePhotosWrapper';
import PhotosCarousel from '../../PhotosCarousel';
import { FullPageAccountPicturesViewProps } from './types';

export default function FullPageAccountPicturesView({
  sx,
  initialPhoto,
  ownerId,
  setOpen,
  ...rootProps
}: FullPageAccountPicturesViewProps) {
  const { picturesMap, refetchPictures } = useFetchUsersPictures(ownerId);
  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    : [];

  const initialPhotoIndex: number =
    typeof initialPhoto === 'number'
      ? initialPhoto
      : pictures.findIndex((picture) => picture.id === initialPhoto.id);
  useEffect(() => {
    setCurrentPictureIndex(initialPhotoIndex);
  }, [initialPhoto, initialPhotoIndex]);

  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(initialPhotoIndex);
  const currentPicture = pictures[currentPictureIndex];

  if (!pictures || !currentPicture) return null;
  return (
    <FullPagePhotosWrapper setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        picturesUrls={pictures.map((picture) => picture.url)}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        setOpen={setOpen}
      />
      <ElementInfo
        type='accountPicture'
        element={currentPicture}
        refetchElement={refetchPictures}
      />
    </FullPagePhotosWrapper>
  );
}