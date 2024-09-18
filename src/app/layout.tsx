import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Kingdom Portal Network",
  description: "A prayr platform where christians come together and pray",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend_deca.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
