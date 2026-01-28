import { useEffect } from 'react';

export function useKeyboardShortcuts(onEscape?: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC 鍵返回首頁
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape]);
}
