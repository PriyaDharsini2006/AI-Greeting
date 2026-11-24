
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Greeting Generator",
  description: "Generate personalized greetings using AI",
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
