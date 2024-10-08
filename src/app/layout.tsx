import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Flowbite } from "flowbite-react";
import NextAuthProvider from "./providers/next-auth";
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
      <body className={inter.className + " bg-neutral-50 dark:bg-neutral-900"}>
        <NextAuthProvider>
          <Flowbite>
            {children}
          </Flowbite>
        </NextAuthProvider>
      </body>
    </html>
  );
}
