"use client"
import { useEffect } from "react";
import "./globals.css";
import "./lib/SoundManager";
import { initSounds } from "./lib/SoundManager";
import { AuthProvider } from "../auth/AuthContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSounds();
  }, []);

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
