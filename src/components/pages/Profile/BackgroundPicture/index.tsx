import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import LazyImage from '@/components/atoms/LazyImage';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({ userData, sx, ...rootProps }: BackgroundPictureProps) {
  return (
    <>
      <StyledPictureGradient {...rootProps} sx={sx} />
      <StyledBacgroundPictureContainer>
        <LazyImage
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
