"use client";

import { useState } from "react";
import styles from "../ArtGrid.module.css";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { ArtworkResponse } from "@/app/types/Dashboard";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";

type Props = { 
    artwork: ArtworkResponse
    onExpand: (img: ArtworkResponse) => void;
    resize: string;
};

export default function ArtCard({artwork, onExpand, resize} : Props) {

    useScrollReveal(".offscreenLeft", "easeIn", false, resize);

    return (
        <>
            <div onMouseEnter={() => playSoundAt("hover", 0.3)} className={` ${styles.artCard} ${resize === "small" ? styles.artCardSmall : ""} offscreenLeft`}>
                <img src={artwork.image_urls[0].image_url} className={styles.artCardImage} />
                <img src="/images/expand.png" onMouseEnter={() => playSound("hover")} onClick={() => {onExpand(artwork), playSound("whosh")}} 
                    className={styles.expandButton} />
            </div>
        </>
    )
}