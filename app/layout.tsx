import { dmMono, nunito } from "@/lib/fonts";
import type { Metadata } from "next";
import Navbar from "../components/navbar";
import "./globals.css";
// import MusicPlayer from "@/components/music-player";

export const metadata: Metadata = {
  title: "Musixan",
  description: "A minimal music streaming app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full max-w-225 mx-auto text-zinc-100 bg-black font-nunito"
      >
        <Navbar />
        {children}
        {/* <MusicPlayer /> */}
      </body>
    </html>
  );
}
