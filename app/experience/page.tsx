"use client"
import Nav from "../components/navigation/Nav"
import Experience from "../components/experience/experience"
import Info from "../components/info/Info"
import useScrollReveal from "../hooks/useScrollReveal";
export default function experiencePage() {
    useScrollReveal(".offscreenDown", "easeIn", false);
    return (
        <>
            <div className="expContainer">

                <div className="pageCenterer">
                    <Info />
                    <Nav />
                    <Experience />
                </div>
                <div className="topFadeHomePage offscreenDown"></div>

            </div>

        </>
    )
}