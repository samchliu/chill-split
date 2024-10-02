import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chill Split",
  description: "Chill trips, easy splits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('h-screen', font.className)}>{children}</body>
    </html>
  );
}
