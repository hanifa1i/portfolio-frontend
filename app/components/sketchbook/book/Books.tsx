"use client"
import styles from "./Books.module.css"
import Timeline from "./timeline/Timeline"
import Book from "./bookMenu/Book"
import { sketchbooks } from "@/app/data/sketchbooks"
import { pageSettings } from "@/app/data/pageSettings"

import Flipbook from "./flipbook/Flipbook"

import { useEffect, useRef, useState } from "react"
import { LargeNumberLike } from "crypto"
import BookUpdate from "../bookUpdate/BookUpdate"
import useScrollReveal from "@/app/hooks/useScrollReveal"
import { playSound } from "@/app/lib/SoundManager"
import { ArtworkResponse } from "@/app/types/Dashboard"
import { getSketchbookArt } from "@/app/services/artworkService"
import { set } from "date-fns"

export type Props = {
    setBookActive: (active: boolean) => void
}
export type Sketchbook = {
    id: number;
    name: string;
    page_size: string;
    page_style: string;
    title: string;
    year: string;
    description: string
}


export type PageSettings = {
    page_style: string;
    page_width: number;
    container_width: number;
    transform_x?: number;
};

export type BookData = {
    book: number
    pages: ArtworkResponse[];
}
export default function book({ setBookActive }: Props) {

    const bookRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedBook, setSelectedBook] = useState(-1);
    const [selectedBookData, setSelectedBookData] = useState<BookData>({ book: 0, pages: [] });
    const [enableAnimation, setEnableAnimation] = useState(true);


    const [enableBook, setEnableBook] = useState(false);
    const [sketchbook, setSketchbook] = useState<Sketchbook>();
    const [settings, setSettings] = useState<PageSettings>();
    const [expandInfo, setExpandInfo] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [books, setBooks] = useState<BookData[]>([]);
    const [leftPage, setLeftPage] = useState(false);


    const handleExpand = (state: boolean) => {
        if (selectedBookData.pages[currentPage - 3] !== undefined) {
            if (expandInfo) { setExpandInfo(false) }
            else { setExpandInfo(true) }
        }
    }
    useScrollReveal(".offscreenDown", "easeIn", false);

    const targetBook = (bookNo: number, book: Sketchbook) => {
        if (book.page_style === "portrait") {
            setSettings(pageSettings[1])
        }
        else {
            setSettings(pageSettings[0])
        }
        setSketchbook(book)
        setSelectedBook(bookNo);
        setSelectedBookData(books[bookNo - 1]);
        setTimeout(() => { setEnableBook(true); }, 500);
    }
    const reset = () => {
        if (currentPage === 0) {
            setEnableBook(false);
            setLeftPage(false)
            setTimeout(() => { setSelectedBook(-1); }, 0);
        }

        bookRef.current.pageFlip().flip(0, top)
        setTimeout(() => { setEnableBook(false); }, 700);
        setTimeout(() => { setSelectedBook(-1); }, 800);
    }

    useEffect(() => {
        if (selectedBook === -1) {
            setBookActive(false);
        }
        else {
            setBookActive(true);
        }
    }, [selectedBook]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ArtworkResponse[] = await getSketchbookArt();

                organiseBooks(data);

            } catch (error) {
                console.error("Failed to get sketchbook data", error);
            }
        };

        fetchData();
    }, [])

    const organiseBooks = (pages: ArtworkResponse[]) => {

        const book1: ArtworkResponse[] = [];
        const book2: ArtworkResponse[] = [];
        const book3: ArtworkResponse[] = [];
        const book4: ArtworkResponse[] = [];
        const book5: ArtworkResponse[] = [];

        pages.forEach(page => {
            if (page.title === "Book 1") { book1.push(page); }
            if (page.title === "Book 2") { book2.push(page); }
            if (page.title === "Book 3") { book3.push(page); }
            if (page.title === "Book 4") { book4.push(page); }
            if (page.title === "Book 5") { book5.push(page); }
        });

        book1.sort((a, b) => a.page_number - b.page_number);
        book2.sort((a, b) => a.page_number - b.page_number);
        book3.sort((a, b) => a.page_number - b.page_number);
        book4.sort((a, b) => a.page_number - b.page_number);
        book5.sort((a, b) => a.page_number - b.page_number);


        setBooks(
            [
                { book: 1, pages: book1 },
                { book: 2, pages: book2 },
                { book: 3, pages: book3 },
                { book: 4, pages: book4 },
                { book: 5, pages: book5 },
            ]
        )
    }

    useEffect(() => {
        console.log("test", selectedBookData)
        console.log("test1, ", selectedBookData.pages[currentPage - 3])
    }, [selectedBookData, currentPage])

    return (
        <>
            

            <div
                style={{ "--bookContainerWidth": `${settings?.container_width !== undefined ? settings?.container_width : 0}px` } as React.CSSProperties}

                className={`${styles.bookContainer} `}>


                {!enableBook && (
                    <div className={`${styles.books}`}>

                        <div className={` ${styles.pageInfo} ${selectedBook !== -1 ? styles.fadeOut : ""}`}>
                            <div className={`${styles.mobileHide}`}>ⓘ   Sketchbooks</div>
                            <p className={`${styles.subInfo} ${styles.borderHide}`}>These are some of my physical sketchbooks i had drawn in, throughout my life. From practicing, to studies and live drawings.
                                I had recreated these in digital form so anyone can view them </p>
                            <div className={`${styles.subInfo} ${styles.mobileHide}`}>Click<img src={"/images/sketchbook/bell-static.png"} className={` ml-[5px] mr-[5px] h-[20px] invert`} />icon on the far left to know if I have added any new sketches</div>

                            <div className={`${styles.subInfo} ${styles.mobileHide}`}><div className={`${styles.arrow}`}>←</div>now select a book or DIEEEEE </div>
                        </div>

                        <div className={`${styles.centerer}`}>
                                {sketchbooks.map((sketchbook, index) => (


                                    <Book
                                        key={index}
                                        selected={selectedBook}
                                        bookNumber={index + 1}
                                        sketchbook={sketchbook}
                                        bookId={sketchbook.id}
                                        selectBook={targetBook}
                                        bookGap={index * 100}
                                        pages={books[index] !== undefined ? books[index].pages.length : 0}
                                        enableAni={enableAnimation}
                                        setEnableAni={setEnableAnimation}
                                    />
                                ))}
                        </div>


                    </div>
                )}

                <div
                    style={{ "--transfromX": `${settings?.transform_x}px` } as React.CSSProperties}
                    className={`
                    ${styles.flipbookContainer}
                    ${currentPage === 0 ? styles.bookFrontCenter : ""}
                    ${currentPage === totalPages - 1 ? styles.bookBackCenter : ""}
                    ${leftPage ? styles.leftPage : ""}

                    ${settings?.page_style === "landscape" ? styles.landscapeTransformX : ""}
                    ${settings?.page_style === "landscape" && currentPage === 0 ? styles.bookFrontCenterLandscape : ""}
                    ${settings?.page_style === "landscape" && currentPage === totalPages - 1 ? styles.bookBackCenterLandscape : ""}`}>

                    {enableBook && (
                        <Flipbook
                            bookId={selectedBook}
                            bookRef={bookRef}
                            setCurrentPage={setCurrentPage}
                            setTotalPages={setTotalPages}
                            flipbookWidth={settings?.page_width ?? 550}
                            data={books[selectedBook - 1]} />

                    )}
                    {(selectedBook === 4) && (
                        <div className={`${styles.flap} ${selectedBookData.pages.length + 3 <= currentPage ? styles.flapHide : styles.flapAni}`}>
                            <div className={`${styles.stitching}`}>
                                <div className={`${styles.button}`}></div>
                            </div>
                        </div>
                    )}

                    {expandInfo && (<div onClick={() => { setExpandInfo(false), playSound("bell") }} className={`${styles.closeInfo}`} />)}

                    <div
                        className={`
                            ${styles.infoBar} 
                            ${selectedBook === -1 || selectedBookData.pages[currentPage - 3] === undefined ? styles.infoBarHide : ""} 
                            ${expandInfo ? styles.expand : ""}`}

                        onClick={() => { handleExpand(true), playSound("bell") }}
                        onMouseEnter={() => { setHovered(true), playSound("hover") }}
                        onMouseLeave={() => setHovered(false)}>

                        <img className={`w-[30px] h-[30px] ${!expandInfo ? `m-auto` : ""}`} src={hovered ? "/images/sketchbook/info.png" : "/images/sketchbook/info-static.png"} />
                        {expandInfo && (
                            <div className={`${styles.description} offscreenLeft`}>{selectedBookData.pages[currentPage - 3] !== undefined ? selectedBookData.pages[currentPage - 3].description : ""}</div>
                        )
                        }
                    </div>
                </div>

            </div>
            <div >
                <div
                    onClick={() => {setLeftPage(true), playSound("whosh")}} 
                    className={`${styles.pageSwitch} ${styles.pageSwitchLeft} ${!leftPage ? styles.inactivePage : ""} ${!enableBook ? styles.hidePageSwitch : "" }`}></div>
                <div 
                    onClick={() => {setLeftPage(false), playSound("whosh")}}
                    className={`${styles.pageSwitch} ${styles.pageSwitchRight} ${leftPage ? styles.inactivePage : ""} ${!enableBook ? styles.hidePageSwitch : "" }`}></div>

            </div>
            <Timeline bookRef={bookRef} currentPage={currentPage} totalPages={totalPages} visibility={enableBook} back={reset} additionalFunction={setExpandInfo} />


        </>
    )

}