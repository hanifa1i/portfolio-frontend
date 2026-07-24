import { playSound } from "@/app/lib/SoundManager";
import styles from "./SocialsLinks.module.css";

type SocialsProps = {
    name: string;
    image: string;
    link: string;
};

export default function Socials({ name, image, link }: SocialsProps) {
    const isEmail = link.startsWith("mailto:");

    return (
        <>
            <a
                href={link}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                onClick={() => playSound("whosh")}
                onMouseEnter={() => playSound("hover")} className={`${styles.iconContainer} offscreenLeft`}>
                <img src={image} className={styles.iconImage} />
                <div className={styles.iconName}>
                    {name}
                </div>
            </a>
        </>
    )
}