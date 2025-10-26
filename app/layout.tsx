import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghana Petroleum Commission - Management System",
  description: "Enterprise petroleum data repository and management system for Ghana Petroleum Commission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
