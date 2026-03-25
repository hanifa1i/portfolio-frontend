import styles from "./RecentArtwork.module.css";

type Image = { image: string };

export default function RecentArtwork({ image }: Image) {

    return (<>
        <li className={`${styles.artCard} offscreenLeft`}>
            <img src={image} className={styles.artCardImage} />
            <img src="/images/expand.png" className={styles.expandButton} />
        </li>
    </>
    )
}