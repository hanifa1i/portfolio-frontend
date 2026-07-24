import styles from "./Background.module.css"

type Props = {
    bookActive: boolean
}

export default function Background({bookActive} : Props) {
    return (<>
        
            <img src="/images/me3.jpeg" className={`${styles.sketchbookBg} ${bookActive ? `${styles.sketchbookBgHidden}` : ""}`} />
       </>
    )

}