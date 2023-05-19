import { StyledImageContainer, StyledImagesRow, StyledTileImage } from './styles';

import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import { useState } from 'react';
import { PicturesRowProps } from './types';

export default function PicturesRow({
  pictures,
  startIndex,
  owner,
  sx,
  ...rootProps
}: PicturesRowProps) {
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
          initialPhotoIndex={photoIndex}
          setOpen={setIsFullViewOpen}
          ownerId={owner.id}
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
                alt={`${owner.firstName} ${owner.lastName} Picture`}
              />
            </StyledImageContainer>
          );
        })}
      </StyledImagesRow>
    </>
  );
}
