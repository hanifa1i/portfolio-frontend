import { Skill } from "@/app/types/dashboard"
import style from "./EditCard.module.css"

type Props = {
    skill: Skill
    onClose: () => void;
}
export default function EditSkillCard({ skill, onClose }: Props) {
    return (
        <>
            <div className={`${style.container}`}>
                <div className={`${style.heading}`}>skill <div className={`${style.id}`} />{skill.id}</div>
                <input className={`${style.input}`} defaultValue={skill.skillName} />
                <input className={`${style.input}`} defaultValue={skill.category} />
                <textarea className={`${style.input} ${style.textArea}`} defaultValue={skill.description} />
                <input className={`${style.input}`} defaultValue={skill.whereLearnt} />
                <input className={`${style.input}`} defaultValue={skill.exampleUrls} />
                <input className={`${style.input}`} defaultValue={skill.imageExampleUrls} />


                <div className={`${style.buttonContainer}`}>
                    <button className={`${style.button} ${style.deleteButton}`}><img className={`${style.buttonIcon}`} src="/images/dashboard/trash-bin.png" /></button>
                    <button className={`${style.button} ${style.saveButton}`}><img className={`${style.buttonIcon}`} src="/images/dashboard/save.png" /></button>
                </div>
            </div>
        </>
    )
}