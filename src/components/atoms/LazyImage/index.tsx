import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import PictureLoadingPlaceholder from '../PictureLoadingPlaceholder';

export default function LazyImage({ alt, ...rootProps }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Image
        loading='lazy'
        unoptimized
        onLoadingComplete={() => setIsLoading(false)}
        alt={alt}
        {...rootProps}
      />
      {isLoading && <PictureLoadingPlaceholder />}
    </>
  );
}
