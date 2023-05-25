import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import GradientLoadingImage from '@/components/atoms/GradientLoadingImage';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({ userData, sx, ...rootProps }: BackgroundPictureProps) {
  return (
    <>
      <StyledPictureGradient {...rootProps} sx={sx} />
      <StyledBacgroundPictureContainer>
        <GradientLoadingImage
          unoptimized
          alt={`${userData?.firstName}'s Bacground Picture`}
          src={userData?.backgroundPicture || ''}
          fill
          style={{ objectFit: 'cover' }}
        />
      </StyledBacgroundPictureContainer>
    </>
  );
}
