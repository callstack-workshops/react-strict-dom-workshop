import type { Metadata } from "next";
import "./globals.css";
import "./strict.css";

export const metadata: Metadata = {
  title: "RSD Workshop",
  description: "React Strict DOM workshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
