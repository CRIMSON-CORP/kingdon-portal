import Aside from "@/components/Aside";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Providers from "../Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex flex-col gap-10">
        <Header />
        <div className="container grid grid-cols-[minmax(0px,326px)_1fr_minmax(0px,326px)] gap-8">
          <SideBar />
          {children}
          <Aside />
        </div>
      </div>
    </Providers>
  );
}
