import useScrollReveal from "@/app/hooks/useScrollReveal";
import styles from "./Sidebar.module.css"
import { playSound } from "@/app/lib/SoundManager";

type Props = {
    heading: string;
    handleCreate: () => void;
    switchSection: (section: string) => void;
    setFadeOut: (state: boolean) => void;
    loading: string;
}

export default function Sidebar({heading, handleCreate, switchSection, setFadeOut, loading}: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const handleSwitch = (selectedSection: string) => {
        setFadeOut(true);
        setTimeout(() => { (switchSection("")) }, 100);
        setTimeout(() => { setFadeOut(false) }, 200);
    }

    return (
        <div className={`${styles.backContainer} offscreenRight `}>
            <div className={`${styles.heading}`}>{heading}</div>
            <div 
                className={`${styles.backButton}`}
                onMouseEnter={() => playSound("hover")}
                onClick={() => {handleSwitch(""), playSound("blob")}}>
                    ←
            </div>
            <div
                className={`${styles.backButton} ${styles.saveButton}`}
                onMouseEnter={() => playSound("hover")}
                onClick={() => { handleCreate(), playSound("blob") }}>
                    <img className={`${styles.buttonIcon}`} src="/images/dashboard/save.png" />
                    <div className={`${loading === "true" ? `${styles.loading} ${styles.loadingRotate}` : styles.hide}`} />
                    <div className={`${loading === "completed" ? `${styles.completed}` : styles.hide}`}>
                        ✓
                    </div>
            </div>
        </div>
    )
}