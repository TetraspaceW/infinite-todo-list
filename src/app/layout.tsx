import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinite To-Do List",
  description: "Tetraspace's infinite to-do list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
