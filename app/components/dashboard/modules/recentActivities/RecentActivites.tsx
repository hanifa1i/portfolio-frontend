import { RecentActivity } from "@/app/types/Dashboard";
import styles from "./RecentActivites.module.css"
import { useEffect, useState } from "react";
import { formatDateFromDistanceToNow, getRecentActivities } from "@/app/services/CommonService";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivites() {
    const [recent, setRecent] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: RecentActivity[] = await getRecentActivities();
                setRecent(data);
            } catch (error) {
                console.error("Failed to get recent activities", error);
            }
        };

        fetchRecent();
    }, [])

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.heading}`}>
                    Recent Activites
                </div>
                {recent.map((value, key) => (
                    <div key={key} className={`${styles.activity}`}>
                        <div>{value.description}</div>
                        <div className={`${styles.date}`}>{formatDateFromDistanceToNow(value.createdAt)}</div>
                    </div>
                ))}
            </div>
        </>
    )
}