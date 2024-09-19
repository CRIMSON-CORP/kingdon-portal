"use client";
import { useModal } from "@/contexts/ModalProvider";
import { AnimatePresence, LayoutGroup, Variants, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MouseEventHandler, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon";

const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 1.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      duration: 1,
      ease: [0.17, 0.67, 0.16, 0.99],
      opacity: {
        duration: 0.5,
      },
    },
  },
};

interface ModalProps extends PropsWithChildren {
  open: boolean;
  closeModal: () => void;
}

function Modal({ open = false, children, closeModal }: ModalProps) {
  const pathname = usePathname();
  const { setOpenModals } = useModal();
  const preventOutsideClick: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      setOpenModals((prev) => prev + 1);
    }

    return () => {
      if (open) {
        setOpenModals((prev) => prev - 1);
      }
    };
  }, [open, setOpenModals]);

  useEffect(() => {
    window.addEventListener("modal-close-trigger", closeModal);
    return () => {
      window.removeEventListener("modal-close-trigger", closeModal);
    };
  }, [closeModal]);

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keyup", closeModalOnEscape);

    return () => {
      window.removeEventListener("keyup", closeModalOnEscape);
    };
  }, [closeModal]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          layout
          exit="initial"
          initial="initial"
          animate="animate"
          variants={modalVariants}
          className="bg-black/5 backdrop-blur fixed w-full h-full inset-0 flex items-center justify-center p-5"
        >
          <motion.div layout className="relative w-full max-w-[600px]">
            <LayoutGroup>
              <motion.div
                layout="position"
                className="right-0 md:-right-5 -top-5 md:top-0 absolute"
              >
                <button
                  onClick={closeModal}
                  className="size-12 -translate-y-full md:translate-y-0 md:translate-x-full bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <Icon name="close" size={32} />
                </button>
              </motion.div>
              <motion.div
                layout
                onClick={preventOutsideClick}
                className="relative bg-white p-3 pt-10 rounded-xl max-h-[80vh] overflow-x-clip overflow-y-auto shadow-form-card w-full scrollable"
              >
                <motion.div layout className="sm:p-3 flex flex-col gap-10">
                  {children}
                </motion.div>
              </motion.div>
            </LayoutGroup>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
