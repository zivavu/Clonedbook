import { Stack, useTheme } from '@mui/material';

import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import { useState } from 'react';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import PicturesRow from './PicturesRow';
import { PicturesTileProps } from './types';

export default function PicturesTile({ user: owner, sx, ...rootProps }: PicturesTileProps) {
  const theme = useTheme();
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(true);
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(
    owner.id,
    shouldRefetch,
    setShouldRefetch,
  );

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
          setShouldRefetch={setShouldRefetch}
          owner={owner}
          sx={{ borderTopRightRadius: theme.spacing(1), borderTopLeftRadius: theme.spacing(1) }}
        />
        {rowCount > 1 && (
          <PicturesRow
            pictures={pictures}
            owner={owner}
            setShouldRefetch={setShouldRefetch}
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
            setShouldRefetch={setShouldRefetch}
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
