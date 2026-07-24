"use client"
import { useEffect, useState } from "react"
import styles from "./qualTimeline.module.css"
import { playSound } from "@/app/lib/SoundManager"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { SortedQualifications } from "../qualification";

type Props = {
    qualification: number
    setQual: (index: number) => void
    sortedQual: SortedQualifications[]
    bgPosition: number
    setBgPos: (position: number) => void
}
export default function qualTimeline({ qualification, setQual, sortedQual, bgPosition, setBgPos }: Props) {

    const [selectQual, setSelectedQual] = useState<number>(-1);
    const [totalOthers, setTotalOthers] = useState<number>(0);
    const [totalGcses, setTotalGcses] = useState<number>(0);
    const [totalALevels, setTotalALevels] = useState<number>(0);


    useEffect(() => {
 
        const others = sortedQual[0].qualifications.length;
        const gcses = others + sortedQual[1].qualifications.length;
        const levels = gcses + sortedQual[2].qualifications.length;

        setTotalOthers(others);
        setTotalGcses(gcses);
        setTotalALevels(levels);
        console.log(others);
        console.log(gcses);
        console.log(levels);

    }, [sortedQual])

    const handleSelection = (selected : number) => {
        console.log("" + qualification + " - " + (selected))
        const positionDiff = (qualification - (selected)) * 100;
        setQual(selected);
        setBgPos(bgPosition + positionDiff);

    }
    useScrollReveal(".offscreenUp", "easeIn", false);


    return (
        <>
            <div className={`${styles.timeline} offscreenUp`}>
                <div className={`${styles.yearDivider}`}> others</div>

                {sortedQual[0].qualifications.map((qual, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), handleSelection(key) }}
                            className={`${styles.qualification} ${qualification === key ? styles.selectedQual : styles.unselectedQual} `}>

                            {qual.qualification}
                            <div className={`${styles.grade} ${qualification === key ? "" : styles.unselectedGrade}`}>{qual.grade}</div>

                        </div>

                    </div>
                ))}
                <div className={`${styles.yearDivider}`}> gcse</div>

                {sortedQual[1].qualifications.map((qual, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key + totalOthers ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), handleSelection(key + totalOthers) }}
                            className={`${styles.qualification} ${qualification === key + totalOthers ? styles.selectedQual : styles.unselectedQual} `}>

                            {qual.qualification}
                            <div className={`${styles.grade} ${qualification === key + totalOthers ? "" : styles.unselectedGrade}`}>{qual.grade}</div>

                        </div>

                    </div>
                ))}
                <div className={`${styles.yearDivider}`}> a-level</div>
                {sortedQual[2].qualifications.map((qual, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key + totalGcses ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), handleSelection(key + totalGcses) }}
                            className={`${styles.qualification} ${qualification === key + totalGcses ? styles.selectedQual : styles.unselectedQual} `}>
                            {qual.qualification}
                            <div className={`${styles.grade} ${qualification === key + totalGcses ? "" : styles.unselectedGrade}`}>{qual.grade}</div>

                        </div>

                    </div>
                ))}
                <div className={`${styles.yearDivider}`}> degree</div>
                {sortedQual[3].qualifications.map((qual, key) => (

                    <div key={key} className={`${styles.node} ${qualification === key + totalALevels ? styles.select : ""}`}>
                        <div
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => { playSound("blob"), handleSelection(key + totalALevels) }}
                            className={`${styles.qualification} ${qualification === key + totalALevels ? styles.selectedQual : styles.unselectedQual} `}>
                            {qual.qualification}
                            <div className={`${styles.grade} ${qualification === key + totalALevels ? "" : styles.unselectedGrade}`}>{qual.grade}</div>
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}