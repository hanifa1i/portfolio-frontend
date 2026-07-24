import { QualificationResponse } from "@/app/types/Dashboard"
import styles from "./qualSection.module.css"
type Props = {
    qualNumber: number
    qualSelected: number
    data: QualificationResponse
}
export default function qualSection({ qualNumber, qualSelected, data }: Props) {
    return (
        <>
            <div className={`${styles.section}  ${qualNumber !== qualSelected ? styles.unselected : styles.selected}`}>
                <div className={`${styles.qualInfoContainer} ${qualNumber !== qualSelected ? styles.unselectedInfo : ""}`}>
                    
                    <div className={`${styles.qualDate}`}>{data.start_date.slice(0, 4)}-{data.end_date.slice(0, 4)}</div>
                    <div className={`${styles.qualLevel}`}>{data.level}</div>
                    <div className={`${styles.qualSubject}`}>{data.qualification}</div>
                    <div className={`${styles.qualInstitution}`}>at {data.institution}</div>

                    <div className={`${styles.qualDescription}  `}>
                        {data.description}
                    </div>
                    <div className={`${styles.qualGrade}`}>{data.grade}</div>

                </div>
                <div className={`${styles.qualCertificateContainer} `}>
                    <div className={`${styles.certificate} ${qualNumber !== qualSelected ? styles.unselectedCert : ""}`}>
                        <img src={data.certificates[0].image_url}/>
                    </div>
                </div>
            </div>

        </>
    )
}