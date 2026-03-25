import { Artwork } from "@/app/types/dashboard"
import style from "./EditCard.module.css"

type Props = {
    artwork: Artwork
    onClose: () => void;
}
export default function EditSketchbookCard({ artwork, onClose }: Props) {
    return (
        <>
            <div className={`${style.container}`}>
                <div className={`${style.heading}`}>artwork <div className={`${style.id}`} />{artwork.id}</div>
                <input className={`${style.input}`} defaultValue={artwork.mainImageUrl} />
                <textarea className={`${style.input} ${style.textArea}`} defaultValue={artwork.description} />
                <input className={`${style.input}`} defaultValue={artwork.toolUsed} />
                <input className={`${style.input}`} defaultValue={artwork.category} />

                <div className={`${style.buttonContainer}`}>
                    <button className={`${style.button} ${style.deleteButton}`}><img className={`${style.buttonIcon}`} src="/images/dashboard/trash-bin.png" /></button>
                    <button className={`${style.button} ${style.saveButton}`}><img className={`${style.buttonIcon}`} src="/images/dashboard/save.png" /></button>
                </div>
            </div>
        </>
    )
}