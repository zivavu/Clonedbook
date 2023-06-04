import { StyledRoot } from './styles';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import { PictureButtonProps } from './types';

export default function PictureButton({ picture, onClick, sx, ...rootProps }: PictureButtonProps) {
  const owner = useGetUserPublicData(picture.ownerId);
  return (
    <StyledRoot sx={sx} {...rootProps} key={picture.id} focusRipple onClick={onClick}>
      <ImageWithGradientLoading
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
