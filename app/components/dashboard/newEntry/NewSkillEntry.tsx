import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import AddLinks from "./addLinks/AddLinks";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { addExamplesToS3, createSkill } from "@/app/services/SkillService";
import { skillTypeLabels, skillTypeList, experiencedLabels, experienceList } from "@/app/data/skills/enums"

type Props = {
    section: string
    switchSection: (section: string) => void;
}
export default function NewEntry({ section, switchSection }: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [skill, setSkill] = useState("");
    const [skillError, setSkillError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [skillType, setSkillType] = useState<string[]>([]);
    const [skillTypeError, setSkillTypeError] = useState("");
    const [skillTypeEnum, setSkillTypeEnum] = useState<string>("");
    const [experience, setExperience] = useState<string[]>([]);
    const [experienceError, setExperienceError] = useState("");
    const [linkNames, setLinkNames] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const handleInputValidation = (name: string, value: string) => {
        if (name === "skill") {
            setSkill(value);
            if (value.length < 1) {
                setSkillError("skill must be added - limited to 30 characters");
            } else if (value.length > 30) {
                setSkillError("title must be below 30 characters");
            } else {
                setSkillError("");
            }
        }
        if (name === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError("a description must be added");
            } else {
                setDescriptionError("");
            }
        }
    }
    useEffect(() => {
        if (skillType.length !== 1) {
            setSkillTypeError("a single skill type must ber added");
        } else {
            setSkillTypeError("");
        }
        if (experience.length === 0) {
            setExperienceError("add at least one way to learnt the skill");
        } else {
            setExperienceError("");
        }

        skillTypeList.map((object, i) => {
            if (skillType[0] === object.label)
                setSkillTypeEnum(object.enum);
            return
        })

    }, [skillType, experience]);

    const handleCreate = async () => {
        if (skill === "" || description === "" || experience.length === 0 || skillType.length !== 1) return;

        try {
            setLoading("true");

            const experiencesEnum: string[] = []
            experience.map((value, i) => (
                experienceList.map((exp, key) => {
                    if (value === exp.label)
                        experiencesEnum.push(exp.enum)
                })
            ))
            const examples = linkNames.map((name, i) => ({
                type: "LINK",
                url: links[i],
                note: name
            }))

            const newSkill = {
                name: skill,
                description: description,
                skill_type: skillTypeEnum,
                experience_locations: experiencesEnum,
                examples: examples
            };

            const saved = await createSkill(newSkill);
            console.log("Create: ", saved);

            if (images.length > 0) {
                const savedImages = await addExamplesToS3(saved.id, images)
                console.log("Added ", savedImages)
            }

            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { setLoading("false") }, 4000);

        }
        catch (error) {
            console.error(error);
            playSound("error");
            return
        }
    }
    return (
        <div className={`${styles.container} ${section !== "new" ? styles.condenseContainer : ""} ${fadeOut ? styles.fadeOut : ""}`}>
            <Sidebar heading={"add skill"} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <input className={`${styles.input}`} onChange={(e) => handleInputValidation("skill", e.target.value)} placeholder="required - skill" />
                <div className={`${skillError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {skillError}</div>

                <textarea className={`${styles.input} ${styles.textArea}`} onChange={(e) => handleInputValidation("description", e.target.value)} placeholder="required - description" />
                <div className={` ${descriptionError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {descriptionError}</div>

                <DropDownList values={skillTypeLabels} onChange={setSkillType} />
                <div className={` ${skillTypeError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {skillTypeError}</div>

                <DropDownList values={experiencedLabels} onChange={setExperience} />
                <div className={` ${experienceError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {experienceError}</div>

                <AddLinks linkNames={setLinkNames} links={setLinks} />
                <ImageUpload onChange={setImages} />
            </div>
        </div>
    )
}