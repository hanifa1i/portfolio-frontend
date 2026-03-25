import { playSound } from "@/app/lib/SoundManager"
import styles from "./workProjects.module.css"
import type { Project } from "@/app/types/Experience";


type Props = {
    projects : Project[];
}

export default function workProjects( {projects} : Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                {projects.map((project, key) => (
                    <div key={key} onMouseEnter={() => playSound("whosh")} className={`${styles.project}`}>
                        <div className={`${styles.projectHeading}`}>{project.title}</div>
                        <div className={`${styles.projectDescription} `}>{project.description}</div>
                    </div>
                ))}
            </div>
        </>
    )
}