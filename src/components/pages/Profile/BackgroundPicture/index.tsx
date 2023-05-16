import { useTheme } from '@mui/material';

import { StyledBacgroundPictureContainer, StyledPictureGradient } from './styles';

import Image from 'next/image';
import { BackgroundPictureProps } from './types';

export default function BackgroundPicture({ userData, sx, ...rootProps }: BackgroundPictureProps) {
  return (
    <>
      <StyledPictureGradient {...rootProps} sx={sx} />
      <StyledBacgroundPictureContainer>
        <Image
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
