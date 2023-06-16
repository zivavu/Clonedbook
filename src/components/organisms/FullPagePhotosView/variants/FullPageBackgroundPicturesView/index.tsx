import getPicturesSortedByDate from '@/common/misc/photoManagment/getPicturesSortedByDate';
import { useUserPicturesByIdQuery } from '@/redux/services/userDataAPI';
import { useEffect, useState } from 'react';
import ElementInfo from '../../ElementInfo';
import FullPagePhotosWrapper from '../../FullPagePhotosWrapper';
import PhotosCarousel from '../../PhotosCarousel';
import { FullPageBackgroundPicturesViewProps } from './types';

export default function FullPageBackgroundPicturesView({
  sx,
  initialPhoto,
  ownerId,
  setOpen,
  ...rootProps
}: FullPageBackgroundPicturesViewProps) {
  const { data: picturesMap, refetch: refetchPictures } = useUserPicturesByIdQuery(ownerId);

  const pictures = getPicturesSortedByDate(picturesMap);

  const initialPhotoIndex: number = pictures.findIndex((picture) => picture.id === initialPhoto.id);

  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(initialPhotoIndex);

  useEffect(() => {
    if (initialPhotoIndex === -1) return setOpen(false);
    setCurrentPictureIndex(initialPhotoIndex);
  }, [picturesMap]);

  const currentPicture = pictures[currentPictureIndex];

  if (!pictures || !currentPicture) return null;
  return (
    <FullPagePhotosWrapper setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        pictures={pictures.map((picture) => picture.image)}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        setOpen={setOpen}
      />
      <ElementInfo
        type='backgroundPicture'
        element={currentPicture}
        refetchElement={refetchPictures}
      />
    </FullPagePhotosWrapper>
  );
}
