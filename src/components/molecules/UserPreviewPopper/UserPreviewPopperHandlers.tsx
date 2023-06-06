import { useRef, useState } from 'react';

export default function UserPreviewPopperHandlers(mouseEnterDelay: number = 300) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);

  const mouseEnterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (mouseLeaveTimerRef.current) {
      clearTimeout(mouseLeaveTimerRef.current);
      mouseLeaveTimerRef.current = null;
    }
    if (!isPopperOpen) {
      mouseEnterTimerRef.current = setTimeout(() => {
        setIsPopperOpen(true);
      }, mouseEnterDelay);
    } else {
      setIsPopperOpen(true);
    }
  }

  function handleMouseLeave() {
    if (mouseEnterTimerRef.current) {
      clearTimeout(mouseEnterTimerRef.current);
      mouseEnterTimerRef.current = null;
    }
    mouseLeaveTimerRef.current = setTimeout(() => {
      setIsPopperOpen(false);
    }, 100);
  }

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
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  };
}
