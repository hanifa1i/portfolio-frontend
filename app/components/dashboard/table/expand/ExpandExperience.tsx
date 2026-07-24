import { WorkExperienceResponse } from "@/app/types/Dashboard"
import styles from "./Expand.module.css"

type Props = {
    data: WorkExperienceResponse
}

export default function ExpandExpereince({ data }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.id}`}>{data.id}</div>
                <div className={`${styles.column}`}>
                    <div >
                        <div className={`${styles.heading}`}>job title</div>
                        <div className={`${styles.data}`}>{data.job_title}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>company</div>
                        <div className={`${styles.data}`}>{data.company_name}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>location</div>
                        <div className={`${styles.data}`}>{data.location}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>start date</div>
                        <div className={`${styles.data}`}>{data.start_date}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>end date</div>
                        <div className={`${styles.data}`}>{data.end_date}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>no. of projects added</div>
                        <div className={`${styles.data}`}>{data.projects.length}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>no. of activites added</div>
                        <div className={`${styles.data}`}>{data.projects.length}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>no. of skills used</div>
                        <div className={`${styles.data}`}>{data.projects.length}</div>
                    </div>
                </div>
                <div className={`${styles.column}`}>
                    <div>
                        <div className={`${styles.heading}`}>description</div>
                        <div className={`${styles.data}`}>{data.description}</div>
                    </div>
                </div>
            </div>
        </>
    )
}