import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/contexts/GameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Quest - Dual Mode Task Manager",
  description: "A gamified task manager with minimal and immersive modes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
