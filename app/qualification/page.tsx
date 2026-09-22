"use client"
import Info from "../components/info/Info"
import Nav from "../components/navigation/Nav"
import Qualification from "../components/qualification/qualification"
import useScrollReveal from "../hooks/useScrollReveal"
export default function qualificationPage() {
    useScrollReveal(".offscreenDown", "easeIn", false);
    return (
        <>
            <div className="qualContainer">
                <div className="topFadeQualPage offscreenDown"></div>

                <div className="pageCenterer">
                    <Info/>
                    <Nav />
                    <Qualification />
                </div>
            </div>

        </>
    )
}