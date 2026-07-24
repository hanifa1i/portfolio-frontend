import { useState } from "react"
import styles from "./weeklyActivities.module.css"
import { playSound } from "@/app/lib/SoundManager";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { WeeklyActivities } from "../experience";


type Props = {
    data: WeeklyActivities;
}

const daysOfWeek: (keyof WeeklyActivities)[] = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
]

export default function weeklyActivities({ data }: Props) {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState<number>(-1);
    const [currentDay, setDay] = useState<string>();

    useScrollReveal(".offscreenLeft", "easeIn", false)

    return (
        <>
            <div className={`${styles.week} `}>
                {daysOfWeek.map((day, key) => {

                    const activites = data[day];

                    return (
                        <div key={key} className={`${styles.dayContainer} offscreenLeft`}>
                            <div className={`${styles.dayName}`}>{day}</div>

                            {activites.map((activity, key) => (
                                <div className={`${styles.block}`} key={key}>
                                    <div className={`${styles.activity}`}>
                                        <div className={`${styles.time}`}>{activity.start_time}-{activity.end_time}</div>
                                        <div onClick={() => { playSound("click"), setDay(day), setOpen(true), setSelect(key) }}
                                            className={`${styles.title} ${day === currentDay && open && select === key ? styles.titleExpand : ""}`}>
                                            {activity.activity}
                                        </div>

                                        <div className={`${styles.description} ${day === currentDay && open && select === key ? styles.descriptionExpand : ""}`}>{activity.description}</div>
                                    </div>
                                    <div className={`${styles.connector}`}></div>
                                </div>
                            ))}


                        </div>
                    )
                }

                )}


            </div>
        </>
    )
} 