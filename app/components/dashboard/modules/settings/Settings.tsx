import styles from "./Settings.module.css"
import Toggle from "./toggle/Toggle"

export default function Settings() {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.heading}`}>
                    Settings
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Music</div>
                    <Toggle/>
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Sound</div>
                    <Toggle/>
                </div>
                <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Animations</div>
                    <Toggle/>
                </div>
                 <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Shadows</div>
                    <Toggle/>
                </div>
                 <div className={`${styles.setting}`}>
                    <div className={`${styles.settingName}`}>Dark Mode</div>
                    <Toggle/>
                </div>
            </div>
        </>
    )
}