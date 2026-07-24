"use client"

import { useEffect, useState } from "react"
import styles from "./experience.module.css"
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import Divider from "../common/Divider";
import { useScrollRevealExperience } from "@/app/hooks/useScrollReveal";
import InfoPreview from "./infoPreview/infoPreview";
import WeeklyActivities from "./weeklyActivities/weeklyActivities";
import WorkProjects from "./workProjects/workProjects";
import { dummyData } from "@/app/data/experience/dummyData";
import { ActivityResponse, WorkExperienceResponse } from "@/app/types/Dashboard";
import { getExperience } from "@/app/services/ExperienceService";


type Props = {
    experience: Experience;
}

export type WeeklyActivities = {
    monday: ActivityResponse[],
    tuesday: ActivityResponse[],
    wednesday: ActivityResponse[],
    thursday: ActivityResponse[],
    friday: ActivityResponse[],
    saturday: ActivityResponse[],
    sunday: ActivityResponse[],
}

export default function experience({ }: Props) {

    const [expandSkills, setExpandSkill] = useState(false);
    const [open, setOpen] = useState(false);
    const [workExperience, setWorkExperience] = useState<WorkExperienceResponse[]>([]);
    const [formattedActivities, setFormattedActivites] = useState<WeeklyActivities[]>([]);


    const [selectedExperience, setSelectedExperience] = useState<number>(0);

    useScrollRevealExperience(".offscreenLeft", "easeIn", false, workExperience);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: WorkExperienceResponse[] = await getExperience();
                setWorkExperience(data);
                const act: WeeklyActivities[] = data.map(exp => {
                    return transformActivities(exp.activities)
                })
                setFormattedActivites(act);
            } catch (error) {
                console.error("Failed to get qualifications", error);
            }
        };

        fetchRecent();
    }, [])

    const transformActivities = (activities: ActivityResponse[]) => {
        const grouped: WeeklyActivities = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };

        activities.forEach(activity => {

            const day = activity.day.trim().toLowerCase();

if (grouped[day as keyof typeof grouped]) {
    grouped[day as keyof typeof grouped].push(activity);
}
        });

        return grouped;
    }

    return (
        <>
            <div className={`${styles.container} offscreenLeft`}>
                <div
                    style={{ "--sliderPosition": `-${selectedExperience * 100}vw` } as React.CSSProperties}
                    className={`${styles.experience}   ${open ? styles.sliderState : styles.menuState} `}>

                    {workExperience.map((role, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => (!open ? playSound("hover") : "")}

                            onClick={() => { (!open ? playSound("whosh") : ""), setOpen(true), setSelectedExperience(index) }}
                            className={`${styles.role}  ${open ? "" : styles.roleButtonState} `}>

                            {role.job_title}

                            <InfoPreview disable={open} role={role} />

                            <div className={`${open ? styles.showInfo : styles.hideInfo}`}>

                                {/* company and period - optional */}
                                <div className={`flex offscreenLeft`}>
                                    <div className={`${styles.company}`}>{role.company_name}</div>
                                    <div className={`${styles.period}`}>{role.start_date.slice(0,4)}-{role.end_date.slice(2,4)}</div>
                                </div>
                                <Divider />

                                {/* descriptions - optional */}
                                <div className={`${styles.description} offscreenLeft`}>
                                    {role.description}
                                </div>
                                <Divider />

                                {/* skills - optional */}
                                <div className={`${styles.subHead} offscreenLeft`}> skills and tools used
                                    <div className={`${styles.skills} offscreenLeft`}>
                                        {role.skills.map((skill, index) => (
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
                                {role.activities.length > 0 && (
                                        <div className={`${styles.subHead} offscreenLeft`}> weekly activities
                                            <WeeklyActivities data={formattedActivities[index]} />
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
                {workExperience.map((role, key) => (
                    <div
                        key={key}
                        onMouseEnter={() => playSound("hover")}
                        onClick={() => { playSound("click"), setSelectedExperience(key) }}
                        className={`${styles.expNavButton} ${selectedExperience === key ? styles.selectedButton : styles.unselectedButton}`}>
                        {role.job_title}
                        <div className={`${selectedExperience === key ? styles.buttonYear : styles.buttonYearHidden}`}>{role.start_date.slice(0,4)}-{role.end_date.slice(2,4)}</div>
                    </div>
                ))}
            </div>
        </>
    )
}