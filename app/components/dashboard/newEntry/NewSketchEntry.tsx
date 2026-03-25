import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import BookSelector from "./bookSelector/BookSelector";
import { addArtworkToS3, createArtwork } from "@/app/services/artworkService";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";

type Props = {
    section: string
    switchSection: (section: string) => void;
}
export default function NewEntry({ section, switchSection }: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [images, setImages] = useState<File[]>([]);
    const [book, setBook] = useState<number>(0);
    const [pageNo, setPageNo] = useState("");
    const [pageNoError, setPageNoError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [tags, setTags] = useState<string[]>([]);


    const handleInputValidation = (name: string, value: string) => {
        if (name === "pageNo") {
            
            if (!/^\d+$/.test(value)){
                setPageNoError("input must be a number")
            } else {
                setPageNo(value);
                setPageNoError("");
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
    }

    const handleCreate = async () => {
        if (!images || images.length === 0) return;
        if (book === 0 || description == "") return;

        try {
            setLoading("true");

            const newPage = {
                title: "Book " + book,
                description: description,
                image_urls: [] as string[],
                tag_names: tags,
                book_page: true,
                page_number: Number(pageNo)
            }
            const saved = await createArtwork(newPage);
            console.log("Create: ", saved );

            const urls = await addArtworkToS3(saved.id, images);
            console.log("Added: ", urls);

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
            <Sidebar heading={"add sketchbook page"} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading}/>

            <div className={`${styles.formContainer} offscreenRight`}>
                <ImageUpload onChange={setImages}/>
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   add a sketch</div>
                <BookSelector setBook={setBook} bookId={book}/>
                <div className={`${book !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   select a book to add sketch in</div>
                <input className={`${styles.input}`} onChange={(e) => handleInputValidation("pageNo", e.target.value)} placeholder="optional - page number" />
                <div className={`${pageNoError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {pageNoError}</div>
                <textarea className={`${styles.input} ${styles.textArea}`} value={description} onChange={(e) => handleInputValidation("description", e.target.value)} placeholder="required - description" />
                <div className={` ${descriptionError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {descriptionError}</div>            </div>
        </div>
    )
}