import { StyledImageButton, StyledImagesRow } from './styles';

import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPageAccountPicturesView';
import { IAccountPicture } from '@/types/picture';
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
  const [selectedPhoto, setSelectedPhoto] = useState<IAccountPicture>(pictures[0]);
  const handleOpenFullView = (picture: IAccountPicture) => {
    setSelectedPhoto(picture);
    setIsFullViewOpen(true);
  };

  return (
    <>
      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhoto={selectedPhoto}
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
                handleOpenFullView(picture);
              }}
              sx={{ borderLeft: i === 0 ? 0 : '', borderRight: i === 2 ? 0 : '' }}>
              <Box
                border={`1px solid ${theme.palette.secondary.main}`}
                width='100%'
                height='100%'
                position='relative'>
                <ImageWithGradientLoading
                  src={picture.image.url}
                  blurDataURL={picture.image.blurDataUrl}
                  placeholder='blur'
                  fill
                  sizes='150px'
                  style={{
                    objectFit: 'cover',
                    backgroundColor: picture.image.dominantHex,
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
