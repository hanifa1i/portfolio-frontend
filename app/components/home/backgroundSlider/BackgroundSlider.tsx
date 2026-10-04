import { playSound } from "@/app/lib/SoundManager";
import styles from "./BackgroundSlider.module.css"
import { useState } from "react";
type Props = {
    position: string;
    setPosition: (state: string) => void
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function BackgroundSlider({ position, setPosition, videoRef }: Props) {

    const [playing, setPlaying] = useState(true);

    const toggleVideo = () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            video.play();
            setPlaying(true)
        } else {
            video.pause();
            setPlaying(false)
        }
    };

    return (
        <div className={`${styles.player}`}>
            <button className={`${styles.playButton} ${!playing ? styles.pause : ""}`} onClick={toggleVideo}>
                {playing ? "⏸" : "▶"}
            </button>
            <div className={`${styles.container}`}>
                <div onPointerDown={() => { setPosition("left"), playSound("hover") }} className={`${styles.slide} ${position === "left" ? styles.selected : ""}`}></div>
                <div onPointerDown={() => { setPosition("center"), playSound("hover") }} className={`${styles.slide} ${position === "center" ? styles.selected : ""}`}></div>
                <div onPointerDown={() => { setPosition("right"), playSound("hover") }} className={`${styles.slide} ${position === "right" ? styles.selected : ""}`}></div>
                <div
                    className={`
                        ${styles.slider} 
                        ${position === "left" ? styles.posLeft : ""}
                        ${position === "center" ? styles.posCenter : ""}
                        ${position === "right" ? styles.posRight : ""}`}></div>

            </div>
            
        </div>
    )
}