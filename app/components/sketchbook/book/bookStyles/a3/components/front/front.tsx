import styles from "./front.module.css"

type Props = {
    state: string;
}
export default function Front({ state }: Props) {

    return (<>
        {Array.from({ length: 22 }).map((_, index) => (
            <div key={index}>
                <div
                    style={{ "--ringGapFront": `${index * 30}px` } as React.CSSProperties}
                    className={`${styles.hole}`}>
                </div>
                <div
                    style={{ "--ringGapFront": `${index * 30}px` } as React.CSSProperties}
                    className={`${styles.default} 
                        ${state === "front" ? styles.ringAfter : styles.ring}
                        ${state === "transition" ? `${styles.ringAfter} ${styles.transition}` : styles.ring}
                `}>
                </div>
            </div>
        ))}
    </>)
}