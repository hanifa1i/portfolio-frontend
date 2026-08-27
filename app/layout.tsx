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
      <head>
      <meta name="theme-color" content="#222" />
       <link
    rel="icon"
    href="/favicon.png"
    media="(prefers-color-scheme: light)"
  />

  <link
    rel="icon"
    href="/favicon-light.png"
    media="(prefers-color-scheme: dark)"
  />
  <link
        rel="apple-touch-icon"
        href="/favicon-light.png"
    />
      </head>
      <body className="bg-[#171717] text-white">
        <AuthProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
