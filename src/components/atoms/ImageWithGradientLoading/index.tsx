import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import LoadingPlaceholder from '../LoadingPlaceholder';

interface ImageWithGradientLoadingProps extends Omit<ImageProps, 'src'> {
  src: string | undefined;
}

export default function ImageWithGradientLoading({
  alt,
  src,
  sizes,
  ...rootProps
}: ImageWithGradientLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {src && (
        <Image
          loading='lazy'
          onLoadingComplete={() => setIsLoading(false)}
          sizes={sizes}
          alt={alt}
          src={src}
          {...rootProps}
        />
      )}
      {isLoading && <LoadingPlaceholder />}
    </>
  );
}
