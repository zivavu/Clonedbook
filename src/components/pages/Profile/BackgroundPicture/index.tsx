import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import GradientLoadingImage from '@/components/atoms/GradientLoadingImage';
import FullPageBackgroundPicturesView from '@/components/organisms/FullPagePhotosView/FullPageBackgroundPicturesView';
import { ButtonBase } from '@mui/material';
import { useState } from 'react';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({
  userData,
  picturesMap,
  sx,
  ...rootProps
}: BackgroundPictureProps) {
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
          <GradientLoadingImage
            unoptimized
            alt={`${userData?.firstName}'s Bacground Picture`}
            src={userData?.backgroundPicture || ''}
            fill
            style={{ objectFit: 'cover' }}
          />
        </ButtonBase>
      </StyledBacgroundPictureContainer>
    </>
  );
}
