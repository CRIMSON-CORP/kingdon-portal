import ModalProvider from "@/contexts/ModalProvider";
import PostPrayerModalProvider from "@/contexts/PostPrayerModalProvider";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <PostPrayerModalProvider>{children}</PostPrayerModalProvider>
    </ModalProvider>
  );
}

export default Providers;
