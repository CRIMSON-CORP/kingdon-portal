import { useCallback, useState } from "react";

export interface IUseToggle {
  value: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

function useToggle(initialValue = false): IUseToggle {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);

  return { value, toggle, open, close };
}

export default useToggle;
