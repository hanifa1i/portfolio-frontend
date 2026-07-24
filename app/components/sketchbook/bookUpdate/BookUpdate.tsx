import { useEffect, useState } from "react";
import styles from "./BookUpdate.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { RecentActivity } from "@/app/types/Dashboard";
import { formatDateFromDistanceToNow, getRecentSketchActivities } from "@/app/services/CommonService";

type Props = {
    book: number
}
export default function BookUpdate({ book }: Props) {

    const [hovered, setHovered] = useState(false);
    const [expand, setExpand] = useState(false);

    const handleExpand = (state: boolean) => {
        if (expand) { setExpand(false) }
        else { setExpand(true) }
    }

    const [recent, setRecent] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: RecentActivity[] = await getRecentSketchActivities();
                setRecent(data);
            } catch (error) {
                console.error("Failed to get recent sketch activities", error);
            }
        };

        fetchRecent();
    }, [])


    const extractBook = (text: string) => {
        const parts = text.split(" - ");
        const book = parts[0].replace("Book ", "");
        const page = parts[1].replace("Pg ", "").trim(); 

        return book;
    }
    return (
        <>
            <div
                className={`${styles.updateBar} ${expand ? styles.expand : ""} ${book !== -1 ? styles.updateBarHide : ""}`}
                onClick={() => { handleExpand(true), playSound("bell") }}
                onMouseEnter={() => { setHovered(true), playSound("hover") }}
                onMouseLeave={() => setHovered(false)}>
                <img className={`w-[30px] h-[30px]`} src={hovered ? "/images/sketchbook/bell.png" : "/images/sketchbook/bell-static.png"} />
                {expand &&
                    (<div className={`${styles.updateList}`}>

                        {recent.map((log, key) => (
                            <div key={key} className={`${styles.row} offscreenLeft`}>
                                <div className={`${
                                    extractBook(log.notes) === "1" ? styles.bookIcon1 
                                    : extractBook(log.notes) === "2" ? styles.bookIcon2 
                                    : extractBook(log.notes) === "3" ? styles.bookIcon3 
                                    : extractBook(log.notes) === "4" ? styles.bookIcon4 
                                    : extractBook(log.notes) === "5" ? styles.bookIcon5  : ""
                                }`}></div>
                                <div className={`${styles.pageNumber}`}>{log.notes}</div>
                                <div className={`${styles.action}`}>{log.actionType}d</div>

                                <div className={`${styles.date}`}>{formatDateFromDistanceToNow(log.createdAt)}</div>
                            </div>
                        ))}

                    </div>)
                }
                {expand && (
                    <div className={`${styles.heading}`}>Recent Updates </div>
                )}
            </div>
        </>
    )
}
