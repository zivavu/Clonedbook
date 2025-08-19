import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import LoadingPlaceholder from '../LoadingPlaceholder';

interface ImageWithGradientLoadingProps extends Omit<ImageProps, 'src'> {
  src: string | undefined;
  type?: 'profile' | 'background';
}

export default function ImageWithGradientLoading({
  alt,
  src,
  sizes,
  type,
  ...rootProps
}: ImageWithGradientLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowPlaceholder(true);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, type]);

  return (
    <>
      {src && (
        <Image
          loading='lazy'
          onLoad={() => setIsLoading(false)}
          sizes={sizes}
          alt={alt}
          src={src}
          {...rootProps}
        />
      )}
      {isLoading && !showPlaceholder && <LoadingPlaceholder />}
      {isLoading && type === 'profile' && showPlaceholder && (
        <Image src='/no-profile-picture-icon.svg' alt='Profile placeholder' fill />
      )}
    </>
  );
}
