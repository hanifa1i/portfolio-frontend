import Nav from "../components/navigation/Nav"
import Experience from "../components/experience/experience"
import Info from "../components/info/Info"
export default function experiencePage() {
    return (
        <>
            <div className="expContainer">

                <div className="pageCenterer">
                    <Info/>
                    <Nav />
                    <Experience />
                </div>
            </div>

        </>
    )
}