import { StyledRoot } from './styles';

import GradientLoadingImage from '@/components/atoms/GradientLoadingImage';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { PictureButtonProps } from './types';

export default function PictureButton({ picture, onClick, sx, ...rootProps }: PictureButtonProps) {
  const owner = useGetUsersPublicData(picture.ownerId);
  return (
    <StyledRoot sx={sx} {...rootProps} key={picture.id} focusRipple onClick={onClick}>
      <GradientLoadingImage
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
