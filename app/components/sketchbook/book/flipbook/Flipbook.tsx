"use client"

import a3Styles from "../bookStyles/a3/Flipbook.module.css"
import a5Styles from "../bookStyles/a5/Flipbook.module.css"
import a4NotebookStyles from "../bookStyles/a4Notebook/Flipbook.module.css"
import a4NotebookYear2Styles from "../bookStyles/a4NotebookYear2/Flipbook.module.css"
import spiralBookStyle from "../bookStyles/spiralBook/Flipbook.module.css"

import A3Front from "../bookStyles/a3/components/front/front"
import A5Front from "../bookStyles/a5/components/front/Front"
import A4Year2Front from "../bookStyles/a4NotebookYear2/components/front/Front"
import SpiralBookFront from "../bookStyles/spiralBook/components/front/front"

import A5InnerCover from "../bookStyles/a5/components/innerCover/InnerCover"
import HTMLFlipBook from "react-pageflip"
import { RefObject } from "react"
import { playSound } from "@/app/lib/SoundManager"
import { BookData } from "../Books"

export type Sketchbook = {
    id: number;
    title: string;
    pages: number;
    page_size: "A4" | "A5" | "A3";
    page_style: string;
};

type Props = {
    bookId: number;
    bookRef: RefObject<any>;
    setCurrentPage: (current: number) => void;
    setTotalPages: (total: number) => void;
    flipbookWidth: number
    data: BookData
}

export default function Flipbook({ bookId, bookRef, setCurrentPage, setTotalPages, flipbookWidth, data }: Props) {
    const BOOK_STYLES: Record<number, typeof a5Styles> = {
        1: a5Styles,
        2: a3Styles,
        3: a4NotebookStyles,
        4: a4NotebookYear2Styles,
        5: spiralBookStyle
    };

    const styles = BOOK_STYLES[bookId];

    return (<>
        {data.pages.length % 2 === 1 ? <HTMLFlipBook
            width={flipbookWidth}
            height={700}
            maxShadowOpacity={0}
            drawShadow={true}
            showCover={true}
            flippingTime={200}
            ref={bookRef}
            onFlip={(e) => setCurrentPage(e.data)}
            onInit={() => {
                const count = bookRef.current?.pageFlip().getPageCount();
                if (count) setTotalPages(count);
            }}
        >
            <div onClick={() => playSound("bookClose")} className={`${styles.coverPage}`}>
                {bookId === 1 && (<A5Front />)}
                {bookId === 2 && (<A3Front state="front" />)}
                {bookId === 4 && (<A4Year2Front />)}
                {bookId === 5 && (<SpiralBookFront state="front" />)}

            </div>

            <div onClick={() => playSound("bookClose")} className={`${styles.InnerCoverPage}`}>
                {/*bookId === 1 && (<A5InnerCover />)*/}
            </div>

            <div onClick={() => playSound("bookFlip")} className={styles.rightPage}></div>

            {data.pages.map((page, index) => (
                <div
                    key={index}
                    onClick={() => playSound("bookFlip")}
                    className={index % 2 === 1 ? styles.rightPage : styles.leftPage}>
                        <img className={styles.image} src={page.image_urls[0].image_url}/>
                </div>
            ))}
            <div onClick={() => playSound("bookFlip")} className={styles.rightPage}></div>

            <div onClick={() => playSound("bookFlip")} className={styles.leftPage}></div>
            <div onClick={() => playSound("bookClose")} className={`${styles.coverPage}`}>  </div>
            <div onClick={() => playSound("bookClose")} className={`${styles.InnerCoverPage}`}></div>
        </HTMLFlipBook>
        
        :

        <HTMLFlipBook
            width={flipbookWidth}
            height={700}
            maxShadowOpacity={0}
            drawShadow={true}
            showCover={true}
            flippingTime={200}
            ref={bookRef}
            onFlip={(e) => setCurrentPage(e.data)}
            onInit={() => {
                const count = bookRef.current?.pageFlip().getPageCount();
                if (count) setTotalPages(count);
            }}
        >
            <div onClick={() => playSound("bookClose")} className={`${styles.coverPage}`}>
                {bookId === 1 && (<A5Front />)}
                {bookId === 2 && (<A3Front state="front" />)}
                {bookId === 4 && (<A4Year2Front />)}
                {bookId === 5 && (<SpiralBookFront state="front" />)}

            </div>

            <div onClick={() => playSound("bookClose")} className={`${styles.InnerCoverPage}`}>
                {bookId === 1 && (<A5InnerCover />)}
            </div>

            <div onClick={() => playSound("bookFlip")} className={styles.rightPage}></div>

            {data.pages.map((page, index) => (
                <div
                    key={index}
                    onClick={() => playSound("bookFlip")}
                    className={index % 2 === 1 ? styles.rightPage : styles.leftPage}>
                        <img className={styles.image} src={page.image_urls[0].image_url}/>
                </div>
            ))}
            <div onClick={() => playSound("bookFlip")} className={styles.leftPage}></div>

            <div onClick={() => playSound("bookClose")} className={`${styles.coverPage}`}>  </div>
            <div onClick={() => playSound("bookClose")} className={`${styles.InnerCoverPage}`}></div>
        </HTMLFlipBook>}

    </>)
}