import { WorkExperienceResponse } from "@/app/types/Dashboard";
import styles from "./infoPreview.module.css"
import type { Experience } from "@/app/types/Experience";

type Props = {
    disable: boolean
    role: WorkExperienceResponse
}

export default function infoPreview({ disable, role }: Props) {
    return (
        <div className={`${disable ? "hidden" : styles.container}`}>
            <div className={`${disable ? "hidden" : ""}`}>at {role.company_name} </div>
            <div className={`
                    ${styles.summaryPreview} 
                    ${disable ? "hidden" : ""}`}>
                        {role.description} 
            </div>
            <div className={`
                    ${styles.period} 
                    ${disable ? "hidden" : ""}`}>
                        {role.start_date.slice(0,4)}-{role.end_date.slice(2,4)}
            </div>
        </div>
    )
}