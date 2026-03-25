import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import ImageUpload from "./imageUpload/ImageUpload";
import { addArtworkToS3, createArtwork, updateArtwork } from "@/app/services/artworkService";
import { playLoopSoundAt, playSound, playSoundAt, stopSound } from "@/app/lib/SoundManager";
import Sidebar from "./sidebar/Sidebar";

type Props = {
    section: string
    switchSection: (section: string) => void;
}
export default function NewEntry({ section, switchSection }: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const tagList = ["landscape", "potriate"];
    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [images, setImages] = useState<File[]>();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [tool, setTool] = useState("");
    const [toolError, setToolError] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleInputValidation = (name: string, value: string) => {

        if (name === "title") {
            setTitle(value);
            if (value.length < 1) {
                setTitleError("title must be added - limited to 30 characters");
            } else if (value.length > 30) {
                setTitleError("title must be below 30 characters");
            } else {
                setTitleError("");
            }
        }
        if (name === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError("a description must be added - limited to 700 characters");
            } else if (value.length > 700) {
                setDescriptionError("description must be below 700 characters");
            } else {
                setDescriptionError("");
            }
        }
        if (name === "tool") {
            setTool(value);
            if (value.length < 1) {
                setToolError("the tool used must be added");
            } else if (value.length > 15) {
                setToolError("tool must be below 15 characters");
            } else {
                setToolError("");
            }
        }
    };
    const handleCreate = async () => {

        if (!images || images.length === 0) return;
        if (title === "" || description == "" || tool === "") return

        try {
            setLoading("true");

            const newArtwork = {
                title: title,
                description: description,
                image_urls: [] as string[],
                tag_names: tags,
                book_page: false,
                page_number: 0
            };
            const saved = await createArtwork(newArtwork);
            console.log("Create: ", saved);

            const savedImages = await addArtworkToS3(saved.id, images);
            console.log("Added: ", savedImages)

            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { setLoading("false") }, 4000);

        } catch (error) {
            console.error(error);
            playSound("error");
            return
        }

    }

    return (
        <div className={`${styles.container} ${section !== "new" ? styles.condenseContainer : ""} ${fadeOut ? styles.fadeOut : ""}`}>
            <Sidebar heading={"add artwork"} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <ImageUpload onChange={setImages} />
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   add at least 1 artwork</div>
                <input id="title" className={`${styles.input}`} value={title} onChange={(e) => handleInputValidation("title", e.target.value)} placeholder="required - title" />
                <div className={`${titleError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {titleError}</div>
                <textarea className={`${styles.input} ${styles.textArea}`} value={description} onChange={(e) => handleInputValidation("description", e.target.value)} placeholder="required - description" />
                <div className={` ${descriptionError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {descriptionError}</div>
                <input className={`${styles.input}`} value={tool} onChange={(e) => handleInputValidation("tool", e.target.value)} placeholder="required - tool used" />
                <div className={` ${toolError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {toolError}</div>
                <DropDownList values={tagList} onChange={setTags} />

            </div>
        </div>
    )
}