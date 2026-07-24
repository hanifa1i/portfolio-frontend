import { useState, useEffect } from "react";
import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import DropDownList from "./dropDownList/DropDownList";
import Sidebar from "./sidebar/Sidebar";
import ImageUpload from "./imageUpload/ImageUpload";
import Date from "./date/Date";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { addCertificateToS3, createQualification, deleteCertificateImage, getQualificationsById, updateCertificateImages, updateQualification } from "@/app/services/QualificationService";
import Input, { InputLarge } from "./input/Input";
import { QualificationValidation } from "@/app/data/validation/inputValidation";
import FormSubmit from "./formSubmit/FormSubmit";
import { ImageResponse, QualificationResponse } from "@/app/types/Dashboard";
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

    const [level, setLevel] = useState("");
    const [levelError, setLevelError] = useState(QualificationValidation.levelBlank);
    const [subject, setSubject] = useState("");
    const [subjectError, setSubjectError] = useState(QualificationValidation.subjectBlank);
    const [institution, setInstitution] = useState("");
    const [institutionError, setInstitutionError] = useState(QualificationValidation.institutionBlank);
    const [grade, setGrade] = useState("");
    const [gradeError, setGradeError] = useState(QualificationValidation.gradeBlank);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(QualificationValidation.descriptionBlank);

    const [cStartDate, setCStartDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [cEndDate, setCEndDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [preSetImages, setPreSetImages] = useState<ImageResponse[]>([]);
    const [removeImages, setRemovedImages] = useState<number[]>([]);

    const transferInfo = async (id: number) => {
        const existingQualification: QualificationResponse = await getQualificationsById(id);
        setLevel(existingQualification.level);
        setSubject(existingQualification.qualification);
        setInstitution(existingQualification.institution);
        setGrade(existingQualification.grade);
        setDescription(existingQualification.description);
        setStartDate(existingQualification.start_date);
        setCStartDate(existingQualification.start_date);
        setEndDate(existingQualification.end_date);
        setCEndDate(existingQualification.end_date);

        setPreSetImages(existingQualification.certificates);
        setLevelError(""); setSubjectError(""); setInstitutionError(""); setGradeError(""); setDescriptionError("");
    }
    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun === true && existingId !== 0) {
        transferInfo(existingId);
        setOneTimeRun(false);
    }

    const handleInputValidation = (input: string, value: string) => {

        if (input === "level") {
            setLevel(value);
            if (value.length < 1) {
                setLevelError(QualificationValidation.levelBlank);
            } else if (value.length > 50) {
                setLevelError(QualificationValidation.levelMaxLimit);
            } else {
                setLevelError("");
            }
        }
        if (input === "subject") {
            setSubject(value);
            if (value.length < 1) {
                setSubjectError(QualificationValidation.subjectBlank);
            } else if (value.length > 50) {
                setSubjectError(QualificationValidation.subjectMaxLimit);
            } else {
                setSubjectError("");
            }
        }
        if (input === "institution") {
            setInstitution(value);
            if (value.length < 1) {
                setInstitutionError(QualificationValidation.institutionBlank);
            } else if (value.length > 50) {
                setInstitutionError(QualificationValidation.institutionMaxLimit);
            } else {
                setInstitutionError("");
            }
        }
        if (input === "grade") {
            setGrade(value);
            if (value.length < 1) {
                setGradeError(QualificationValidation.gradeBlank);
            } else if (value.length > 30) {
                setGradeError(QualificationValidation.gradeMaxLimit);
            } else {
                setGradeError("");
            }
        }
        if (input === "description") {
            setDescription(value);
            if (value.length < 1) {
                setDescriptionError(QualificationValidation.descriptionBlank);
            } else if (value.length > 700) {
                setDescriptionError(QualificationValidation.descriptionMaxLimit);
            } else {
                setDescriptionError("");
            }
        }

    }
    const handleCreate = async () => {

        if (preSetImages.length === 0 && (!images || images.length === 0)) {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

        if (level == "" || subject == "" || institution == "" || grade == "" || startDate == "" || endDate == "" || description == "") {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }

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
            };
            if (existingId !== 0) {
                if (removeImages.length > 0) {
                    await Promise.all(
                        removeImages.map(imageId =>
                            deleteCertificateImage(existingId, imageId)
                        )
                    )
                }

                const recallQualification: QualificationResponse = await getQualificationsById(existingId);
                const remainingImages: ImageResponse[] = recallQualification.certificates;
                const urls: string[] = remainingImages.map(img => img.image_url);
                const currentImages = { images: urls }

                console.log("TESTING", newQualification)
                const updated = await updateQualification(existingId, newQualification);
                console.log("Updated: ", updated);

                const reAddImages = await updateCertificateImages(updated.id, currentImages)
                console.log("Re-added Certificate: ", reAddImages);

                const newImages = await addCertificateToS3(updated.id, images);
                console.log("New Added Certificate: ", newImages)
            }
            else {

                const saved = await createQualification(newQualification);
                console.log("Created: ", saved);

                const savedImages = await addCertificateToS3(saved.id, images);
                console.log("Added: ", savedImages)
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
        setOneTimeRun(true);
        setNewEntry("");
    }

    return (
        <div className={`${styles.container} ${section !== "new" ? styles.condenseContainer : ""} ${fadeOut ? styles.fadeOut : ""} ${loading === "error" ? styles.shake : ""}`}>
            <Sidebar heading={existingId === 0 ? "add qualification " : `edit qualification ${existingId}`} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} handleBackButton={reset} />


            <div className={`${styles.formContainer} offscreenRight`}>

                <Input inputType="level" value={level} required validationMessage={levelError} handleValidation={handleInputValidation} />
                <Input inputType="subject" value={subject} required validationMessage={subjectError} handleValidation={handleInputValidation} />
                <Input inputType="institution" value={institution} required validationMessage={institutionError} handleValidation={handleInputValidation} />
                <Input inputType="grade" value={grade} required validationMessage={gradeError} handleValidation={handleInputValidation} />
                <Date heading={'←   start date'} preSetDate={cStartDate} setDate={setStartDate} />
                <Date heading={'←   end date'} preSetDate={cEndDate} setDate={setEndDate} />
                <InputLarge inputType="description" value={description} required validationMessage={descriptionError} handleValidation={handleInputValidation} />
                <ImageDisplay images={preSetImages} setRemovedImages={setRemovedImages} />
                <ImageUpload onChange={setImages} />
                <div className={`${images?.length !== 0 ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>{QualificationValidation.noDocument}</div>
            </div>
            <FormSubmit submitType={loading} />
        </div>
    )
}