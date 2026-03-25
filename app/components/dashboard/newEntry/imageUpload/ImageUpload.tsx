import { useState, useEffect } from "react";
import styles from "./ImageUpload.module.css"

type Props = {
    onChange: (imageFiles: File[]) => void
}

export default function ImageUpload({onChange}: Props) {

    const [images, setImages] = useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string[]>([]);
    
    const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        setImages((prev) => [...prev, ...files]);
    };
    
    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrl((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (!images.length) return;

        const urls = images.map((image) => URL.createObjectURL(image));
        setPreviewUrl(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    useEffect(() => { onChange(images) }, [images])


    return (
        <>
            <div className="transition flex gap-3">
                {previewUrl.length >= 0 && (previewUrl.map((url, key) => (
                    <div key={key} className={`${styles.input} ${styles.upload}`}>
                        <img className={`${styles.uploadImage}`} src={url} />
                        <button className={`${styles.removeImage}`} onClick={() => removeImage(key)}>✕</button>
                        <div className={`${styles.mainImage}`}></div>
                    </div>
                )))}
                <label htmlFor="imageUpload" className={`${styles.input} ${styles.upload}`}>+</label>
            </div>
            <input id="imageUpload" type="file" hidden accept="image/*" multiple onChange={addImage} />
        </>
    )
}