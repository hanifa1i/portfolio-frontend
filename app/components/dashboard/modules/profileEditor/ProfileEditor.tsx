import styles from "./ProfileEditor.module.css"

export default function ProfileEditor() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.profileContainer}`}>
                <div className={`${styles.heading}`}>
                    Update Profile
                </div>
                <div className={`${styles.profileImages}`}>
                    <div className={`${styles.profileImage}`}></div>
                    <div className={`${styles.profileImage}`}></div>
                </div>

                <div className={`${styles.profileImages}`}>
                    <div className={`${styles.updateInfo}`}>Display Name</div>
                    <div className={`${styles.updateInfo}`}>Home Descriptions</div>
                    <div className={`${styles.updateInfo}`}>Password</div>
                    <div className={`${styles.updateInfo}`}>Username</div>
                    <div className={`${styles.updateInfo}`}>LinkedIn</div>
                    <div className={`${styles.updateInfo}`}>Discord</div>
                    <div className={`${styles.updateInfo}`}>Outlook</div>

                    <div className={`${styles.updateInfo}`}>GitHub</div>
                    <div className={`${styles.updateInfo}`}>Instagram</div>


                </div>

            </div>
            <div className={`${styles.healthContainer}`}>
                <div className={`${styles.heading}`}>
                    Health Check
                </div>
                <div className={`${styles.healthFlexer}`}>
                    <div className={`${styles.health}`}>
                        <div className={`${styles.tick}`}>✓</div>
                        <div className={`${styles.service}`}>API</div>
                    </div>
                    <div className={`${styles.health}`}>
                        <div className={`${styles.tick}`}>✓</div>
                        <div className={`${styles.service}`}>Postgres</div>
                    </div>
                    <div className={`${styles.health}`}>
                        <div className={`${styles.tick}`}>✓</div>
                        <div className={`${styles.service}`}>AWS S3</div>
                    </div>
                    <div className={`${styles.health}`}>
                        <div className={`${styles.tick}`}>✓</div>
                        <div className={`${styles.service}`}>Disc</div>
                    </div>

                </div>

            </div>
        </div>
    )
}