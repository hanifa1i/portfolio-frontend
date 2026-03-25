"use client"

import { useState } from "react"
import styles from "./qualification.module.css"
import QualSection from "./qualSection/qualSection"
import QualTimeline from "./qualTimeline/qualTimeline"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { playSound } from "@/app/lib/SoundManager"


export default function qualification() {

    const [qual, setQual] = useState<number>(3);

    useScrollReveal(".offscreenLeft", "easeIn");


    return (
        <>
            <div className={`${styles.year}`}>2016</div>

            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("blob"), setQual(qual - 1) }}
                className={`${styles.switch} ${styles.previous}`}>←</div>
            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("blob"), setQual(qual + 1) }}
                className={`${styles.switch} ${styles.next}`}>→</div>

            <div className={`${styles.qualContainer} offscreenLeft`}>
                <div
                    style={{ "--sliderPosition": `-${qual * 60}vw` } as React.CSSProperties}
                    className={`${styles.qualSlider} `}>
                    {Array.from({ length: 20 }).map((_, key) => (
                        <QualSection key={key} qualNumber={key} qualSelected={qual} />
                    ))}
                </div>
            </div>
            <div className={`${styles.qualTimelineContainer}`}>
                <QualTimeline qualification={qual} setQual={setQual} />
            </div>
        </>
    )
}