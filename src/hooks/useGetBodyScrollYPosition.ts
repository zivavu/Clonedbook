import { useEffect, useState } from 'react';

export default function useGetBodyScrollYPosition() {
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [maxScrollYPosition, setMaxScrollYPosition] = useState(2000);
  useEffect(() => {
    const scrollElement = document.getElementsByTagName('html')[0];
    const handleScroll = () => {
      const target = scrollElement;
      setScrollYPosition(target.scrollTop);
      setMaxScrollYPosition(target.scrollHeight - target.clientHeight);
    };

    window?.addEventListener('scroll', handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollYPosition, maxScrollYPosition };
}
