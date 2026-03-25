import { playSound } from "@/app/lib/SoundManager";
import styles from "./BookSelector.module.css"

type Props = {
    setBook: (bookId: number) => void;
    bookId: number
}
export default function BookSelector({setBook, bookId}: Props){
    return (

        <div className={`${styles.container}`}>
            <div onMouseEnter={() => playSound("hover")} onClick={() => {setBook(1), playSound("blob")}} className={`${styles.selector} ${styles.a5SketchbookSelector} ${bookId === 1 ? styles.selected : ""}`}>
                <div className={`${styles.defaultBook} ${styles.a5Sketchbook}`}/>
            </div>
            <div onMouseEnter={() => playSound("hover")} onClick={() => {setBook(2), playSound("blob")}} className={`${styles.selector} ${bookId === 2 ? styles.selected : ""}`}>
                <div className={`${styles.defaultBook} ${styles.a4Sketchbook}`}><div className={`${styles.rings}`}/></div>
            </div>
            <div onMouseEnter={() => playSound("hover")} onClick={() => {setBook(3), playSound("blob")}} className={`${styles.selector} ${bookId === 3 ? styles.selected : ""}`}>
                <div className={`${styles.defaultBook} ${styles.a4Notebook}`}/>
            </div>
            <div onMouseEnter={() => playSound("hover")} onClick={() => {setBook(4), playSound("blob")}} className={`${styles.selector} ${bookId === 4 ? styles.selected : ""}`}>
                <div className={`${styles.defaultBook} ${styles.a4NoteBookYear2}`}><div className={`${styles.a4NoteBookYear2Details}`}/></div>
            </div>
            <div onMouseEnter={() => playSound("hover")} onClick={() => {setBook(5), playSound("blob")}} className={`${styles.selector} ${bookId === 5 ? styles.selected : ""}`}>
                <div className={`${styles.defaultBook} ${styles.a3SketchBook}`}><div className={`${styles.rings}`}/></div>
            </div>
        </div>
    )
}