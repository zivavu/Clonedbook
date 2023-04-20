import { Portal, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import FullPagePhotosDisplay from '@/components/organisms/FullPagePhotosDisplay';
import { useFetchPostsQuery } from '@/features/postsAPI';
import { IPost } from '@/types/post';
import Image from 'next/image';
import { useState } from 'react';
import { PictureProps } from './types';

export default function Picture({
  src,
  alt,
  size: imageSize,
  quality,
  sx,
  children,
  ...rootProps
}: PictureProps) {
  const theme = useTheme();
  const [isError, setIsError] = useState(false);
  const { data } = useFetchPostsQuery({});
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [postData, setPostData] = useState<IPost | null>(null);

  const handleClick = () => {
    const post = data?.find((post) => post?.postPictures?.some((picture) => picture === src));
    if (!post) return;
    setPostData(post);
    console.log(postData);
    setIsFullViewOpen(!isFullViewOpen);
  };

  let imageSizes;
  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };
  switch (imageSize) {
    case 'small':
      imageSizes = [
        `${screens.small} 100px`,
        `${screens.medium} 200px`,
        `${screens.large} 200px`,
        `400px`,
      ].join(',');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 200px`,
        `${screens.medium} 300px`,
        `${screens.large} 400px`,
        `500px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 300px`,
        `${screens.medium} 500px`,
        `${screens.large} 700px`,
        `800px`,
      ].join(', ');
      break;
  }
  return (
    <>
      {isFullViewOpen && postData && (
        <Portal>
          <FullPagePhotosDisplay post={postData} photo={src} setOpen={setIsFullViewOpen} />
        </Portal>
      )}
      <StyledRoot sx={sx} {...rootProps}>
        <Image
          src={
            !isError ? src : `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/800`
          }
          alt={alt || "Post's picture"}
          fill
          quality={quality}
          sizes={imageSizes}
          onError={(e) => {
            setIsError(true);
          }}
          onClick={(e) => handleClick()}
          style={{
            cursor: 'pointer',
            objectFit: 'cover',
          }}
        />
        {children}
      </StyledRoot>
    </>
  );
}
