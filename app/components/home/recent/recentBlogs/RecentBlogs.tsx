import { playSound } from "@/app/lib/SoundManager";
import styles from "../Recent.module.css";

type BlogData = { heading: string; body: string; date: string };

export default function RecentBlogs({ heading, body, date }: BlogData) {

    return (<>
        <li onMouseEnter={() => playSound("hover")} className={`${styles.blogCard} offscreenRight`}>
            <div className={styles.blogCardHeading}>{heading}</div>
            <div className={styles.blogDate}>{date}</div>
            <div className={styles.blogCardInfo}>{body}</div>
            <div onMouseEnter={() => playSound("hover")} className={styles.blogCardLink}>open full blog</div>
        </li>
    </>
    )
}