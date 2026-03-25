"use client"
import styles from "./Books.module.css"
import Timeline from "./timeline/Timeline"
import Book from "./bookMenu/Book"
import { sketchbooks } from "@/app/data/sketchbooks"
import { pageSettings } from "@/app/data/pageSettings"

import Flipbook from "./flipbook/Flipbook"

import { useEffect, useRef, useState } from "react"
import { LargeNumberLike } from "crypto"

export type Sketchbook = {
    id: number;
    title: string;
    pages: number;
    page_size: "A4" | "A5" | "A3";
    page_style: string;
};

export type PageSettings = {
    page_style: string;
    page_width: number;
    container_width: number;
    transform_x: number;
};
export default function book() {

    const bookRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedBook, setSelectedBook] = useState(-1);
    const [enableBook, setEnableBook] = useState(false);
    const [sketchbook, setSketchbook] = useState<Sketchbook>();
    const [settings, setSettings] = useState<PageSettings>();


    const targetBook = (bookNo: number, book: Sketchbook) => {
        if (book.page_style === "portrait"){
            setSettings(pageSettings[1])
        }
        else{
            setSettings(pageSettings[0])
        }
        setSketchbook(book)
        setSelectedBook(bookNo);
        setTimeout(() => { setEnableBook(true); }, 500);
    }
    const reset = () => {
        if (currentPage === 0) {
            setEnableBook(false);
            setTimeout(() => { setSelectedBook(-1); }, 0);
        }

        bookRef.current.pageFlip().flip(0, top)
        setTimeout(() => { setEnableBook(false); }, 700);
        setTimeout(() => { setSelectedBook(-1); }, 800);
    }

    return (
        <>

            <div 
            style={{ "--bookContainerWidth": `${settings?.container_width}px` } as React.CSSProperties}

            className={`${styles.bookContainer}`}>


                {!enableBook && (
                    <div className={`${styles.books}`}>

                        <div className={`${styles.pageInfo} ${selectedBook !== -1 ? styles.fadeOut : ""}`}>
                            <div>sketchbooks</div>
                            <div className={`${styles.subInfo}`}>hello melon eat mango and you will get superpowers of oranges the shoot out apples </div>
                            <div className={`${styles.subInfo}`}><div className={`${styles.arrow}`}>←</div>now select a book or DIEEEEE </div>
                        </div>


                        {sketchbooks.map((sketchbook, index) => (
                            <Book
                                key={index}
                                selected={selectedBook}
                                bookNumber={index + 1}
                                sketchbook={sketchbook}
                                bookId={sketchbook.id}
                                selectBook={targetBook}
                                bookGap={index * 100}
                            />
                        ))}
                    </div>
                )}

                <div
                    style={{ "--transfromX": `${settings?.transform_x}px` } as React.CSSProperties}
                    className={`
                    ${styles.flipbookContainer}
                    ${currentPage === 0 ? styles.bookFrontCenter : ""}
                    ${currentPage === totalPages - 1 ? styles.bookBackCenter : ""}

                    ${settings?.page_style === "landscape" ? styles.landscapeTransformX : ""}
                    ${settings?.page_style === "landscape" && currentPage === 0 ? styles.bookFrontCenterLandscape : ""}
                    ${settings?.page_style === "landscape" && currentPage === totalPages - 1 ? styles.bookBackCenterLandscape : ""}


`}>
                    {enableBook && (

                        <Flipbook
                            bookId={selectedBook}
                            bookRef={bookRef}
                            setCurrentPage={setCurrentPage}
                            setTotalPages={setTotalPages}
                            flipbookWidth={settings?.page_width ?? 550} />


                    )}
                    {(selectedBook === 4) && (
                        <div className={`${styles.flap}`}>
                            <div className={`${styles.stitching}`}>
                                <div className={`${styles.button}`}></div>
                            </div>
                        </div>
                    )}
                </div>

                <Timeline bookRef={bookRef} currentPage={currentPage} totalPages={totalPages} visibility={enableBook} back={reset} />
            </div>


        </>
    )

}