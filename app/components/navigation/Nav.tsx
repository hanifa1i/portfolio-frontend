"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "./Nav.module.css"
import NavButton from "./navButton/NavButton"
import { navigation } from "@/app/data/navigation";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import Login from "../login/Login";
import { playSound } from "@/app/lib/SoundManager";


export default function HomeNav() {

    const router = useRouter();
    const page = usePathname().split("/").filter(Boolean)[0] || "";

    const [clicked, setClicked] = useState(false);
    const [isSamePage, setIsSamePage] = useState(false);

    const switchPage = (url: string) => {
        if (page === url) {
            setIsSamePage(true);
            setTimeout(() => { setIsSamePage(false); }, 500);
        }
        else {
            setClicked(true);
            setTimeout(() => { router.push("/" + url); }, 1000);
        }
    };

    useScrollReveal(".offscreenDown", "easeIn");

    return (
        <>
            <div className={`${style.pageSwitchInactive} ${clicked ? style.pageSwitchActive : ""}`}></div>

            <nav className={`${style.navigation} offscreenDown`}>
                
                <Login switchPage={switchPage}/>

                <div className={`${style.navButtons} ${style.navButtonsSmall}`}>
                    {
                        navigation.map((items, index) => (
                            <NavButton
                                key={index}
                                label={items.label}
                                page={page}
                                icon={items.image}
                                isScrolled={true}
                                isSamePage={isSamePage}
                                switchPage={switchPage}
                            />
                        ))
                    }
                </div>
            </nav >
        </>
    );
}
