import { useState } from "react";

export interface IUseToggle {
  value: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

function useToggle(initialValue = false): IUseToggle {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  const open = () => setValue(true);
  const close = () => setValue(false);

  return { value, toggle, open, close };
}

export default useToggle;
