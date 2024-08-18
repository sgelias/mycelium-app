import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Flowbite } from "flowbite-react";
import NextAuthProvider from "./providers/next-auth";
import AppHeader from "@/components/ui/AppHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mycelium APP",
  description: "The Mycelium management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <Flowbite>
            <AppHeader />
            {children}
          </Flowbite>
        </NextAuthProvider>
      </body>
    </html>
  );
}
