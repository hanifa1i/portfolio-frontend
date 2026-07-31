"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "./Nav.module.css"
import NavButton from "./navButton/NavButton"
import { navigation, navigationImageFinder} from "@/app/data/navigation";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import Login from "../login/Login";
import { playSound } from "@/app/lib/SoundManager";
import { sketchbooks } from "@/app/data/sketchbooks";


export default function HomeNav() {

    const router = useRouter();
    const page = usePathname().split("/").filter(Boolean)[0] || "";

    const [clicked, setClicked] = useState(false);
    const [isSamePage, setIsSamePage] = useState(false);
    const [pageName, setPageName] = useState("");

    const switchPage = (url: string) => {
        if (page === url) {
            setIsSamePage(true);
            setTimeout(() => { setIsSamePage(false); }, 500);
        }
        else {
            setClicked(true);
            setPageName(url);
            if (url === "←") {
                setTimeout(() => { router.push("/"); }, 1000);
            }
            else {
                setTimeout(() => { router.push("/" + url); }, 1000);
            }
        }
    };

    useScrollReveal(".offscreenDown", "easeIn", false);

    return (
        <>
            <div className={`
                    ${style.pageSwitchInactive} 
                    ${clicked ? style.pageSwitchActive : ""}
                    ${pageName === "sketchbooks" ? style.sketchbookBg : ""}
                    ${pageName === "skills" ? style.skillsBg : ""}
                    ${pageName === "qualification" ? style.qualificationBg : ""}
                `}>
                        <img className={`${clicked ? style.pageSwitchImage : ""}`} src={`${pageName === "←" ?  "/images/nav/home.svg" : navigationImageFinder[pageName as keyof typeof navigationImageFinder]?.image }`}/>
            </div>

            <nav className={`${style.navigation} ${style.popIn}`}>

                <Login switchPage={switchPage} />

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
