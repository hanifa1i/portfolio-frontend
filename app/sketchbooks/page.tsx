"use client"
import Nav from "../components/navigation/Nav";
import Book from "../components/sketchbook/book/Books"
import Divider from "../components/common/Divider";
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import Background from "../components/sketchbook/background/Background";
import Info from "../components/info/Info";

export default function SketchbooksPage() {
  
  const [bookActive, setBookActive] = useState<boolean>(false);

  useEffect (() => {
    console.log(bookActive)
  }, [bookActive])
  
  return (
    <div className="sketchbookContainer">

      <div className="pageCenterer h-[100vh] w-[100vw] ">
        <Background bookActive={bookActive}/>
        <Info/>
        <Nav/>
        <Book setBookActive={setBookActive}/>
      </div>

              <div className="topFadeHomePage"></div>

    </div>
  );
}
