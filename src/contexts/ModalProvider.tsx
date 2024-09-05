"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export function useModal() {
  return React.useContext(ModalContext);
}

const bodyAnimationConfig: KeyframeAnimationOptions = {
  duration: 750,
  easing: "cubic-bezier(.17,.67,.16,.99)",
  fill: "forwards",
  delay: 75,
};

const ModalContext = createContext<{
  openModals: number;
  setOpenModals: Dispatch<SetStateAction<number>>;
}>({
  openModals: 0,
  setOpenModals: () => {},
});
function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModals, setOpenModals] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const { body } = document;
    const firstElementChild = document.querySelector("body > .first");

    if (!firstElementChild || !(firstElementChild instanceof HTMLElement))
      return;

    firstElementChild.style.transformOrigin = "50% 50vh";
    const hideBody = () => {
      firstElementChild.animate(
        {
          transform: "scale(0.8)",
        },
        bodyAnimationConfig
      );
      body.style.overflow = "hidden";
    };

    const showBody = () => {
      body.firstElementChild?.animate(
        {
          transform: "scale(1)",
        },
        bodyAnimationConfig
      );
      body.style.overflow = "";
    };

    if (openModals >= 1) {
      hideBody();
    } else {
      showBody();
    }

    return () => {
      showBody();
    };
  }, [openModals]);

  useEffect(() => {
    document.body.firstElementChild?.animate(
      {
        transform: "scale(1)",
      },
      bodyAnimationConfig
    );
    document.body.style.overflow = "";
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ openModals, setOpenModals }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
