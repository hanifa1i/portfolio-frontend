"use client"

import { useEffect, useState } from "react"
import styles from "./qualification.module.css"
import QualSection from "./qualSection/qualSection"
import QualTimeline from "./qualTimeline/qualTimeline"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { playSound } from "@/app/lib/SoundManager"
import { QualificationResponse } from "@/app/types/Dashboard"
import { getQualifications } from "@/app/services/QualificationService"

export type SortedQualifications = {
    level: string;
    qualifications: QualificationResponse[];
}
export default function qualification() {

    const [qual, setQual] = useState<number>(0);

    useScrollReveal(".offscreenLeft", "easeIn", false);

    const [qualifications, setQualifications] = useState<QualificationResponse[]>([]);
    const [enableQual, setEnableQual] = useState(false);
    const [sortedQual, setSortedQual] = useState<SortedQualifications[]>(
        [
            { level: "others", qualifications: [] },
            { level: "gcse", qualifications: [] },
            { level: "a-level", qualifications: [] },
            { level: "degree", qualifications: [] },
        ]
    )
    const [xPosition, setXPosition] = useState<number>(0);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: QualificationResponse[] = await getQualifications();
                sortQualifications(data);
                setQual(data.length - 1)
                if (data.length > 0) {setEnableQual(true)}
            } catch (error) {
                console.error("Failed to get qualifications", error);
            }
        };

        fetchRecent();
    }, [])

    const sortQualifications = (data: QualificationResponse[]) => {

        const newSortedQual: SortedQualifications[] = [
        { level: "others", qualifications: [] },
        { level: "gcse", qualifications: [] },
        { level: "a-level", qualifications: [] },
        { level: "degree", qualifications: [] },
    ];

    data.forEach(qual => {

        if (qual.level === "gcse") {
            newSortedQual[1].qualifications.push(qual);
        }
        else if (qual.level === "a-level") {
            newSortedQual[2].qualifications.push(qual);
        }
        else if (qual.level === "degree") {
            newSortedQual[3].qualifications.push(qual);
        }
        else {
            newSortedQual[0].qualifications.push(qual);
        }

    });

    setSortedQual(newSortedQual);

    setQualifications([
        ...newSortedQual[0].qualifications,
        ...newSortedQual[1].qualifications,
        ...newSortedQual[2].qualifications,
        ...newSortedQual[3].qualifications
    ]);

        console.log(sortedQual)
        console.log(qualifications)
    }

    return (
        <>
            <img style={{ "--xPos": `${xPosition}px` } as React.CSSProperties} src="/images/qualifications/bg-wide2.jpg" className={`${styles.background}`}/>


            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("blob"), qual > 0 ? (setQual(qual - 1), setXPosition(xPosition + 100)) : "" }}
                className={`${styles.switch} ${styles.previous}`}>←</div>
            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("blob"), qual < qualifications.length - 1 ? (setQual(qual + 1), setXPosition(xPosition - 100)) : ""}}
                className={`${styles.switch} ${styles.next}`}>→</div>

            {enableQual && (<div className={`${styles.qualContainer}`}>
                <div
                    style={{ "--sliderPosition": `-${qual * 60}vw` } as React.CSSProperties}
                    className={`${styles.qualSlider}  `}>
                    {qualifications.map((qualification, key) => (
                        <QualSection key={key} qualNumber={key} qualSelected={qual} data={qualification}/>
                    ))}
                </div>
            </div>)}
            <div className={`${styles.qualTimelineContainer}`}>
                <QualTimeline qualification={qual} setQual={setQual} sortedQual={sortedQual} bgPosition={xPosition} setBgPos={setXPosition}/>
            </div>
        </>
    )
}