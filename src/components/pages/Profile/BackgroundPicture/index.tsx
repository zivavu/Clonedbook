import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import FullPageBackgroundPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPageBackgroundPicturesView';
import { useUserPicturesByIdQuery } from '@/redux/services/userData';
import { ButtonBase } from '@mui/material';
import { useState } from 'react';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({ userData, sx, ...rootProps }: BackgroundPictureProps) {
  const { data: picturesMap } = useUserPicturesByIdQuery(userData.id);
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
