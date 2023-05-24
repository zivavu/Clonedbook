import { Stack, useTheme } from '@mui/material';

import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import PicturesRow from './PicturesRow';
import { PicturesTileProps } from './types';

export default function PicturesTile({ user: owner, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(owner.id);
  const pictures = picturesMap
    ? Object.values(picturesMap.account)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .slice(0, 9)
    : [];

  const rowCount = pictures.length > 6 ? 3 : pictures.length > 3 ? 2 : 1;

  if (isError || isLoading || isObjectEmpty(picturesMap)) return null;
  return (
    <StyledPageTile sx={{ ...sx }} {...rootProps}>
      <StyledPageTileHeader>Photos</StyledPageTileHeader>
      <Stack spacing={0.5} mt={2}>
        <PicturesRow
          pictures={pictures}
          startIndex={0}
          owner={owner}
          sx={{
            borderTopRightRadius: theme.spacing(1),
            borderTopLeftRadius: theme.spacing(1),
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
            owner={owner}
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
