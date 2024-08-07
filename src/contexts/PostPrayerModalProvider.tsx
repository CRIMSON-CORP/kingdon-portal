"use client";
import Modal from "@/components/Modal";
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const PostPrayerModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <Modal open={isModalOpen} closeModal={closeModal}>
        Prayer Modal Open
      </Modal>
    </ModalContext.Provider>
  );
};

export default PostPrayerModalProvider;

export const usePostPrayerModal = () => useContext(ModalContext);
