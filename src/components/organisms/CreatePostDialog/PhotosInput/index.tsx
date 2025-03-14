import { Stack, Typography, useTheme } from '@mui/material';

import {
  StyledBorderBox,
  StyledPhotoAddButton,
  StyledPhotoDropArea,
  StyledPhotosResetIcon,
  StyledRoot,
} from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'sonner';
import UserPhotosDisplay from './UserPhotosDisplay';
import { PhotosInputProps } from './types';

export default function PhotosInput({
  photos,
  setPhotos,
  setErrors,
  sx,
  ...rootProps
}: PhotosInputProps) {
  const theme = useTheme();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const showPhotos = photos.length > 0 && !isDraggedOver;
  const fileMiBLimit = 5;
  function handleFileUpload(e: DragEvent<HTMLLabelElement> | ChangeEvent<HTMLInputElement>) {
    let files: FileList | undefined;
    if (e.type === 'drop') {
      e = e as DragEvent<HTMLLabelElement>;
      files = e.dataTransfer.files;
    } else {
      e = e as ChangeEvent<HTMLInputElement>;
      files = e.target.files || undefined;
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (photos.some((photo) => photo.name === file.name && photo.size === file.size)) {
          toast.warning('You have already added this photo');
          setErrors((prev) => [
            ...prev,
            { content: `You have already added this photo`, sevariety: 'warning' },
          ]);
          continue;
        }
        if (file.size / 1024 / 1024 > fileMiBLimit) {
          toast.warning(`Photo is too big (max ${fileMiBLimit}MiB)`);
          setErrors((prev) => [
            ...prev,
            { content: `Photo is too big(max ${fileMiBLimit}MiB)`, sevariety: 'warning' },
          ]);
          continue;
        }
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          setPhotos((prev) => [...prev, file]);
        }
      }
    }
  }

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledBorderBox
        sx={{ borderColor: isDraggedOver ? theme.palette.primary.main : theme.palette.divider }}>
        {showPhotos && (
          <StyledPhotosResetIcon onClick={() => setPhotos([])}>
            <Icon icon='xmark' fontSize='24' />
          </StyledPhotosResetIcon>
        )}
        <StyledPhotoAddButton>
          {showPhotos && <UserPhotosDisplay photos={photos} />}

          <StyledPhotoDropArea
            htmlFor='file-upload'
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggedOver(true);
            }}
            onDragLeave={() => setIsDraggedOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggedOver(false);
              handleFileUpload(e);
            }}>
            <input
              data-testid='new-post-image-input'
              type='file'
              id='file-upload'
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                handleFileUpload(e);
              }}
              accept='image/png, image/jpeg'
            />
            {!photos[0] && (
              <Stack>
                {isDraggedOver ? (
                  <Typography fontWeight={400} variant='h4' color={theme.palette.primary.dark}>
                    Drop Your photo here
                  </Typography>
                ) : (
                  <>
                    <Icon icon='file-circle-plus' fontSize='24' />
                    <Typography lineHeight='1.2rem' variant='subtitle1' mt={theme.spacing(1)}>
                      Add Photos
                    </Typography>
                    <Typography
                      lineHeight='0.8rem'
                      color={theme.palette.text.secondary}
                      variant='caption'>
                      or drag and drop
                    </Typography>
                  </>
                )}
              </Stack>
            )}
          </StyledPhotoDropArea>
        </StyledPhotoAddButton>
      </StyledBorderBox>
    </StyledRoot>
  );
}
