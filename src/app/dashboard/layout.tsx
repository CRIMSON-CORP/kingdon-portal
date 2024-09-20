import Aside from "@/components/Aside";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { getDashboardData } from "@/lib/server-actions";
import Providers from "../Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getDashboardData<UserDashboard>();

  return (
    <Providers>
      <div className="first flex flex-col h-screen">
        <Header />
        <div className="container grid grid-cols-1 md:grid-cols-[minmax(0px,326px)_1fr] lg:grid-cols-[minmax(0px,326px)_1fr_minmax(0px,326px)] gap-8 overflow-auto pt-10 scrollable">
          <SideBar dashboardData={data} />
          {children}
          <Aside />
        </div>
      </div>
    </Providers>
  );
}
