"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setSoundEnabled } from "./lib/SoundManager";

type SettingsContextType = {
    soundOn: boolean;
    animationsOn: boolean;
    shadowsOn: boolean;

    setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
    setAnimationsOn: React.Dispatch<React.SetStateAction<boolean>>;
    setShadowsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [soundOn, setSoundOn] = useState(true);
    const [animationsOn, setAnimationsOn] = useState(true);
    const [shadowsOn, setShadowsOn] = useState(true);

    useEffect(() => {
        setSoundEnabled(soundOn);
    }, [soundOn]);

    return (
        <SettingsContext.Provider
            value={{
                soundOn,
                animationsOn,
                shadowsOn,
                setSoundOn,
                setAnimationsOn,
                setShadowsOn,
            }}
        >
            <div
                className={`
          ${animationsOn ? "" : "no-animations"}
          ${shadowsOn ? "" : "no-shadows"}
          ${soundOn ? "" : "no-sound"}
        `}
            >
                {children}
            </div>
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used inside SettingsProvider");
    }

    return context;
}