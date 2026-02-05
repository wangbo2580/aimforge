// Pointer Lock API Hook - 用于锁定鼠标指针

import { useCallback, useEffect, useState, RefObject } from 'react';

interface UsePointerLockReturn {
  isLocked: boolean;
  requestLock: () => void;
  exitLock: () => void;
  error: string | null;
}

export function usePointerLock(
  elementRef: RefObject<HTMLElement | null>
): UsePointerLockReturn {
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLock = useCallback(() => {
    if (!elementRef.current) {
      setError('Element not found');
      return;
    }

    elementRef.current.requestPointerLock().catch((err) => {
      setError(err.message || 'Failed to lock pointer');
    });
  }, [elementRef]);

  const exitLock = useCallback(() => {
    document.exitPointerLock();
  }, []);

  useEffect(() => {
    const handleLockChange = () => {
      const locked = document.pointerLockElement === elementRef.current;
      setIsLocked(locked);
      if (locked) {
        setError(null);
      }
    };

    const handleLockError = () => {
      setError('Pointer lock failed');
      setIsLocked(false);
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    document.addEventListener('pointerlockerror', handleLockError);

    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange);
      document.removeEventListener('pointerlockerror', handleLockError);
    };
  }, [elementRef]);

  return { isLocked, requestLock, exitLock, error };
}
