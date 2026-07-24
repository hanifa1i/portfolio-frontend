import { Sketchbook } from "../book/Books"
import styles from "./BookInfo.module.css"

type Props = {
    sketchbook: Sketchbook
    pages: Number
}
export default function BookInfo({sketchbook, pages} : Props) {
    return (
        <>  
                <div className={`${styles.bookName}`}>{sketchbook.title}</div>
                <div className={`${styles.bookDescription}`}>{sketchbook.description}</div>
                <div className={`${styles.bookTag}`}>
                    <div>Year</div>
                    <div className={`${styles.tagValue}`}>{sketchbook.year}</div>
                </div>
                <div className={`${styles.bookTag}`}>
                    <div>Pages</div>
                    <div className={`${styles.tagValue}`}>{String(pages)}</div>
                </div>
                <div className={`${styles.bookTag}`}>
                    <div>Size</div>
                    <div className={`${styles.tagValue}`}>{sketchbook.page_size}</div>
                </div>
            
        </>
    )
}