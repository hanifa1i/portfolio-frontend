"use client"

import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    login: (token: string, username:string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider ({children} : { children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (storedToken) {
            setToken(storedToken)
            setUsername(storedUsername)
        }
    }, []);

    const login = (newToken: string, newUsername: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        localStorage.setItem("username", newUsername);
        setUsername(newUsername);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);

        localStorage.removeItem("username");
        setUsername(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                username,
                isAuthenticated: Boolean(token),
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext};