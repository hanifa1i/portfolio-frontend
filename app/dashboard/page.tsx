"use client"
import Nav from "../components/navigation/Nav"
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "../components/dashboard/dashboard";

export default function dashboardPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

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
                    <Nav />
                    <Dashboard/>
                </div>
            </div>

        </>
    )
}