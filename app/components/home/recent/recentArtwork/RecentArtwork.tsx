import useScrollReveal from "@/app/hooks/useScrollReveal";
import styles from "./RecentArtwork.module.css";
import { useState } from "react";
import { playSound } from "@/app/lib/SoundManager";

type Image = { image: string };

export default function RecentArtwork({ image }: Image) {

    useScrollReveal(".offscreenLeft", "easeIn", false);
    
    return (<>
        <li onMouseEnter={() => playSound("hover")} className={`${styles.artCard} offscreenLeft`}>
            <img src={image} className={styles.artCardImage} />
        </li>
    </>
    )
}