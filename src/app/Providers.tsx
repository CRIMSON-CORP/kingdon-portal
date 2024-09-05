"use client";
import ModalProvider from "@/contexts/ModalProvider";
import PostPrayerModalProvider from "@/contexts/PostPrayerModalProvider";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <PostPrayerModalProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PostPrayerModalProvider>
    </ModalProvider>
  );
}

export default Providers;
