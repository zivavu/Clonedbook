import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import LoadingPlaceholder from '../LoadingPlaceholder';

export default function ImageWithGradientLoading({ alt, ...rootProps }: ImageProps) {
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
      {isLoading && <LoadingPlaceholder />}
    </>
  );
}
