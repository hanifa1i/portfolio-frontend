import { QualificationResponse} from "@/app/types/Dashboard"
import styles from "./Expand.module.css"

type Props = {
    data: QualificationResponse
}

export default function ExpandQualification({ data }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.id}`}>{data.id}</div>
                <div className={`${styles.column}`}>
                    <div >
                        <div className={`${styles.heading}`}>qualification</div>
                        <div className={`${styles.data}`}>{data.qualification}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>institution</div>
                        <div className={`${styles.data}`}>{data.institution}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>level</div>
                        <div className={`${styles.data}`}>{data.level}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>grade</div>
                        <div className={`${styles.data}`}>{data.grade}</div>
                    </div>
                </div>
                <div className={`${styles.column}`}>
                    <div>
                        <div className={`${styles.heading}`}>start date</div>
                        <div className={`${styles.data}`}>{data.start_date}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>end date</div>
                        <div className={`${styles.data}`}>{data.end_date}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>description</div>
                        <div className={`${styles.data}`}>{data.description}</div>
                    </div>
                </div>
                <img className={`${styles.preview}`} src={data.certificates[0].image_url}/>
            </div>
        </>
    )
}