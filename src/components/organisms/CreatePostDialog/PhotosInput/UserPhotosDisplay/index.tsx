import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledPhotoCardMedia, StyledRoot } from './styles';

import { UserPhotosDisplayProps } from './types';

export default function UserPhotosDisplay({ photos, sx, ...rootProps }: UserPhotosDisplayProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <>
        {photos.length === 1 && (
          <StyledPhotoCardMedia
            key={photos[0].name}
            image={URL.createObjectURL(photos[0])}
            sx={{ width: '100%', minHeight: '100%', objectFit: 'contain' }}
          />
        )}
        {photos.length === 2 &&
          photos.map((photo) => {
            return (
              <StyledPhotoCardMedia
                key={photo.name}
                image={URL.createObjectURL(photo)}
                sx={{ width: '50%', minHeight: '100%' }}
              />
            );
          })}
        {photos.length === 3 && (
          <Stack width='100%' minHeight='600px'>
            <StyledPhotoCardMedia
              key={photos[0].name}
              image={URL.createObjectURL(photos[0])}
              sx={{ width: '100%', height: '60%', objectFit: 'contain' }}
            />
            <Stack direction='row' height='250px' width='100%'>
              {photos.slice(1, 3).map((photo) => {
                return (
                  <StyledPhotoCardMedia
                    key={photo.name}
                    image={URL.createObjectURL(photo)}
                    sx={{ width: '50%', height: '100%', objectFit: 'contain' }}
                  />
                );
              })}
            </Stack>
          </Stack>
        )}
        {photos.length === 4 && (
          <Stack minHeight='466px' width='100%' direction='row'>
            <StyledPhotoCardMedia
              key={photos[0].name}
              image={URL.createObjectURL(photos[0])}
              sx={{ width: '60%', minHeight: '100%', objectFit: 'contain' }}
            />
            <Stack width='40%' height='100%'>
              {photos.slice(1, 4).map((photo) => {
                return (
                  <StyledPhotoCardMedia
                    key={photo.name}
                    image={URL.createObjectURL(photo)}
                    sx={{ width: '100%', height: '33.3%', objectFit: 'contain' }}
                  />
                );
              })}
            </Stack>
          </Stack>
        )}
        {photos.length >= 5 && (
          <Stack minHeight='500px' width='100%'>
            <Stack height='55%' width='100%' direction='row'>
              {photos.slice(0, 2).map((photo) => {
                return (
                  <StyledPhotoCardMedia
                    key={photo.name}
                    image={URL.createObjectURL(photo)}
                    sx={{ width: '50%', height: '100%', objectFit: 'contain' }}
                  />
                );
              })}
            </Stack>
            <Stack width='100%' height='45%' direction='row'>
              {photos.slice(2, 4).map((photo) => {
                return (
                  <StyledPhotoCardMedia
                    key={photo.name}
                    image={URL.createObjectURL(photo)}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                );
              })}
              {photos.slice(4, 5).map((photo) => {
                return (
                  <Box key={photo.name} position='relative' width='100%' height='100%'>
                    <StyledPhotoCardMedia
                      image={URL.createObjectURL(photo)}
                      sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1000,
                        backgroundColor:
                          theme.palette.mode === 'light'
                            ? 'rgba(0,0,0,0.3)'
                            : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      <Typography variant='h4' fontWeight={400} color='white'>
                        +{photos.length - 4}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        )}
      </>
    </StyledRoot>
  );
}
