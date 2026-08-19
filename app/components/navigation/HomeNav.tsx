"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "./Nav.module.css"
import NavButton from "./navButton/NavButton"
import { navigation, navigationImageFinder } from "@/app/data/navigation";
import Login from "../login/Login";

export default function HomeNav() {

    const router = useRouter();
    const page = usePathname().split("/").filter(Boolean)[0] || "";

    const [clicked, setClicked] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSamePage, setIsSamePage] = useState(false);
    const [pageName, setPageName] = useState("");
    const [openLogin, setOpenLogin] = useState(false);

    const switchPage = (url: string) => {
        if (page === url) {
            setIsSamePage(true);
            setTimeout(() => { setIsSamePage(false);}, 300);
        }
        else {
            setClicked(true);
            setPageName(url);
            setTimeout(() => { router.push("/" + url); }, 1500);
        }
    };

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const observer = new IntersectionObserver(
            ([entry]) => { setIsScrolled(!entry.isIntersecting); },
            { threshold: 1 }
        );

        observer.observe(trigger);

        return () => observer.disconnect();

    }, []);

    return (
        <>
            <div ref={triggerRef} className="opacity-0 border h-1 z-[400]">hello world</div>
            <div className={`${style.pageSwitchInactive} 
                    ${clicked ? style.pageSwitchActive : ""}
                    ${pageName === "sketchbooks" ? style.sketchbookBg : ""}
                    ${pageName === "skills" ? style.skillsBg : ""}
                    ${pageName === "qualification" ? style.qualificationBg : ""}
                    `}>
                        <img className={`${clicked ? style.pageSwitchImage : ""}`} src={navigationImageFinder[pageName as keyof typeof navigationImageFinder]?.image}/>
                    </div>

            <nav className={`${style.navigation} ${openLogin ? style.mobileLoginLayout: ""}`}>
                
                {isScrolled && (<Login switchPage={switchPage} openLogin={openLogin} setOpenLogin={setOpenLogin}/>)}

                <div className={`home ${style.navButtons} ${isScrolled ? style.navButtonsSmall : style.navButtonsLarge} ${isScrolled && openLogin ? style.navButtonsSmallOpenLogin: ""}`}>
                    {
                        navigation.map((items, index) => 
                            (items.label !== "←" && (<NavButton
                                key={index}
                                label={items.label}
                                page={page}
                                icon={items.image}
                                isScrolled={isScrolled}
                                isSamePage={isSamePage}
                                switchPage={switchPage}
                            />))
                        )
                    }
                </div>
            </nav >
        </>
    );
}
