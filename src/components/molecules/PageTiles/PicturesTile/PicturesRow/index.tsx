import { StyledImageButton, StyledImagesRow } from './styles';

import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { PicturesRowProps } from './types';

export default function PicturesRow({
  pictures,
  startIndex,
  owner,
  sx,
  ...rootProps
}: PicturesRowProps) {
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const handleOpenFullView = (index: number) => {
    setPhotoIndex(index);
    setIsFullViewOpen(true);
  };

  return (
    <>
      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhoto={photoIndex}
          setOpen={setIsFullViewOpen}
          ownerId={owner.id}
        />
      )}
      <StyledImagesRow direction='row' sx={sx} {...rootProps}>
        {pictures.slice(startIndex, startIndex + 3).map((picture, i) => {
          return (
            <StyledImageButton
              key={picture.id}
              focusRipple
              onClick={() => {
                const pictureIndex = startIndex + i;
                handleOpenFullView(pictureIndex);
              }}
              sx={{ borderLeft: i === 0 ? 0 : '', borderRight: i === 2 ? 0 : '' }}>
              <Box
                border={`1px solid ${theme.palette.secondary.main}`}
                width='100%'
                height='100%'
                position='relative'>
                <ImageWithGradientLoading
                  src={picture.url}
                  fill
                  sizes='150px'
                  unoptimized
                  style={{
                    objectFit: 'cover',
                  }}
                  alt={`${owner.firstName} ${owner.lastName} Picture`}
                />
              </Box>
            </StyledImageButton>
          );
        })}
      </StyledImagesRow>
    </>
  );
}
