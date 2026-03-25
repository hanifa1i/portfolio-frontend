import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import Date from "./date/Date";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { addCertificateToS3, createQualification } from "@/app/services/QualificationService";

type Props = {
    section: string
    switchSection: (section: string) => void;
}
export default function NewEntry({ section, switchSection }: Props) {

    useScrollReveal(".offscreenRight", "easeIn", false);

    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [level, setLevel] = useState("");
    const [levelError, setLevelError] = useState("");
    const [subject, setSubject] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [institution, setInstitution] = useState("");
    const [institutionError, setInstitutionError] = useState("");
    const [grade, setGrade] = useState("");
    const [gradeError, setGradeError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [images, setImages] = useState<File[]>([]);



    const handleInputValidation = (input: string, value: string) => {

        if (input === "level") {
            setLevel(value);
            if (value.length < 1) {
                setLevelError("level must be added - limited to 50 characters");
            } else if (value.length > 50) {
                setLevelError("level must be below 50 characters");
            } else {
                setLevelError("");
            }
        }
        if (input === "subject") {
            setSubject(value);
            if (value.length < 1) {
                setSubjectError("subject must be added - limited to 50 characters");
            } else if (value.length > 50) {
                setSubjectError("title must be below 50 characters");
            } else {
                setSubjectError("");
            }
        }
        if (input === "institution") {
            setInstitution(value);
            if (value.length < 1) {
                setInstitutionError("institution must be added - limited to 50 characters");
            } else if (value.length > 50) {
                setInstitutionError("institution must be below 50 characters");
            } else {
                setInstitutionError("");
            }
        }
        if (input === "grade") {
            setGrade(value);
            if (value.length < 1) {
                setGradeError("grade must be added - limited to 30 characters");
            } else if (value.length > 30) {
                setGradeError("grade must be below 30 characters");
            } else {
                setGradeError("");
            }
        }
        if (input === "description") {
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

        if (level == "" || subject == "" || institution == "" || grade == "" || startDate == "" || endDate == "" || description == "") return;
        if (!images || images.length === 0) return;
        

        try {
            setLoading("true");

            const newQualification = {
                qualification: subject,
                institution: institution,
                level: level,
                grade: grade,
                start_date: startDate,
                end_date: endDate,
                description: description
            }

            const saved = await createQualification(newQualification);
            console.log("Created: ", saved);

            const savedImages = await addCertificateToS3(saved.id, images);
            console.log("Added: ", savedImages)

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
            <Sidebar heading={"add qualification"} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} />


            <div className={`${styles.formContainer} offscreenRight`}>
                <input className={`${styles.input}`} placeholder="required - level" onChange={(e) => handleInputValidation("level", e.target.value)} />
                <div className={`${levelError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {levelError}</div>

                <input className={`${styles.input}`} placeholder="required - subject" onChange={(e) => handleInputValidation("subject", e.target.value)} />
                <div className={`${subjectError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {subjectError}</div>

                <input className={`${styles.input}`} placeholder="required - institution" onChange={(e) => handleInputValidation("institution", e.target.value)} />
                <div className={`${institutionError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {institutionError}</div>

                <input className={`${styles.input}`} placeholder="required - grade" onChange={(e) => handleInputValidation("grade", e.target.value)} />
                <div className={`${gradeError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {gradeError}</div>

                <Date heading={'←   start date'} setDate={setStartDate} />
                <Date heading={'←   end date'} setDate={setEndDate} />

                <textarea className={`${styles.input} ${styles.textArea}`} placeholder="description" onChange={(e) => handleInputValidation("description", e.target.value)} />
                <div className={`${descriptionError === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   {descriptionError}</div>

                <ImageUpload onChange={setImages} />
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>ⓘ   add at least 1 document showing qualification</div>
            </div>
        </div>
    )
}