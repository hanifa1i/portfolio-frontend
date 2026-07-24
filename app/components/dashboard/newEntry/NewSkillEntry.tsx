import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import SingleItemList, { SingleItemListNoArray } from "./dropDownList/SingleItemList"
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import AddLinks from "./addLinks/AddLinks";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { addExamplesToS3, createSkill, deleteExampleImage, getSkillById, updateExampleImages, updateSkill } from "@/app/services/SkillService";
import { skillTypeLabels, skillTypeList, experiencedLabels, experienceList } from "@/app/data/skills/enums"
import { SkillValidation } from "@/app/data/validation/inputValidation";
import Input, { InputLarge } from "./input/Input";
import FormSubmit from "./formSubmit/FormSubmit";
import { ImageResponse, ExampleResponse, SkillResponse } from "@/app/types/Dashboard";
import ImageDisplay from "./imageDisplay/ImageDisplay";

type Props = {
    section: string
    switchSection: (section: string) => void;
    setNewEntry: (entry: string) => void;
    existingId: number;
    setExistingId: (id: number) => void;
}
export default function NewEntry({ section, switchSection, setNewEntry, existingId, setExistingId }: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [skill, setSkill] = useState("");
    const [skillError, setSkillError] = useState(SkillValidation.skillBlank);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(SkillValidation.descriptionBlank);
    const [skillType, setSkillType] = useState<string>("");
    const [skillTypeError, setSkillTypeError] = useState("");
    const [experience, setExperience] = useState<string[]>([]);
    const [experienceError, setExperienceError] = useState("");
    const [preSetExamples, setPreSetExamples] = useState<ExampleResponse[]>([]);
    const [preSetImages, setPreSetImages] = useState<ImageResponse[]>([]);
    const [removeImages, setRemovedImages] = useState<number[]>([]);


    const [linkNames, setLinkNames] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const transferInfo = async (id: number) => {
        const existingSkill: SkillResponse = await getSkillById(id);
        setSkill(existingSkill.name);
        setDescription(existingSkill.description);
        setSkillType(existingSkill.skill_type);
        setExperience(existingSkill.experience_locations);
        setPreSetExamples(existingSkill.examples);
        existingSkill.examples.map(example => {
            if (example.exampleType === "IMAGE") {
                const imageObject = {
                    id: example.id,
                    image_url: example.url
                }
                preSetImages.push(imageObject)
            }
        })
        setSkillError("");
        setDescriptionError("");
    }
    const [update, setUpdate] = useState(true);
    if (update === true && existingId !== 0) {
        transferInfo(existingId);
        setUpdate(false);
        console.log("mappping");
    }

    const handleInputValidation = (name: string, value: string) => {
        if (name === "skill") {
            setSkill(value);
            if (value.length < 1) {
                setSkillError(SkillValidation.skillBlank);
            } else if (value.length > 30) {
                setSkillError(SkillValidation.skillMaxLimit);
            } else {
                setSkillError("");
            }
        }
        if (name === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError(SkillValidation.descriptionBlank);
            } else {
                setDescriptionError("");
            }
        }
    }
    const handleSkillTypeValidation = (value: string) => {
        setSkillType(value);
        if (value.length < 1) {
            setSkillTypeError(SkillValidation.skillTypeBlank);
        } else {
            setSkillTypeError("");
        }

    }
    useEffect(() => {
        if (experience.length === 0) {
            setExperienceError("add at least one way to learnt the skill");
        } else {
            setExperienceError("");
        }
    }, [skillType, experience]);

    const handleCreate = async () => {
        if (skill === "" || description === "" || experience.length === 0 || skillType === "") {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

        try {
            setLoading("true");

            const selectedSkillType = skillTypeList.find(
                (object) => skillType === object.label
            )?.enum || "";

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
            const filteredExamples = examples.filter(
                example => !(example.note === "" && example.url === "")
            );

            const newSkill = {
                name: skill,
                description: description,
                skill_type: selectedSkillType,
                experience_locations: experiencesEnum,
                examples: filteredExamples
            };


            if (existingId !== 0) {
                if (removeImages.length > 0) {
                    await Promise.all(
                        removeImages.map(imageId =>
                            deleteExampleImage(existingId, imageId)
                        )
                    )
                }
                const recallSkill: SkillResponse = await getSkillById(existingId);
                const urls: string[] = [];
                recallSkill.examples.map(example => {
                    if (example.exampleType === "IMAGE") {
                        urls.push(example.url)
                    }
                })
                const currentImages = { images: urls }
                console.log("newSKILLLL", newSkill)
                const updated = await updateSkill(existingId, newSkill);
                console.log("Updated: ", updated);

                const reAddImages = await updateExampleImages(updated.id, currentImages)
                console.log("Re-added Example Images: ", reAddImages);

                const newImages = await addExamplesToS3(updated.id, images);
                console.log("New Added Example Images: ", newImages)

            }
            else {
                const saved = await createSkill(newSkill);
                console.log("Create: ", saved);

                if (images.length > 0) {
                    const savedImages = await addExamplesToS3(saved.id, images)
                    console.log("Added ", savedImages)
                }
            }

            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { switchSection(""); setNewEntry(""); setLoading("false"); reset(); }, 3000);

        }
        catch (error) {
            console.error(error);
            playSound("error");
            return
        }
    }

    const reset = () => {
        setExistingId(0);
        setUpdate(true);
        setNewEntry("");
    }
    return (
        <div className={`${styles.container} ${section !== "new" ? styles.condenseContainer : ""} ${fadeOut ? styles.fadeOut : ""} ${loading === "error" ? styles.shake : ""}`}>
            <Sidebar heading={existingId === 0 ? "add skill " : `edit skill ${existingId}`} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} handleBackButton={reset} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <Input inputType="skill" value={skill} required validationMessage={skillError} handleValidation={handleInputValidation} />
                <InputLarge inputType="description" value={description} required validationMessage={descriptionError} handleValidation={handleInputValidation} />
                <SingleItemListNoArray heading="skill type" validationMessage={SkillValidation.skillTypeBlank} values={skillTypeLabels} selectedValue={setSkillType} method={handleSkillTypeValidation} required preSetValue={skillType} />
                <DropDownList heading="how learnt" validationMessage={SkillValidation.experienceBlank} values={experiencedLabels} onChange={setExperience} required preSetValues={experience} />
                <AddLinks linkNames={setLinkNames} links={setLinks} preSetLinks={preSetExamples} />
                <ImageDisplay images={preSetImages} setRemovedImages={setRemovedImages} />
                <ImageUpload onChange={setImages} />
            </div>

            <FormSubmit submitType={loading} />
        </div>
    )
}