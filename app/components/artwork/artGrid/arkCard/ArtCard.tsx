"use client";

import { useState } from "react";
import styles from "../ArtGrid.module.css";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { ArtworkResponse } from "@/app/types/Dashboard";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";

type Props = { 
    artwork: ArtworkResponse
    onExpand: (img: ArtworkResponse) => void;
};

export default function ArtCard({artwork, onExpand} : Props) {

    useScrollReveal(".offscreenLeft", "easeIn");

    return (
        <>
            <div onMouseEnter={() => playSoundAt("hover", 0.3)} className={`offscreenLeft ${styles.artCard} `}>
                <img src={artwork.image_urls[0].image_url} className={styles.artCardImage} />
                <img src="/images/expand.png" onMouseEnter={() => playSound("hover")} onClick={() => {onExpand(artwork), playSound("whosh")}} 
                    className={styles.expandButton} />
            </div>
        </>
    )
}