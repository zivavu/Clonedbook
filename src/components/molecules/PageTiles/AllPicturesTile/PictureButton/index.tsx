import { StyledRoot } from './styles';

import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import { PictureButtonProps } from './types';

export default function PictureButton({ picture, onClick, sx, ...rootProps }: PictureButtonProps) {
  const owner = useGetUserBasicInfo(picture.ownerId);
  return (
    <StyledRoot sx={sx} {...rootProps} key={picture.id} focusRipple onClick={onClick}>
      <ImageWithGradientLoading
        src={picture.image.url}
        blurDataURL={picture.image.blurDataUrl}
        placeholder='blur'
        fill
        sizes='300px'
        style={{
          objectFit: 'cover',
          backgroundColor: picture.image.dominantHex,
        }}
        alt={owner ? `${owner.firstName} ${owner.lastName} Picture` : `Picture`}
      />
    </StyledRoot>
  );
}
