import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZFIZZ — Drive ideas. Build tomorrow.",
  description:
    "A cinematic, scroll-led brand experience built around speed, craft, and forward motion.",
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
