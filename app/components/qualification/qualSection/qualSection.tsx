import styles from "./qualSection.module.css"
type Props = {
    qualNumber: number
    qualSelected: number
}
export default function qualSection({ qualNumber, qualSelected }: Props) {
    return (
        <>
            <div className={`${styles.section}  ${qualNumber !== qualSelected ? styles.unselected : styles.selected}`}>
                <div className={`${styles.qualInfoContainer} ${qualNumber !== qualSelected ? styles.unselectedInfo : ""}`}>
                    <div className={`${styles.qualLevel}`}>level 3 award for</div>

                    <div className={`${styles.qualSubject}`}>being an idiot</div>
                    <div className={`${styles.qualInstitution}`}>at brunel university</div>

                    <div className={`${styles.qualDescription}  `}>this that this that papa mama papa mama orange avacado
                        this that this that papa mama papa mama orange avacado
                        this that this that papa mama papa mama orange avacado
                        this that this that papa mama papa mama orange avacado
                        this that this that papa mama papa mama orange avacado
                    </div>
                    <div className={`${styles.qualGrade}`}>A</div>

                </div>
                <div className={`${styles.qualCertificateContainer} `}>
                    <div className={`${styles.certificate} ${qualNumber !== qualSelected ? styles.unselectedCert : ""}`}></div>
                </div>
            </div>

        </>
    )
}