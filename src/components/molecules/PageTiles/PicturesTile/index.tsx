import { Stack, useTheme } from '@mui/material';

import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import { useState } from 'react';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { StyledImageContainer, StyledImagesRow, StyledTileImage } from './styles';
import { PicturesRowProps, PicturesTileProps } from './types';

export default function PicturesTile({ user, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(user.id);

  const pictures = Object.values(picturesMap)
    .slice(0, 9)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const rowCount = pictures.length > 6 ? 3 : pictures.length > 3 ? 2 : 1;

  if (isError || isLoading || isObjectEmpty(picturesMap)) return null;
  return (
    <StyledPageTile sx={{ ...sx }} {...rootProps}>
      <StyledPageTileHeader>Photos</StyledPageTileHeader>
      <Stack spacing={0.5} mt={2}>
        <PicturesRow
          pictures={pictures}
          startIndex={0}
          user={user}
          sx={{ borderTopRightRadius: theme.spacing(1), borderTopLeftRadius: theme.spacing(1) }}
        />
        {rowCount > 1 && (
          <PicturesRow
            pictures={pictures}
            user={user}
            startIndex={3}
            sx={
              rowCount === 2
                ? {
                    borderBottomRightRadius: theme.spacing(1),
                    borderBottomLeftRadius: theme.spacing(1),
                  }
                : {}
            }
          />
        )}
        {rowCount > 2 && (
          <PicturesRow
            pictures={pictures}
            startIndex={6}
            user={user}
            sx={{
              borderBottomRightRadius: theme.spacing(1),
              borderBottomLeftRadius: theme.spacing(1),
            }}
          />
        )}
      </Stack>
    </StyledPageTile>
  );
}

function PicturesRow({ pictures, startIndex, user, sx, ...rootProps }: PicturesRowProps) {
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const handleOpenFullView = (index: number) => {
    setPhotoIndex(index);
    console.log(index);
    setIsFullViewOpen(true);
  };
  return (
    <>
      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhotoIndex={photoIndex}
          setOpen={setIsFullViewOpen}
          userId={user.id}
        />
      )}
      <StyledImagesRow direction='row' spacing={0.5} sx={sx} {...rootProps}>
        {pictures.slice(startIndex, startIndex + 3).map((picture, i) => {
          return (
            <StyledImageContainer
              key={picture.id}
              focusRipple
              onClick={() => {
                const pictureIndex = startIndex + i;
                handleOpenFullView(pictureIndex);
              }}>
              <StyledTileImage
                src={picture.url}
                fill
                sizes='150px'
                unoptimized
                alt={`${user.firstName} ${user.lastName} Picture`}
              />
            </StyledImageContainer>
          );
        })}
      </StyledImagesRow>
    </>
  );
}
