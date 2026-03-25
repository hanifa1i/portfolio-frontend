"use client"
import { useState } from "react"
import styles from "./qualTimeline.module.css"
import { playSound } from "@/app/lib/SoundManager"
import useScrollReveal from "@/app/hooks/useScrollReveal";

type Props = {
    qualification: number
    setQual: (index: number) => void
}
export default function qualTimeline({ qualification, setQual }: Props) {

    const [selectQual, setSelectedQual] = useState<number>(-1);
    
    useScrollReveal(".offscreenUp", "easeIn");


    return (
        <>
            <div className={`${styles.timeline} offscreenUp`}>
                {Array.from({ length: 10 }).map((_, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), setQual(key) }}
                            className={`${styles.qualification} ${qualification === key ? styles.selectedQual : styles.unselectedQual} `}>

                            degree
                            <div className={`${styles.grade} ${qualification === key ? "" : styles.unselectedGrade}`}>a+</div>

                        </div>

                    </div>
                ))}
                <div className={`${styles.yearDivider}`}> gcse</div>
                {Array.from({ length: 5 }).map((_, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key + 10 ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), setQual(key + 10) }}
                            className={`${styles.qualification} ${qualification === key + 10 ? styles.selectedQual : styles.unselectedQual} `}>
                            degree
                            <div className={`${styles.grade} ${qualification === key + 10 ? "" : styles.unselectedGrade}`}>2:1</div>

                        </div>

                    </div>
                ))}
                <div className={`${styles.yearDivider}`}> a-level</div>
                {Array.from({ length: 10 }).map((_, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key + 15 ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), setQual(key + 15) }}
                            className={`${styles.qualification} ${qualification === key + 15 ? styles.selectedQual : styles.unselectedQual} `}>
                            computer science
                            <div className={`${styles.grade} ${qualification === key + 15 ? "" : styles.unselectedGrade}`}>2:1</div>
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}