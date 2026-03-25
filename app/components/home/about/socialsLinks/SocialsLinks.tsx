import styles from "./SocialsLinks.module.css";

type SocialsProps = {
    name : string;
    image : string;
};

export default function Socials({name, image }: SocialsProps) {

    return (
        <>
            <div className={`${styles.iconContainer} offscreenLeft`}>
                <img src={image} className={styles.iconImage} />
                <div className={styles.iconName}>
                    {name}
                </div>
            </div>
        </>
    )
}