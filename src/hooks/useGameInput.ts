// 游戏输入处理 Hook

import { useEffect, useCallback, RefObject } from 'react';

interface GameInputCallbacks {
  onMouseMove?: (movementX: number, movementY: number) => void;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onKeyDown?: (key: string) => void;
  onKeyUp?: (key: string) => void;
}

export function useGameInput(
  elementRef: RefObject<HTMLElement | null>,
  callbacks: GameInputCallbacks,
  enabled: boolean = true
) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      callbacks.onMouseMove?.(e.movementX, e.movementY);
    },
    [callbacks, enabled]
  );

  const handleClick = useCallback(() => {
    if (!enabled) return;
    callbacks.onClick?.();
  }, [callbacks, enabled]);

  const handleMouseDown = useCallback(() => {
    if (!enabled) return;
    callbacks.onMouseDown?.();
  }, [callbacks, enabled]);

  const handleMouseUp = useCallback(() => {
    if (!enabled) return;
    callbacks.onMouseUp?.();
  }, [callbacks, enabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      // 防止默认行为
      if (['Escape', ' ', 'Tab'].includes(e.key)) {
        e.preventDefault();
      }
      callbacks.onKeyDown?.(e.key);
    },
    [callbacks, enabled]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      callbacks.onKeyUp?.(e.key);
    },
    [callbacks, enabled]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    // 鼠标事件绑定到 document（Pointer Lock 模式下）
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    elementRef,
    enabled,
    handleMouseMove,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
    handleKeyUp,
  ]);
}
