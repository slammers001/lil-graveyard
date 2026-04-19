import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const chelseaMarket = Geist({
  variable: "--font-chelsea-market",
  subsets: ["latin"],
  weight: "400",
});

const kranky = Geist({
  variable: "--font-kranky",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lil' Graveyard",
  description: "Track abandoned projects and uncover why they didn't work out",
  icons: {
    icon: "/grave.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&family=Kranky&display=swap" rel="stylesheet" />
        <link rel="icon" href="/grave.png" sizes="any" />
        <link rel="icon" href="/grave.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
