import { useRef, useState } from 'react';

export default function useReactionsPopperHandlers() {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperAnchorElRef = useRef<HTMLButtonElement>(null);

  function handlePopperOpen() {
    setIsPopperOpen(true);
  }

  function handlePopperClose() {
    setIsPopperOpen(false);
  }

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleTouchStart() {
    timerRef.current = setTimeout(() => {
      setIsPopperOpen(true);
    }, 400);
  }
  function handleTouchEnd() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }
  return {
    isPopperOpen,
    popperAnchorElRef,
    handlePopperOpen,
    handlePopperClose,
    handleTouchStart,
    handleTouchEnd,
  };
}
