import styles from "./infoPreview.module.css"
import type { Experience } from "@/app/types/Experience";

type Props = {
    disable: boolean
    role: Experience
}

export default function infoPreview({ disable, role }: Props) {
    return (
        <div className={`${disable ? "hidden" : styles.container}`}>
            <div className={`${disable ? "hidden" : ""}`}>at {role.company} </div>
            <div className={`
                    ${styles.summaryPreview} 
                    ${disable ? "hidden" : ""}`}>
                        {role.summary} 
            </div>
            <div className={`
                    ${styles.period} 
                    ${disable ? "hidden" : ""}`}>
                        {role.period} 
            </div>
        </div>
    )
}