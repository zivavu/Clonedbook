import { StyledImagesGrid, StyledRoot } from './styles';

import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { IPictureWithPlaceholders } from '@/types/picture';
import { useState } from 'react';
import FullPagePostPicturesView from '../../FullPagePhotosView/variants/FullPagePostPicturesView';
import LastPictureOverlay from './LastPictureOverlay';
import Picture from './Picture';
import { PicturesDisplayProps } from './types';
import useGetImagesGridSx from './useGetImagesGridSx';

export default function PicturesDisplay({
  post,
  refetchPost,
  pictures,
  sx,
  ...rootProps
}: PicturesDisplayProps) {
  const [isFullViewOpen, setIsFullViewOpen] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>(pictures[0].url);
  const picLength = pictures.length;
  const gridSx = useGetImagesGridSx(picLength);

  function handleFullSizeViewOpen(picture: IPictureWithPlaceholders) {
    setCurrentPhoto(picture.url);
    setIsFullViewOpen(true);
  }
  return (
    <>
      {isFullViewOpen && (
        <FullPagePostPicturesView
          initialPhotoUrl={currentPhoto}
          post={post}
          refetchPost={refetchPost}
          setOpen={setIsFullViewOpen}
        />
      )}
      <StyledRoot sx={sx} {...rootProps}>
        <HorizontalContentDevider sx={{ top: '-1px' }} />

        <StyledImagesGrid sx={gridSx}>
          {picLength === 1 && (
            <Picture
              key={pictures[0].url}
              picture={pictures[0]}
              imageSize='large'
              handleClick={handleFullSizeViewOpen}
            />
          )}

          {picLength === 2 &&
            pictures.map((picture) => (
              <Picture
                key={picture.url}
                picture={picture}
                handleClick={handleFullSizeViewOpen}
                imageSize='medium'
              />
            ))}

          {picLength === 3 && (
            <>
              <Picture
                key={pictures[0].url}
                picture={pictures[0]}
                imageSize='medium'
                handleClick={handleFullSizeViewOpen}
                gridColumn='1 / 3'
              />
              {pictures.slice(1, 3).map((picture) => (
                <Picture
                  key={picture.url}
                  picture={picture}
                  imageSize='medium'
                  handleClick={handleFullSizeViewOpen}
                />
              ))}
            </>
          )}

          {picLength === 4 &&
            pictures.map((picture) => (
              <Picture
                key={picture.url}
                picture={picture}
                imageSize='small'
                handleClick={handleFullSizeViewOpen}
              />
            ))}

          {picLength >= 5 && (
            <>
              {pictures.slice(0, 2).map((picture, i) => (
                <Picture
                  key={picture.url}
                  picture={picture}
                  imageSize='medium'
                  gridColumn={`${i * 3 + 1} / ${i * 3 + 4}`}
                  handleClick={handleFullSizeViewOpen}
                />
              ))}

              {pictures.slice(2, 5).map((picture, i) => {
                return i === 2 && picLength > 5 ? (
                  <LastPictureOverlay
                    key={picture.url}
                    picturesLength={picLength}
                    gridColumn={`${i * 2 + 1} / ${i * 2 + 3}`}>
                    <Picture
                      key={picture.url}
                      picture={picture}
                      imageSize='medium'
                      handleClick={handleFullSizeViewOpen}
                    />
                  </LastPictureOverlay>
                ) : (
                  <Picture
                    key={picture.url}
                    picture={picture}
                    imageSize='medium'
                    gridColumn={`${i * 2 + 1} / ${i * 2 + 3}`}
                    handleClick={handleFullSizeViewOpen}
                  />
                );
              })}
            </>
          )}
        </StyledImagesGrid>
        <HorizontalContentDevider sx={{ bottom: '0' }} />
      </StyledRoot>
    </>
  );
}
