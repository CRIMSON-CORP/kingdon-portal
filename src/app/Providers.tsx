import PostPrayerModalProvider from "@/contexts/PostPrayerModalProvider";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return <PostPrayerModalProvider>{children}</PostPrayerModalProvider>;
}

export default Providers;
