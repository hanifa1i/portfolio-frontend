import { RefObject } from "react"
import styles from "./Timeline.module.css"
import HTMLFlipBook from "react-pageflip"
import PageButton from "./pageButton/PageButton"
import { playSequential, playSound, playSoundDelay } from "@/app/lib/SoundManager"

type Props = {
    bookRef: RefObject<any>;
    currentPage: number;
    totalPages: number;
    visibility: boolean;
    back: () => void;
    additionalFunction: (state: boolean) => void;
    rotateTrue: boolean;
    rotate: (state: boolean) => void;
    enlargeBook: boolean;
    setEnlargeBook: (state: boolean) => void;
}

export default function Timeline({ bookRef, currentPage, totalPages, visibility, back, additionalFunction, rotateTrue, rotate, enlargeBook, setEnlargeBook }: Props) {


        const spreads: number[] = [];
        for (let i = 1; i < totalPages; i += 2) {
            spreads.push(i);
        }
    

    return (
        <>
            <div className={`${styles.timelineContainer} ${visibility ? "" : styles.fadeOut}`}>

                <div className="">
                <button onClick={() => {
                    if (currentPage !== 0) { playSound("bookClose"), playSoundDelay( "bookPick", 800);}
                    else{playSound("bookPick")} back()}} className={`${styles.backButton}`}>← </button>
                </div>
                <div className={`${styles.timelineMobileScroll}`}>
                <div className={`${styles.timeline} ${visibility ? "" : styles.shrinkX}`}>
                    <PageButton bookRef={bookRef} currentPage={currentPage} pageNumber={0} lastPageNumber={totalPages} booleanFunction={additionalFunction}/>
                    
                    
                    {
                        spreads.map((pageIndex, spreadIndex) => (
                            <PageButton
                                key={pageIndex}
                                bookRef={bookRef}
                                currentPage={currentPage}
                                pageNumber={pageIndex}
                                lastPageNumber={totalPages}
                                booleanFunction={additionalFunction}
                            />
                        ))
                    }




                </div>
                </div>
                <button 
                    onClick={() => {
                        if (enlargeBook === false) { playSound("click"), setEnlargeBook(true);}
                        else{ playSound("click"), setEnlargeBook(false);} 
                    }} 
                    className={`${styles.rotateButton} ${styles.enlargeButton} ${enlargeBook ? styles.enlargeButtonEnlarge : ""}`}>
                        ⌞⌝
                </button>
                <button 
                    onClick={() => {
                        if (rotateTrue === false) { playSound("blob"), rotate(true);}
                        else{ playSound("blob"), rotate(false);} 
                    }} 
                    className={`${styles.rotateButton} ${currentPage === 0 ? styles.rotateButtonHide : ""} ${rotateTrue ? styles.rotateButtonRotate : ""}`}>
                        ↻ {rotateTrue ? "" : "Rotate"}
                </button>
                
            </div>

        </>
    )
}