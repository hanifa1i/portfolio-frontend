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
                    <img src="/images/real-me.jpeg" className={styles.personalImage} />
                </div>

                <div className={`${styles.aboutMe} `}>
                    <div className="offscreenRight customHeading">hi,</div>
                    <div className={`offscreenRight customHeading border-b border-[#333] h-[80px] text-[100px] mt-[50px] mb-[20px] ${styles.name}`}>hanif ali</div>
                    <div className="offscreenRight customHeading flex text-[15px] mb-[20px] ">age:
                        <div className="mx-[20px] bg-[#333]/50 px-[20px] rounded-md">29</div>
                        location: <div className="ml-[20px] bg-[#333]/50 px-[20px] rounded-md">london</div></div>
                    <div className="offscreenRight customHeading text-[20px] ">
                        hi so blah blah blah and also blah blah
                        and dont forget to blah blah blah :()

                        oranges like the number 10.

                        hi so blah blah blah and also blah blah
                        and dont forget to blah blah blah :()
Í
                        oranges like the number 10 hi so blah blah blah and also blah blah
                    </div>
                </div>
            </div>
        </>
    );
}