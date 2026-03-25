"use client"

import { useState } from "react"
import styles from "./experience.module.css"
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import Divider from "../common/Divider";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import InfoPreview from "./infoPreview/infoPreview";
import WeeklyActivities from "./weeklyActivities/weeklyActivities";
import WorkProjects from "./workProjects/workProjects";
import type { Experience } from "@/app/types/Experience";
import { dummyData } from "@/app/data/experience/dummyData";


type Props = {
    experience: Experience;
}

export default function experience({ experience }: Props) {

    const [expandSkills, setExpandSkill] = useState(false);
    const [open, setOpen] = useState(false);

    const [selectedExperience, setSelectedExperience] = useState<number>(0);

    useScrollReveal(".offscreenLeft", "easeIn")

    return (
        <>
            <div className={`${styles.container} offscreenLeft`}>
                <div
                    style={{ "--sliderPosition": `-${selectedExperience * 100}vw` } as React.CSSProperties}
                    className={`${styles.experience}   ${open ? styles.sliderState : styles.menuState} `}>

                    {dummyData.map((role, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => (!open ? playSound("hover") : "")}
                            
                            onClick={() => { (!open ? playSound("whosh") : ""), setOpen(true), setSelectedExperience(index) }}
                            className={`${styles.role}  ${open ? "" : styles.roleButtonState} `}>

                            {role.title}

                            <InfoPreview disable={open} role={role}/>

                            <div className={`${open ? styles.showInfo : styles.hideInfo}`}>
                                
                                {/* company and period - optional */}
                                <div className={`flex offscreenLeft`}>
                                    <div className={`${styles.company}`}>{role.company}</div>
                                    <div className={`${styles.period}`}>{role.period}</div>
                                </div>
                                <Divider />

                                {/* descriptions - optional */}
                                <div className={`${styles.description} offscreenLeft`}>
                                    {role.summary}
                                </div>
                                <Divider />

                                {/* skills - optional */}
                                <div className={`${styles.subHead} offscreenLeft`}> skills and tools used
                                    <div className={`${styles.skills} offscreenLeft`}>
                                        {role.skillsLearned.map((skill, index) => (
                                            <div key={index} onClick={() => playSound("blob")} className={`${styles.skillName}`}>{skill}</div>
                                        ))}
                                    </div>
                                    <Divider />
                                </div>

                                {/* projects - optional */}
                                {role.projects.length !== 0 && (
                                    <div className={`${styles.subHead} offscreenLeft`}> projects worked on
                                        <WorkProjects projects={role.projects} />
                                        <Divider />
                                    </div>)
                                }

                                {/* activities - optional */}
                                {Object.values(role.weeklyActivities).some(
                                    activities => activities.length > 0) && (
                                        <div className={`${styles.subHead} offscreenLeft`}> weekly activities
                                            <WeeklyActivities data={role.weeklyActivities} />
                                            <Divider />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* back button */}
            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => { playSound("back"), setOpen(false), setSelectedExperience(0) }}
                className={`${styles.back} ${open ? styles.showBackButton : styles.hideBackButton}`}>
                    ←
            </div>

            <div className={`${styles.expNav} ${open ? "" : styles.hideNav}`}>
                {dummyData.map((role, key) => (
                    <div 
                        key={key}
                        onMouseEnter={() => playSound("hover")}
                        onClick={() => { playSound("click"), setSelectedExperience(key) }}
                        className={`${styles.expNavButton} ${selectedExperience === key ? styles.selectedButton : styles.unselectedButton}`}>
                            {role.title}
                        <div className={`${selectedExperience === key ? styles.buttonYear : styles.buttonYearHidden}`}>{role.period}</div>
                    </div>
                ))}
            </div>
        </>
    )
}