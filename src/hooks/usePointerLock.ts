// Pointer Lock API Hook - 用于锁定鼠标指针

import { useCallback, useEffect, useState, RefObject } from 'react';

export type PointerLockMode = 'none' | 'raw' | 'standard';

interface UsePointerLockReturn {
  isLocked: boolean;
  lockMode: PointerLockMode;
  rawInputSupported: boolean | null;
  requestLock: () => Promise<PointerLockMode>;
  exitLock: () => void;
  error: string | null;
}

export function usePointerLock(
  elementRef: RefObject<HTMLElement | null>
): UsePointerLockReturn {
  const [isLocked, setIsLocked] = useState(false);
  const [lockMode, setLockMode] = useState<PointerLockMode>('none');
  const [rawInputSupported, setRawInputSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLock = useCallback(async (): Promise<PointerLockMode> => {
    const element = elementRef.current;

    if (!element) {
      setError('Element not found');
      setLockMode('none');
      return 'none';
    }

    if (!element.requestPointerLock) {
      setError('Pointer lock is not supported in this browser');
      setLockMode('none');
      return 'none';
    }

    const request = element.requestPointerLock as (
      options?: { unadjustedMovement?: boolean }
    ) => Promise<void> | void;

    try {
      await Promise.resolve(request.call(element, { unadjustedMovement: true }));
      setRawInputSupported(true);
      setLockMode('raw');
      setError(null);
      return 'raw';
    } catch {
      setRawInputSupported(false);
    }

    try {
      await Promise.resolve(request.call(element));
      setLockMode('standard');
      setError(null);
      return 'standard';
    } catch (err) {
      setLockMode('none');
      setError(err instanceof Error ? err.message : 'Failed to lock pointer');
      return 'none';
    }
  }, [elementRef]);

  const exitLock = useCallback(() => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const handleLockChange = () => {
      const locked = document.pointerLockElement === elementRef.current;
      setIsLocked(locked);
      if (locked) {
        setError(null);
      } else {
        setLockMode('none');
      }
    };

    const handleLockError = () => {
      setError('Pointer lock failed');
      setIsLocked(false);
      setLockMode('none');
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    document.addEventListener('pointerlockerror', handleLockError);

    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange);
      document.removeEventListener('pointerlockerror', handleLockError);
    };
  }, [elementRef]);

  return { isLocked, lockMode, rawInputSupported, requestLock, exitLock, error };
}
