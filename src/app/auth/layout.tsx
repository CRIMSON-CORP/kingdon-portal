import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="py-10">
        <div className="container flex justify-between items-center gap-4 w-full">
          <Image src="/img/logo.png" width={60} height={60} alt="logo" />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
