"use client";

import { useState } from "react";
import styles from "../ArtGrid.module.css";
import useScrollReveal from "@/app/hooks/useScrollReveal";

type Art ={
    images: string[];
    date: string;
    tool: string;
}

type Props = { 
    art: Art
    onExpand: (img: Art) => void;
};

export default function ArtCard({art, onExpand} : Props) {

    useScrollReveal(".offscreenLeft", "easeIn");

    return (
        <>
            <div className={`offscreenLeft ${styles.artCard} `}>
                <img src={art.images[0]} className={styles.artCardImage} />
                <img src="/images/expand.png" onClick={() => onExpand(art)} 
                    className={styles.expandButton} />
            </div>
        </>
    )
}