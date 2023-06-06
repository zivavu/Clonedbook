import { useRef, useState } from 'react';

export default function UserPreviewPopperHandlers(mouseEnterDelay: number = 300) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);

  const mouseEnterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    mouseEnterTimerRef.current = setTimeout(() => {
      setIsPopperOpen(true);
    }, mouseEnterDelay);
  }
  function handleMouseOut() {
    if (mouseEnterTimerRef.current) {
      clearTimeout(mouseEnterTimerRef.current);
      mouseEnterTimerRef.current = null;
    }
    setIsPopperOpen(false);
  }

  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleTouchStart() {
    touchTimerRef.current = setTimeout(() => {
      setIsPopperOpen(true);
    }, 400);
  }
  function handleTouchEnd() {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  }
  return {
    isPopperOpen,
    anchorElRef,
    handleMouseEnter,
    handleMouseOut,
    handleTouchStart,
    handleTouchEnd,
  };
}
