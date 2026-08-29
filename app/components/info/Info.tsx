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
                        onMouseEnter={() => playSound("hover")}
                        onClick={(e) => { e.stopPropagation(); setInfoExpand(false); playSound("blob") }}
                        className={`${styles.close}`}>✕</div>
                    <div className={`${styles.heading}`}>
                        Portfolio information
                    </div>
                    <div className={`${styles.mobileNotesContainer}`}>

                        <div className={`${styles.mobileNotes}`}>
                            <strong>Recommended: </strong>for the best experience, view on desktop. If on iPhone, I'd recommend adding site to home page
                            to get a better more app like experience, as when coding for mobile devices, I had better configured
                            the site for a full screen app-like experience

                            <div className={`${styles.guideDivider}`} />
                            <div className={`${styles.addGuide}`}>
                                on<strong>Safari </strong>: click the
                                <img className={styles.guideIcon} src={"images/toolIcons/share-symbol.svg"} /> icon, then
                                <img className={styles.guideIcon} src={"images/toolIcons/down-symbol.png"} /> <strong>view more </strong>then click the
                                <img className={`${styles.guideIcon} p-[2px]`} src={"images/toolIcons/add-home-symbol.png"} /><strong>add to home screen</strong>, then
                                <img className={styles.addIcon} src={"images/toolIcons/add-symbol.png"} /> then go to home screen to open the web-app
                            </div>
                        </div>
                        <div className={`${styles.divider}`} />
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
                        navigation guide
                    </div>
                    <div className={styles.navInfoContainer}>
                        <div className={styles.navInfo}><img className={styles.navIcon} src={"images/nav/digital-art-b.svg"} /> <strong>Artworks:</strong> to view all my artworks i had done</div>
                        <div className={`${styles.guideDivider}`} />
                        <div className={styles.navInfo}><img className={styles.navIcon} src={"images/nav/sketchbooks.svg"} /> <strong>Sketchbook:</strong> a view of my actual sketchbooks which ive drawn and practices sketches in, recreated digitally</div>
                        <div className={`${styles.guideDivider}`} />

                        <div className={styles.navInfo}><img className={styles.navIcon} src={"images/nav/skills.svg"} /> <strong>Skills:</strong> a list of all the things I've learnt over the years from a software engineering perpective </div>
                        <div className={`${styles.guideDivider}`} />

                        <div className={styles.navInfo}><img className={styles.navIcon} src={"images/nav/qualification.svg"} /><strong>Qualification:</strong> shows my qualificaiton I've earned during my studies </div>
                        <div className={`${styles.guideDivider}`} />

                        <div className={styles.navInfo}><img className={styles.navIcon} src={"images/nav/experience.svg"} /><strong>Experience:</strong>to view the jobs ive worked and the thing I had to do in them</div>



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