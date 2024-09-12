import Aside from "@/components/Aside";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Providers from "../Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(nextAuthOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  // if (session) {
  //   if (session.user?.role?.role === "admin") {
  //     redirect("/admin");
  //   } else {
  //     redirect("/dashboard");
  //   }
  // }

  return (
    <Providers>
      <div className="first flex flex-col gap-10 h-screen">
        <Header />
        <div className="container grid grid-cols-1 md:grid-cols-[minmax(0px,326px)_1fr] lg:grid-cols-[minmax(0px,326px)_1fr_minmax(0px,326px)] gap-8 overflow-auto">
          <SideBar />
          {children}
          <Aside />
        </div>
      </div>
    </Providers>
  );
}
