import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-[#020b23] relative h-full w-full flex col-span-3">
      <NavBar />
      <div className="py-10 px-16 w-full">{children}</div>
    </div>
  );
}
