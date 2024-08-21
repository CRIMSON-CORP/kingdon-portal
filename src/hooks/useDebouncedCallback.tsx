import { useCallback, useRef } from "react";

type DebouncedCallback<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): DebouncedCallback<T> {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
}

export default useDebouncedCallback;
