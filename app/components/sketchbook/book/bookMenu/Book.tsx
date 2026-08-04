import a3Styles from "../bookStyles/a3/Base.module.css"
import a5Styles from "../bookStyles/a5/Base.module.css"
import a4NotebookStyles from "../bookStyles/a4Notebook/Base.module.css"
import a4NotebookYear2Styles from "../bookStyles/a4NotebookYear2/Base.module.css"
import spiralBookStyle from "../bookStyles/spiralBook/Base.module.css"

import A5Spine from "../bookStyles/a5/components/spine/Spine"
import A3Spine from "../bookStyles/a3/components/spine/spine"
import A4NotebookYear2Spine from "../bookStyles/a4NotebookYear2/components/spine/Spine"
import A4Year2Front from "../bookStyles/a4NotebookYear2/components/front/Front"
import SpiralBookSpine from "../bookStyles/spiralBook/components/spine/spine"

import A3Front from "../bookStyles/a3/components/front/front"
import A5Front from "../bookStyles/a5/components/front/Front"
import SpiralBookFront from "../bookStyles/spiralBook/components/front/front"

import BookInfo from "@/app/components/sketchbook/bookInfo/BookInfo"
import { sketchbooks } from "@/app/data/sketchbooks"
import { playSound, playSoundAt } from "@/app/lib/SoundManager"
import stylesCommon from "./Book.module.css"
import { Sketchbook } from "../Books"
import { useState } from "react"


type Props = {
    selected: number
    bookNumber: number
    sketchbook: Sketchbook
    bookId: number
    selectBook: (bookNo: number, book: Sketchbook) => void;
    bookGap: number;
    pages: number;
    enableAni: boolean
    setEnableAni: (state: boolean) => void
}
export default function Book({ selected, bookNumber, sketchbook, bookId, selectBook, bookGap, pages, enableAni, setEnableAni}: Props) {

    const BOOK_STYLES: Record<number, typeof a5Styles> = {
        1: a5Styles,
        2: a3Styles,
        3: a4NotebookStyles,
        4: a4NotebookYear2Styles,
        5: spiralBookStyle
    };

    const styles = BOOK_STYLES[bookId];


    return (
        <>
            <div
                onMouseEnter={() => playSoundAt("bookHover", 0.1)}
                onClick={() => { playSound("bookPick"), selectBook(sketchbook.id, sketchbook)}}
                style={{ "--bookGap": `${bookGap}px` } as React.CSSProperties}
                className={`${styles.book} ${selected === bookNumber ? styles.bookAfter : styles.bookHover} 
                    ${selected !== -1 && selected < bookNumber ? styles.moveRight : ""}
                    ${selected !== -1 && selected > bookNumber ? styles.moveLeft : ""}`}>

                <div style={{ "--delay": `${bookGap}ms` } as React.CSSProperties}
                    onAnimationStart={() => {
                        setTimeout(() => {
                            enableAni ? playSound("drum") : "";
                        }, 500);
                    }}
                    onAnimationEnd={() => setTimeout(() => { setEnableAni(false)}, 500)}
                    className={`flex ${enableAni ? stylesCommon.popInBooks : ""}
                        ${bookId === 1 ? stylesCommon.a5 : ""}
                        ${bookId === 2 ? stylesCommon.a3 : ""}
                        ${bookId === 5 ? stylesCommon.spiral : ""}`}>

                    <div className={`${styles.bookSpine} ${selected === bookNumber ? styles.bookSpineAfter : styles.bookSpineBefore}`}>
                        {bookId === 1 && (<A5Spine />)}
                        {bookId === 2 && (<A3Spine />)}
                        {bookId === 4 && (<A4NotebookYear2Spine />)}
                        {bookId === 5 && (<SpiralBookSpine />)}


                    </div>
                    

                </div>

            </div>

            {enableAni === false && (<div
                style={{ "--bookGap": `${bookGap}px` } as React.CSSProperties}
                className={` ${selected >= 1 && selected <= 5 ? `opacity-0` : styles.bookInfo}`}>
                {/*<div className={`${styles.line}`}></div>*/}

                <BookInfo sketchbook={sketchbook} pages={pages} />
            </div>)}

        </>
    )
}