import { Stack, Typography, useTheme } from '@mui/material';

import { StyledPhotoAddButton, StyledPhotoDropArea, StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { ChangeEvent, DragEvent, useState } from 'react';
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
          setErrors((prev) => [
            ...prev,
            { content: `You have already added this photo`, sevariety: 'warning' },
          ]);
          continue;
        }
        if (file.size > 5000000) {
          setErrors((prev) => [
            ...prev,
            { content: `Photo is too big(max 5MB)`, sevariety: 'warning' },
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
    <StyledRoot
      sx={{
        ...sx,
        borderColor: isDraggedOver ? theme.palette.primary.main : theme.palette.divider,
      }}
      {...rootProps}
    >
      <StyledPhotoAddButton>
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
          }}
        >
          <input
            type='file'
            id='file-upload'
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              handleFileUpload(e);
            }}
            accept='image/png, image/jpeg'
          />
          <Stack>
            {isDraggedOver ? (
              <Typography fontWeight={400} variant='h6' color={theme.palette.primary.dark}>
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
                  variant='caption'
                >
                  or drag and drop
                </Typography>
              </>
            )}
          </Stack>
        </StyledPhotoDropArea>
      </StyledPhotoAddButton>
    </StyledRoot>
  );
}
