import { SkillResponse } from "@/app/types/Dashboard"
import styles from "./Expand.module.css"

type Props = {
    data: SkillResponse
}

export default function ExpandSkill({ data }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.id}`}>{data.id}</div>
                <div className={`${styles.column}`}>
                    <div >
                        <div className={`${styles.heading}`}>title</div>
                        <div className={`${styles.data}`}>{data.name}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>category</div>
                        <div className={`${styles.data}`}>{data.skill_type}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>where learnt</div>
                        <div className={`${styles.data}`}>{data.experience_locations}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>no. of examples</div>
                        <div className={`${styles.data}`}>{data.examples.length}</div>
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