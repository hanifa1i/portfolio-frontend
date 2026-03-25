"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "./Nav.module.css"
import NavButton from "./navButton/NavButton"
import { navigation } from "@/app/data/navigation";
import Login from "../login/Login";

export default function HomeNav() {

    const router = useRouter();
    const page = usePathname().split("/").filter(Boolean)[0] || "";

    const [clicked, setClicked] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSamePage, setIsSamePage] = useState(false);

    const switchPage = (url: string) => {
        if (page === url) {
            setIsSamePage(true);
            setTimeout(() => { setIsSamePage(false);}, 300);
        }
        else {
            setClicked(true);
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
            <div ref={triggerRef} className="border h-1 z-[400]">hello world</div>
            <div className={`${style.pageSwitchInactive} ${clicked ? style.pageSwitchActive : ""}`}></div>

            <nav className={`${style.navigation}`}>
                
                {isScrolled && (<Login/>)}

                <div className={`${style.navButtons} ${isScrolled ? style.navButtonsSmall : style.navButtonsLarge}`}>
                    {
                        navigation.map((items, index) => (
                            <NavButton
                                key={index}
                                label={items.label}
                                icon={items.image}
                                isScrolled={isScrolled}
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
