"use client"
import { useState } from "react"
import styles from "./Info.module.css"
import { playSound } from "@/app/lib/SoundManager";
import Settings from "../dashboard/modules/settings/Settings";
import CardSettings from "../dashboard/modules/settings/CardSettings";



export default function Info() {

    const [infoExpand, setInfoExpand] = useState(false);

    const handleExpand = () => {
        if (infoExpand === false) {
            setInfoExpand(true);
            playSound("blob");
        }
    }
    return (
        <>
            <div
                onClick={() => handleExpand()}
                onMouseEnter={() => playSound("hover")}
                className={`${styles.info} ${infoExpand ? styles.infoExpand : styles.infoDepand}`}>

                <img
                    className={`${styles.infoIcon} ${infoExpand ? styles.scale : ""}`}
                    src={"images/sketchbook/info-static.png"} />
                <div className={`${infoExpand ? styles.containerExpand : styles.container}`}>
                    <div
                        onMouseEnter={()=> playSound("hover")}
                        onClick={(e) => { e.stopPropagation(); setInfoExpand(false); playSound("blob")}}
                        className={`${styles.close}`}>✕</div>
                    <div className={`${styles.heading}`}>
                        Portfolio information
                    </div>

                    <div className={`${styles.subHeading}`}>
                        build notes
                    </div>
                    <div className={`flex`}>
                        <a
                            href="https://www.figma.com/board/vCQ7a9sIfJ4GdHhLzlrZ7M/Welcome-to-FigJam?node-id=0-1&t=YU9zhvczGwg3jKfl-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => playSound("whosh")}
                            className={`${styles.card} ${styles.linkCard} ${styles.noMarginLeft}`}>design
                            <img className={styles.linkIcon} src={"images/toolIcons/figma.png"} />
                        </a>

                        <div className={`${styles.arrow}`}>→ </div>
                        <a
                            href="https://github.com/hanifa1i/portfolio-frontend"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => playSound("whosh")}
                            className={`${styles.card} ${styles.linkCard} ${styles.noMarginLeft}`}>frontend
                            <img className={styles.linkIcon} src={"images/socialIcons/github.png"} />
                        </a>
                        <div className={`${styles.arrow}`}>→ </div>
                        <a
                            href="https://github.com/hanifa1i/portfolio-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => playSound("hover")}
                            onClick={() => playSound("whosh")}
                            className={`${styles.card} ${styles.linkCard} ${styles.noMarginLeft}`}>backend
                            <img className={styles.linkIcon} src={"images/socialIcons/github.png"} />
                        </a>

                    </div>
                    <div className={`${styles.divider}`} />
                    <div className={`${styles.subHeading}`}>
                        settings
                    </div>
                    <CardSettings />
                    <div className={`${styles.divider}`} />

                    <div className={`${styles.subHeading}`}>
                        upcoming updates
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>toggle to turn off intro</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>ambiant music to be added</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>adding blog section to portfolio</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>animation section to be added</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>dark mode to be added</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>mobile support</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>add each page desing process in this side bar</div>
                    </div>
                    <div className="flex">
                        <div className={`${styles.arrow}`}>↳</div>
                        <div className={`${styles.card}`}>better support for safari browser</div>
                    </div>

                    <div className={`${styles.divider}`} />

                    <div className={`${styles.subHeading}`}>
                        page design process `coming soon`
                    </div>
                    <div className="h-[50px]"></div>
                </div>


            </div>
        </>
    )
}