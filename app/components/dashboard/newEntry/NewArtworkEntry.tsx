import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import ImageUpload from "./imageUpload/ImageUpload";
import { addArtworkToS3, createArtwork, deleteArtworkImage, getArtworkById, getTags, updateArtwork, updateArtworkImages } from "@/app/services/artworkService";
import { playLoopSoundAt, playSound, playSoundAt, stopSound } from "@/app/lib/SoundManager";
import Sidebar from "./sidebar/Sidebar";
import Input, { InputLarge } from "./input/Input";
import { ArtworkValidation } from "@/app/data/validation/inputValidation";
import FormSubmit from "./formSubmit/FormSubmit";
import { ImageResponse, ArtworkResponse } from "@/app/types/Dashboard";
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

    const [tagList, setTagList] = useState<string[]>([]);
    
    
    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [existingImages, setExistingImages] = useState<ImageResponse[]>([]);
    const [removeImages, setRemovedImages] = useState<number[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(ArtworkValidation.titleBlank);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(ArtworkValidation.descriptionBlank);
    const [tool, setTool] = useState("");
    const [toolError, setToolError] = useState(ArtworkValidation.toolBlank);
    const [tags, setTags] = useState<string[]>([]);

    const transferInfo = async (id: number) => {
        const existingArtwork: ArtworkResponse = await getArtworkById(id);
        setExistingImages(existingArtwork.image_urls)
        setTitle(existingArtwork.title)
        setDescription(existingArtwork.description)
        setTool(existingArtwork.tool)
        setTags(existingArtwork.tag_names)
        setTitleError(""); setDescriptionError(""); setToolError("");
    }

    const callTags = async () => {
        const tags = await getTags();
        const tagNames = tags.map(tag => tag.name);
        console.log(tagNames);
        setTagList(tagNames);
    }

    const [update, setUpdate] = useState(true);
    if (update === true && existingId !== 0) {
        transferInfo(existingId);
        setUpdate(false);
    }

    if (update === true) {
        callTags();
        setUpdate(false);
    }
    const handleInputValidation = (name: string, value: string) => {

        if (name === "title") {
            setTitle(value);
            if (value.length < 1) {
                setTitleError(ArtworkValidation.titleBlank);
            } else if (value.length > 30) {
                setTitleError(ArtworkValidation.titleMaxLimit);
            } else {
                setTitleError("");
            }
        }
        if (name === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError(ArtworkValidation.descriptionBlank);
            } else if (value.length > 700) {
                setDescriptionError(ArtworkValidation.descriptionMaxLimit);
            } else {
                setDescriptionError("");
            }
        }
        if (name === "tool") {
            setTool(value);
            if (value.length < 1) {
                setToolError(ArtworkValidation.toolBlank);
            } else if (value.length > 15) {
                setToolError(ArtworkValidation.toolMaxLimit);
            } else {
                setToolError("");
            }
        }
    };
    const handleCreate = async () => {

        if (existingImages.length === 0 && (!images || images.length === 0)) {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

        if (title === "" || description == "" || tool === "") {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

        try {
            setLoading("true");


            const newArtwork = {
                title: title,
                description: description,
                image_urls: [] as string[],
                tag_names: tags,
                book_page: false,
                page_number: 0,
                tool: tool
            };


            if (existingId !== 0) {
                if (removeImages.length > 0) {
                    await Promise.all(
                        removeImages.map(imageId => 
                            deleteArtworkImage(existingId, imageId)
                        )
                    )
                }

                const recallArtwork: ArtworkResponse = await getArtworkById(existingId);
                const remainingImages: ImageResponse[] = recallArtwork.image_urls;
                const urls: string[] = remainingImages.map(img => img.image_url);
                const currentImages = { images: urls }

                const updated = await updateArtwork(existingId, newArtwork);
                console.log("Updated: ", updated);

                const reAddImages = await updateArtworkImages(updated.id, currentImages)
                console.log("Re-added Images: ", reAddImages);

                const newImages = await addArtworkToS3(updated.id, images);
                console.log("New Added Images: ", newImages)
            }
            else {
                const saved = await createArtwork(newArtwork);
                console.log("Create: ", saved);

                const savedImages = await addArtworkToS3(saved.id, images);
                console.log("Added: ", savedImages)
            }


            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { switchSection(""); setNewEntry(""); setLoading("false"); reset();}, 3000);

        } catch (error) {
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
            <Sidebar heading={existingId === 0 ? "add artwork " : `edit artwork ${existingId}`} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} handleBackButton={reset} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <ImageDisplay images={existingImages} setRemovedImages={setRemovedImages} />
                <ImageUpload onChange={setImages} />
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   add at least 1 artwork</div>
                <Input inputType="title" value={title} required validationMessage={titleError} handleValidation={handleInputValidation} />
                <InputLarge inputType="description" value={description} required validationMessage={descriptionError} handleValidation={handleInputValidation} />
                <Input inputType="tool" value={tool} required validationMessage={toolError} handleValidation={handleInputValidation} />
                <DropDownList heading="tags" validationMessage={ArtworkValidation.tagBlank} values={tagList} onChange={setTags} required preSetValues={tags}/>

            </div>

            <FormSubmit submitType={loading} />
        </div>
    )
}