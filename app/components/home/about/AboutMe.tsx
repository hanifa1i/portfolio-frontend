"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutMe.module.css";
import SocialsLinks from "./socialsLinks/SocialsLinks"
import { socials } from "@/app/data/socials";
import useScrollReveal from "@/app/hooks/useScrollReveal";

export default function AboutMe() {

    useScrollReveal(".offscreenLeft", "easeIn", false);
    useScrollReveal(".offscreenRight", "easeIn", false);
    useScrollReveal(".offscreenUp", "easeIn", false);


    return (
        <>
            <div className={styles.about}>

                <div className={styles.socials}>
                    <div className={styles.socialsCard}>
                        {socials.map((items, index) => (
                            <SocialsLinks
                                key={index}
                                name={items.name}
                                image={items.image}
                                link={items.link} />
                        ))}
                    </div>
                </div>

                <div className={`${styles.personalImageContainer} offscreenUp`}>
                    <img src="/images/about-me-image.jpeg" className={styles.personalImage} />
                </div>

                <div className={`${styles.aboutMe} `}>
                    <div className="offscreenRight customHeading">hi,</div>
                    <div className={`offscreenRight customHeading border-b border-[#333] h-[80px] text-[90px] mt-[50px] mb-[20px] ${styles.name}`}>hanif ali</div>
                    <div className="offscreenRight customHeading flex text-[15px] mb-[20px] ">age:
                        <div className="mx-[20px] bg-[#333]/50 px-[20px] rounded-md">30</div>
                        location: <div className="ml-[20px] bg-[#333]/50 px-[20px] rounded-md">london</div></div>
                    <div className="offscreenRight  text-[14px] leading-[1.6] ">
                        <p>Welcome to my portfolio, fully designed, built and deployed by myself. From the smallest animations (such as how buttons move and respond)
                            to the whole site's flow, all my ideas, my code, my execution. I built this portfolio primarily to show my skills as a full-stack software
                            engineer. This includes both the frontend and backend, while also using this as a place to showcase my artwork, along with other things
                            eventually in the future.</p>
                        <div className={styles.paragraphLine}></div>
                        <p>This portfolio is best experienced on desktop, but I didn't want to leave this portfolio half-baked, so I added additional functionality to better suit mobile also,
                            ensuring everything
                            works as expected and is tailored to whatever screen size you view this on.</p>
                        <div className={styles.paragraphLine}></div>
                        <p>So please enjoy navigating around every page, as I spent many, many
                            hours trying to perfect it as much as I could. Also from a developer's point of view to access the whole design and Git repositories for this
                            frontend, as well as the backend API I created for it, look for the <img
                                src="images/sketchbook/info-static.png"
                                className="invert-[70%] inline w-[18px] h-[18px] mx-[2px] rounded-[10px]"
                                alt="information icon"
                            /> icon in the top-right corner (bottom-right for mobile).</p>
                    </div>
                </div>
            </div>
        </>
    );
}