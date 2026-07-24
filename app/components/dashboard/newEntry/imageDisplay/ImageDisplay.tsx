import { useEffect, useState } from "react"
import styles from "./ImageDisplay.module.css"
import { playSound } from "@/app/lib/SoundManager";
import { ArtworkImageResponse, ExampleResponse } from "@/app/types/Dashboard";

type Props = {
    images: ArtworkImageResponse[]
    setRemovedImages: (removeImages: number[]) => void;
}
export default function ImageDisplay({ images, setRemovedImages }: Props) {

    const [removeImages, setRemoveImages] = useState<number[]>([]);
    
    const handleRemove = (id: number) => {
        if (!removeImages.includes(id)) {
            setRemoveImages(prev => [...prev, id])
        }
        if (removeImages.includes(id)) {
            setRemoveImages(prev => prev.filter(i => i !== id))
        }
    }

    useEffect (() => {
        setRemovedImages(removeImages);
        console.log(`images id: ${removeImages}`)

    }, [removeImages])

    return (
        <>
            <div className={styles.imageContainer}>
                {
                    images.map((item, key) => (
                        <div key={key}>
                            <img src={item.image_url} className={`${styles.image} ${removeImages.includes(item.id) ? styles.fadeOut : ""}`} />
                            <div onClick={() => {handleRemove(item.id), playSound("click")}} className={`${styles.x}`}>
                                {removeImages.includes(item.id) ? "+" : "-"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}