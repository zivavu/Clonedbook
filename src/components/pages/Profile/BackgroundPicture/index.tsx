import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import FullPageBackgroundPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPageBackgroundPicturesView';
import { useUserPicturesByIdQuery } from '@/redux/services/userDataAPI';
import { ButtonBase } from '@mui/material';
import { useState } from 'react';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({
  userData,
  userId,
  sx,
  ...rootProps
}: BackgroundPictureProps) {
  const { data: picturesMap } = useUserPicturesByIdQuery(userId);
  const backgroundPhotoData = picturesMap
    ? picturesMap.background[userData?.backgroundPictureId || '']
    : null;
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  return (
    <>
      {isFullViewOpen && backgroundPhotoData && (
        <FullPageBackgroundPicturesView
          setOpen={setIsFullViewOpen}
          initialPhoto={backgroundPhotoData}
          ownerId={userData.id}
        />
      )}
      <StyledPictureGradient {...rootProps} sx={sx} />
      <StyledBacgroundPictureContainer>
        <ButtonBase sx={{ width: '100%', height: '100%' }} onClick={() => setIsFullViewOpen(true)}>
          <ImageWithGradientLoading
            alt={`${userData?.firstName}'s Bacground Picture`}
            src={backgroundPhotoData?.image.url || ''}
            blurDataURL={backgroundPhotoData?.image.blurDataUrl || ''}
            placeholder='blur'
            fill
            style={{ objectFit: 'cover', backgroundColor: backgroundPhotoData?.image.dominantHex }}
          />
        </ButtonBase>
      </StyledBacgroundPictureContainer>
    </>
  );
}
