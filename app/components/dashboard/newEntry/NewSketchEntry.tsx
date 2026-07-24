import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import BookSelector from "./bookSelector/BookSelector";
import { addArtworkToS3, createArtwork, deleteArtworkImage, getArtworkById, updateArtwork, updateArtworkImages } from "@/app/services/artworkService";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { SketchbookValidation } from "@/app/data/validation/inputValidation";
import Input, { InputLarge } from "./input/Input";
import FormSubmit from "./formSubmit/FormSubmit";
import { ArtworkResponse, ImageResponse } from "@/app/types/Dashboard";
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

    const [existingImages, setExistingImages] = useState<ImageResponse[]>([]);
    const [removeImages, setRemovedImages] = useState<number[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [book, setBook] = useState<number>(0);
    const [pageNo, setPageNo] = useState("");
    const [pageNoError, setPageNoError] = useState(SketchbookValidation.pageNoBlank);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(SketchbookValidation.descriptionBlank);
    const [tags, setTags] = useState<string[]>([]);

    const transferInfo = async (id: number) => {
        const existingArtwork: ArtworkResponse = await getArtworkById(id);
        setExistingImages(existingArtwork.image_urls)
        const bookNumber = existingArtwork.title.split(" ")[1];
        setBook(Number(bookNumber));
        setPageNo(String(existingArtwork.page_number))
        setDescription(existingArtwork.description)
        setDescriptionError("");
    }

    const [update, setUpdate] = useState(true);
    if (update === true && existingId !== 0) {
        transferInfo(existingId);
        setUpdate(false);
    }

    const handleInputValidation = (name: string, value: string) => {
        if (name === "pageNo") {
            if (value.length < 1) {
                setPageNoError(SketchbookValidation.pageNoBlank)
            }
            else if (!/^\d+$/.test(value)) {
                setPageNoError(SketchbookValidation.pageNoInvalid)
            } else {
                setPageNo(value);
                setPageNoError("");
            }
        }
        if (name === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError(SketchbookValidation.descriptionBlank);
            } else if (value.length > 700) {
                setDescriptionError(SketchbookValidation.descriptionMaxLimit);
            } else {
                setDescriptionError("");
            }
        }
    }

    const handleCreate = async () => {
        if (existingImages.length === 0 && (!images || images.length === 0)) {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }
        if (book === 0 || description == "") {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

        try {
            setLoading("true");

            const newPage = {
                title: "Book " + book,
                description: description,
                image_urls: [] as string[],
                tag_names: tags,
                book_page: true,
                page_number: Number(pageNo),
                tool: "Handdrawn"
            }

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

                const updated = await updateArtwork(existingId, newPage);
                console.log("Updated: ", updated);

                const reAddImages = await updateArtworkImages(updated.id, currentImages)
                console.log("Re-added Images: ", reAddImages);

                const newImages = await addArtworkToS3(updated.id, images);
                console.log("New Added Images: ", newImages)
            }
            else {
                const saved = await createArtwork(newPage);
                console.log("Create: ", saved);

                const urls = await addArtworkToS3(saved.id, images);
                console.log("Added: ", urls);
            }

            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { switchSection(""); setNewEntry(""); setLoading("false"); reset(); }, 3000);

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
            <Sidebar heading={existingId === 0 ? "add sketchbook page " : `edit sketchbook page ${existingId}`} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} handleBackButton={reset} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <ImageDisplay images={existingImages} setRemovedImages={setRemovedImages} />
                <ImageUpload onChange={setImages} />
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   add a sketch</div>
                <BookSelector setBook={setBook} bookId={book} />
                <div className={`${book !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   select a book to add sketch in</div>
                <Input inputType="pageNo" value={pageNo} required={false} validationMessage={pageNoError} handleValidation={handleInputValidation} />
                <InputLarge inputType="description" value={description} required validationMessage={descriptionError} handleValidation={handleInputValidation} />

            </div>

            <FormSubmit submitType={loading} />
        </div>
    )
}