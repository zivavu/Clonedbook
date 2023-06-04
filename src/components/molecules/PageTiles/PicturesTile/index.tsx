import { Stack, useTheme } from '@mui/material';

import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import useFetchUsersPictures from '@/common/readData/useFetchUsersPictures';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import PicturesRow from './PicturesRow';
import { PicturesTileProps } from './types';

export default function PicturesTile({ user: owner, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(owner.id);
  console.log(picturesMap);
  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .slice(0, 9)
    : [];

  const rowCount = pictures.length > 6 ? 3 : pictures.length > 3 ? 2 : 1;

  if (isError || isLoading || isObjectEmpty(picturesMap)) return null;
  return (
    <StyledPageTile sx={{ ...sx }} {...rootProps}>
      <StyledPageTileHeader>Photos</StyledPageTileHeader>
      <Stack mt={2}>
        <PicturesRow
          pictures={pictures}
          startIndex={0}
          owner={owner}
          sx={{
            borderTopRightRadius: theme.spacing(2),
            borderTopLeftRadius: theme.spacing(2),
          }}
        />
        {rowCount > 1 && (
          <PicturesRow
            pictures={pictures}
            owner={owner}
            startIndex={3}
            sx={
              rowCount === 2
                ? {
                    borderBottomRightRadius: theme.spacing(2),
                    borderBottomLeftRadius: theme.spacing(2),
                  }
                : {}
            }
          />
        )}
        {rowCount > 2 && (
          <PicturesRow
            pictures={pictures}
            startIndex={6}
            owner={owner}
            sx={{
              borderBottomRightRadius: theme.spacing(2),
              borderBottomLeftRadius: theme.spacing(2),
            }}
          />
        )}
      </Stack>
    </StyledPageTile>
  );
}
