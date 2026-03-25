import Nav from "../components/navigation/Nav"
import Experience from "../components/experience/experience"
export default function experiencePage() {
    return (
        <>
            <div className="expContainer">

                <div className="pageCenterer">
                    <Nav />
                    <Experience />
                </div>
            </div>

        </>
    )
}