"use client"
import Nav from "../components/navigation/Nav"
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Info from "../components/info/Info";
import useScrollReveal from "../hooks/useScrollReveal";

export default function dashboardPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    useScrollReveal(".offscreenDown", "easeIn", false);

    /*useEffect(() => {
        if (!isAuthenticated){
            router.replace("/");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;*/

    return (
        <>
            <div className="dashboardContainer ">

                <div className="pageCenterer">
                    <Info/>
                    <Nav />
                    <Dashboard/>
                </div>
                <div className="topFadeHomePage offscreenDown"></div>
            </div>

        </>
    )
}