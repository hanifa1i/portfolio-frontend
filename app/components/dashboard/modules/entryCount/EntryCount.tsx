import { useEffect, useState } from "react";
import styles from "./EntryCount.module.css"
import { sections } from "@/app/data/dashboard/sections";
import { getCount } from "@/app/services/CommonService";
import { TotalCount } from "@/app/types/Dashboard";

export default function EntryCount() {

    const [count, setCount] = useState<TotalCount>();

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const data: TotalCount = await getCount();
                setCount(data);
            } catch (error) {
                console.error("Failed to get count", error);
            }
        };

        fetchCount();
    }, [])
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.box}`}>
                    <img src={sections[0].image} className={`${styles.boxImage}`}/>
                    {count?.total_artworks}
                </div>
                <div className={`${styles.box}`}>
                    <img src={sections[1].image} className={`${styles.boxImage}`}/>
                    {count?.total_sketchbook_pages}
                </div>
                <div className={`${styles.box}`}>
                    <img src={sections[2].image} className={`${styles.boxImage}`}/>
                    {count?.total_skills}
                </div><div className={`${styles.box}`}>
                    <img src={sections[3].image} className={`${styles.boxImage}`}/>
                    {count?.total_qualifications}
                </div>
                <div className={`${styles.box}`}>
                    <img src={sections[4].image} className={`${styles.boxImage}`}/>
                    {count?.total_experience}
                </div>
                <div className={`${styles.box}`}>
                    <img src={sections[5].image} className={`${styles.boxImage}`}/>
                    0
                </div>
                
            </div>
        </>
    )
}