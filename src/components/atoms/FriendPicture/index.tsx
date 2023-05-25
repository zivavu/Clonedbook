import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { ButtonBase } from '@mui/material';
import Link from 'next/link';
import GradientLoadingImage from '../GradientLoadingImage';
import { StyledRoot } from './styles';
import { FriendPictureProps } from './types';

export default function FriendPicture({ friendId, sx, ...rootProps }: FriendPictureProps) {
  const friend = useGetUsersPublicData(friendId);
  if (!friend) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <GradientLoadingImage
        fill
        src={friend.pictureUrl || '/no-profile-picture-icon.svg'}
        alt={`${friend.firstName} ${friend.lastName} Profile picture`}
      />
      <ButtonBase
        LinkComponent={Link}
        href={`/profile/${friend.id}`}
        sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        focusRipple
      />
    </StyledRoot>
  );
}
