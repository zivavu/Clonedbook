import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { TLocalUserReaction } from '@/types/reaction';
import { useEffect, useState } from 'react';
import ElementInfo from '../ElementInfo';
import FullPagePortal from '../FullPagePortal';
import PhotosCarousel from '../PhotosCarousel';
import { FullPageAccountPicturesViewProps } from './types';

export default function FullPageAccountPicturesView({
  sx,
  initialPhotoIndex,
  userId,
  setOpen,
  ...rootProps
}: FullPageAccountPicturesViewProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(userId);

  const [picturesArr, setPicturesArr] = useState(Object.values(picturesMap));
  const [currentPictureIndex, setCurrentPictureIndex] = useState(initialPhotoIndex);
  const currentPicture = picturesArr[currentPictureIndex];
  useEffect(() => {
    setPicturesArr(Object.values(picturesMap));
  }, [picturesMap]);
  useEffect(() => {
    setCurrentPictureIndex(initialPhotoIndex);
  }, [initialPhotoIndex]);

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    currentPicture?.reactions[loggedUser?.id || ''] || undefined,
  );
  useEffect(() => {
    setUserReaction(currentPicture?.reactions[loggedUser?.id || ''] || undefined);
  }, [currentPicture, loggedUser?.id]);

  return isLoading || isError || !picturesMap || !currentPicture ? null : (
    <FullPagePortal setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        picturesUrls={picturesArr.map((picture) => picture.url)}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
      />
      <ElementInfo
        userReaction={userReaction}
        type='picture'
        setUserReaction={setUserReaction}
        element={currentPicture}></ElementInfo>
    </FullPagePortal>
  );
}
