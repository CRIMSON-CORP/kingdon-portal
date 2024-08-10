export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}
