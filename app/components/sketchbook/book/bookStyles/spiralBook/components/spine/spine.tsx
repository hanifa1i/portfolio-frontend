import styles from "./spine.module.css"

export default function Spine() {
    return (<>
        <div className={`${styles.backCover}`}></div>
        <div className={`${styles.pages}`}></div>
        <div className={`${styles.frontCover}`}></div>

        {Array.from({ length:  22}).map((_, index) => (
            <div
                key={index}
                style={{ "--ringGap": `${index * 30}px` } as React.CSSProperties}
                className={`${styles.ring}`}>
            </div>
        ))}

    </>)
}