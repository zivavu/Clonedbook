import { useEffect, useState } from 'react';

export const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (window) {
      setIsBrowser(true);
    }
  }, []);

  return isBrowser;
};
