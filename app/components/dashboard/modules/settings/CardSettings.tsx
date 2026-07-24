import styles from "./Settings.module.css"
import Toggle from "./toggle/Toggle"
import { useSettings } from "@/app/settingsProvider"


export default function CardSettings() {
    const {
        soundOn,
        animationsOn,
        shadowsOn,
        setSoundOn,
        setAnimationsOn,
        setShadowsOn,
    } = useSettings();

    return (
        <>
            <div className={`${styles.container}`}>
                
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Sound <div className={styles.subInfo}>for hover and clicking effects</div></div>
                    <Toggle
                        checked={soundOn}
                        onChange={() => setSoundOn(prev => !prev)}
                    />
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Animations</div>
                    <Toggle
                        checked={animationsOn}
                        onChange={() => setAnimationsOn(prev => !prev)}
                    />
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Filters<div className={styles.subInfo}> shadows, blur, etc...</div></div>
                    <Toggle
                        checked={shadowsOn}
                        onChange={() => setShadowsOn(prev => !prev)}
                    />
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Music <div className={styles.subInfo}> currently unsupported</div></div>
                    <Toggle checked={false} onChange={() => {}} disabled/>
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Dark Mode <div className={styles.subInfo}> currently unsupported</div></div>
                    <Toggle checked={false} onChange={() => {}} disabled/>
                </div>
            </div>
        </>
    )
}