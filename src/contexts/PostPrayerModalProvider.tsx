"use client";
import Modal from "@/components/Modal";
import PostPrayeForm from "@/components/PostPrayerForm";
import React, { createContext, useContext, useMemo, useState } from "react";

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

  const contextValues = useMemo(
    () => ({ isModalOpen, openModal, closeModal }),
    [isModalOpen]
  );

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
      <Modal open={isModalOpen} closeModal={closeModal}>
        <PostPrayeForm closeModal={closeModal} />
      </Modal>
    </ModalContext.Provider>
  );
};

export default PostPrayerModalProvider;

export const usePostPrayerModal = () => useContext(ModalContext);
