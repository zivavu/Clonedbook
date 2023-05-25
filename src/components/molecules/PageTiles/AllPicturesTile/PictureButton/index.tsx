import { useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import LazyImage from '@/components/atoms/LazyImage';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { PictureButtonProps } from './types';

export default function PictureButton({ picture, onClick, sx, ...rootProps }: PictureButtonProps) {
  const owner = useGetUsersPublicData(picture.ownerId);
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps} key={picture.id} focusRipple onClick={onClick}>
      <LazyImage
        src={picture.url}
        fill
        sizes='300px'
        unoptimized
        style={{
          objectFit: 'cover',
        }}
        alt={owner ? `${owner.firstName} ${owner.lastName} Picture` : `Picture`}
      />
    </StyledRoot>
  );
}
