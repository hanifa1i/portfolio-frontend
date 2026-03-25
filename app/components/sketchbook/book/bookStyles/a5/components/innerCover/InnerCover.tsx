import styles from "./InnerCover.module.css"

export default function InnerCover() {

    return (<>
        <div className={`${styles.innerCoverStitching}`}>
            <div className={`${styles.innerCoverPocket}`}>
                <div className={`${styles.innerCoverPocketStitching}`}></div>
            </div>
            <div className={`${styles.innerCoverBook}`}></div>
        </div>
    </>)
}