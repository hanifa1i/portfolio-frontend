import Info from "../components/info/Info"
import Nav from "../components/navigation/Nav"
import Qualification from "../components/qualification/qualification"
export default function qualificationPage() {
    return (
        <>
            <div className="qualContainer">

                <div className="pageCenterer">
                    <Info/>
                    <Nav />
                    <Qualification />

                </div>
            </div>

        </>
    )
}