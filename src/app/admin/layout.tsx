import Aside from "@/components/Aside";
import SideBar from "@/components/SideBar";
import { getDashboardData } from "@/lib/server-actions";
import Providers from "../Providers";
import Header from "./Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getDashboardData<UserDashboard>();
  return (
    <Providers>
      <div className="flex flex-col gap-10 min-h-screen">
        <Header />
        <div className="container grid grid-cols-[minmax(0px,326px)_1fr_minmax(0px,326px)] gap-8 flex-1">
          <SideBar dashboardData={data} />
          {children}
          <Aside />
        </div>
      </div>
    </Providers>
  );
}
