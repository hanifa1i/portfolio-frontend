import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import styles from "./PageButton.module.css"
import { RefObject } from "react"
import HTMLFlipBook from "react-pageflip"

type Props = {
    bookRef: RefObject<HTMLFlipBook>;
    currentPage: number;
    pageNumber: number
    lastPageNumber: number
}

export default function PageButton({bookRef, currentPage, pageNumber, lastPageNumber} : Props) {
    return (
        <button
            className={`
                ${styles.pageButton} 
                ${currentPage >= pageNumber ? styles.visited : ""}
                ${currentPage === pageNumber ? styles.current : ""}

                ${pageNumber === 0 || pageNumber === lastPageNumber - 1 ? styles.coverButton: ""}`}
            onMouseEnter={() => playSoundAt("hover", 0.5)}
            onClick={() => { 
                if (pageNumber === 0 || pageNumber === lastPageNumber - 1) { playSound("bookClose") }
                else { playSound("bookFlip")} bookRef.current.pageFlip().flip(pageNumber, top)}}>

            
            <div className={`${styles.divider} ${styles.line}`}>{pageNumber}</div>
            
            {(
                pageNumber !== 0 && pageNumber !== lastPageNumber - 1) && (
                <div className={`${styles.divider}`}>{pageNumber + 1}</div>
            )}

        </button>
    )
}