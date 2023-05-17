import { Stack, useTheme } from '@mui/material';

import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { StyledImageContainer, StyledImagesRow, StyledTileImage } from './styles';
import { PicturesRowProps, PicturesTileProps } from './types';

export default function PicturesTile({ user, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const { pictures: picturesMap } = user;
  const pictures = Object.values(picturesMap)
    .slice(0, 9)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const rowCount = pictures.length > 6 ? 3 : pictures.length > 3 ? 2 : 1;
  if (pictures.length === 0) return null;

  return (
    <StyledPageTile sx={{ ...sx }} {...rootProps}>
      <StyledPageTileHeader>Photos</StyledPageTileHeader>
      <Stack spacing={0.5} mt={2}>
        <PicturesRow
          pictures={pictures.slice(0, 3)}
          user={user}
          sx={{ borderTopRightRadius: theme.spacing(1), borderTopLeftRadius: theme.spacing(1) }}
        />
        {rowCount > 1 && (
          <PicturesRow
            pictures={pictures.slice(3, 6)}
            user={user}
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
            pictures={pictures.slice(6, 9)}
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

function PicturesRow({ pictures, user, sx, ...rootProps }: PicturesRowProps) {
  return (
    <StyledImagesRow direction='row' spacing={0.5} sx={sx} {...rootProps}>
      {pictures.map((picture) => {
        return (
          <StyledImageContainer key={picture.id}>
            <StyledTileImage
              src={picture.pictureURL}
              fill
              alt={`${user.firstName} ${user.lastName} Picture`}
            />
          </StyledImageContainer>
        );
      })}
    </StyledImagesRow>
  );
}
