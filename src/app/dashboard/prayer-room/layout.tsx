import PostPrayerFeed from "@/components/PostPrayerFeed";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <NavBar />
      <PostPrayerFeed />
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}
