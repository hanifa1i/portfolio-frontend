import { ArtworkResponse } from "@/app/types/Dashboard"
import styles from "./Expand.module.css"

type Props = {
    data: ArtworkResponse
}

export default function ExpandArtwork({ data }: Props) {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.id}`}>{data.id}</div>
                <img className={`${styles.preview}`} src={data.image_urls[0].image_url}/>
                <div className={`${styles.column}`}>
                    <div className={`${styles.compactInfo}`}>
                        <div className={`${styles.heading}`}>title</div>
                        <div className={`${styles.data}`}>{data.title}</div>
                    </div>
                    <div className={`${styles.info}`}>
                        <div className={`${styles.heading}`}>description</div>
                        <div className={`${styles.data}`}>{data.description}</div>
                    </div>
                    <div className={`${styles.compactInfo}`}>
                        <div className={`${styles.heading}`}>tool</div>
                        <div className={`${styles.data}`}>{data.tool}</div>
                    </div>
                </div>
                <div className={`${styles.column}`}>
                    <div className={`${styles.compactInfo}`}>
                        <div className={`${styles.heading}`}>created</div>
                        <div className={`${styles.data}`}>{data.created_at}</div>
                    </div>
                    <div className={`${styles.compactInfo}`}>
                        <div className={`${styles.heading}`}>updated</div>
                        <div className={`${styles.data}`}>{data.updated_at}</div>
                    </div>
                    <div className={`${styles.compactInfo}`}>
                        <div className={`${styles.heading}`}>visible</div>
                        <div className={`${styles.data}`}>{data.visible}</div>
                    </div>
                    <div className={`${styles.info}`}>
                        <div className={`${styles.heading}`}>tags</div>
                        <div className={`${styles.data}`}>{data.tag_names}</div>
                    </div>
                </div>
            </div>
        </>
    )
}