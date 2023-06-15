import { useTheme } from '@mui/material';

import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPageAccountPicturesView';
import { useUserPicturesByIdQuery } from '@/redux/services/userDataAPI';
import { IAccountPicture } from '@/types/picture';
import { useState } from 'react';
import { StyledImageListContainer, StyledPageTile, StyledPageTileHeader } from '../styles';
import SinglePicture from './SinglePicture';
import { PicturesTileProps } from './types';

export default function PicturesTile({ user: owner, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const { data: picturesMap } = useUserPicturesByIdQuery(owner.id);

  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .slice(0, 9)
    : [];

  const [isFullViewOpen, setIsFullViewOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<IAccountPicture>(pictures[0]);

  const handleOpenFullView = (picture: IAccountPicture) => {
    setSelectedPhoto(picture);
    setIsFullViewOpen(true);
  };

  if (isObjectEmpty(picturesMap)) return null;
  return (
    <>
      <StyledPageTile sx={{ ...sx }} {...rootProps}>
        <StyledPageTileHeader>Photos</StyledPageTileHeader>
        <StyledImageListContainer gap={2}>
          {pictures.map((picture) => {
            return (
              <SinglePicture
                key={picture.id}
                picture={picture}
                owner={owner}
                handleOpenFullView={handleOpenFullView}
              />
            );
          })}
        </StyledImageListContainer>
      </StyledPageTile>

      {isFullViewOpen && (
        <FullPageAccountPicturesView
          initialPhoto={selectedPhoto}
          setOpen={setIsFullViewOpen}
          ownerId={owner.id}
        />
      )}
    </>
  );
}
