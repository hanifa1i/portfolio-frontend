import styles from "./BackgroundSlider.module.css"
type Props = {
    position: string;
    setPosition: (state: string) => void
}

export default function BackgroundSlider({ position, setPosition }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div onPointerDown={() => setPosition("left")} className={`${styles.slide} ${position === "left" ? styles.selected : ""}`}></div>
                <div onPointerDown={() => setPosition("center")} className={`${styles.slide} ${position === "center" ? styles.selected : ""}`}></div>
                <div onPointerDown={() => setPosition("right")} className={`${styles.slide} ${position === "right" ? styles.selected : ""}`}></div>
                <div 
                    className={`
                        ${styles.slider} 
                        ${position === "left" ? styles.posLeft : ""}
                        ${position === "center" ? styles.posCenter : ""}
                        ${position === "right" ? styles.posRight : ""}`}></div>

            </div>
        </>
    )
}