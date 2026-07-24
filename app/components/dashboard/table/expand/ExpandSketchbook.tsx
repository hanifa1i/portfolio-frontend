import { ArtworkResponse } from "@/app/types/Dashboard"
import styles from "./Expand.module.css"

type Props = {
    data: ArtworkResponse
}

export default function ExpandSketchbook({ data }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.id}`}>{data.id}</div>
                <img className={`${styles.preview}`} src={data.image_urls[0].image_url}/>
                <div className={`${styles.column}`}>
                    <div>
                        <div className={`${styles.heading}`}>book</div>
                        <div className={`${styles.data}`}>{data.title}</div>
                    </div>
                    <div>
                        <div className={`${styles.heading}`}>page number</div>
                        <div className={`${styles.data}`}>{data.page_number}</div>
                    </div>
                    
                </div>
                <div className={`${styles.column}`}>
                    <div>
                        <div className={`${styles.heading}`}>description</div>
                        <div className={`${styles.data}`}>{data.description}</div>
                    </div>
                </div>
            </div>
        </>
    )
}