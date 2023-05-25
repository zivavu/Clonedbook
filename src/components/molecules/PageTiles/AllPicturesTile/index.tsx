import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { IAccountPicture } from '@/types/picture';
import { Box, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { StyledFullSizePageTile, StyledPageTileHeader } from '../styles';
import PictureButton from './PictureButton';
import { AllPicturesTileProps } from './types';

export default function AllPicturesTile({ profileData, sx, ...rootProps }: AllPicturesTileProps) {
  const theme = useTheme();
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(profileData.id);
  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .slice(0, 9)
    : [];

  const [isFullViewOpen, setIsFullViewOpen] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<IAccountPicture>(pictures[0]);
  const handleOpenFullView = (picture: IAccountPicture) => {
    setCurrentPhoto(picture);
    setIsFullViewOpen(true);
  };

  if (isLoading || isError || !pictures) return null;
  return (
    <StyledFullSizePageTile sx={sx} {...rootProps}>
      <StyledPageTileHeader mb={3}>Photos</StyledPageTileHeader>
      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhoto={currentPhoto}
          setOpen={setIsFullViewOpen}
          ownerId={profileData.id}
        />
      )}
      <Stack direction='row' flexWrap='wrap' justifyContent='flex-start' useFlexGap>
        {pictures.map((picture) => (
          <Box
            key={picture.id}
            sx={{
              maxWidth: '25%',
              flex: `1 0 25%`,
              border: `4px solid ${theme.palette.secondary.light}`,
            }}>
            <PictureButton
              key={picture.id}
              picture={picture}
              onClick={() => handleOpenFullView(picture)}
            />
          </Box>
        ))}
      </Stack>
    </StyledFullSizePageTile>
  );
}
