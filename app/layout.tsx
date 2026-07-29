"use client"
import { useEffect } from "react";
import "./globals.css";
import "./lib/SoundManager";
import { initSounds } from "./lib/SoundManager";
import { AuthProvider } from "../auth/AuthContext";
import { SettingsProvider } from "./settingsProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {

    const unlockAudio = () => {

        const audio = new Audio("/sounds/hover.wav");

        audio.volume = 0;

        audio.play();

        window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => {
        window.removeEventListener("click", unlockAudio);
    };

}, []);
  
  useEffect(() => {
    initSounds();
  }, []);

  return (
    <html lang="en">
      <meta name="theme-color" content="#11111100" />
      <body className="bg-black text-white">
        <AuthProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
