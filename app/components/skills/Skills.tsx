"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css"
import { skills } from "@/app/data/skills/skills"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { playSound } from "@/app/lib/SoundManager";


export default function Skills() {

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [enlargeExample, setEnlargeExample] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [maxReachedIndex, setMaxReachedIndex] = useState<number>(-1);
    const [progress, setProgress] = useState({
        section: -1,
        item: -1,
    });

    useScrollReveal(".offscreenLeft", "easeIn");
    useScrollReveal(`.${styles.offscreenPopUp}`, styles.subheadingInfo, true);

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

    useEffect(() => {
        const sections =
            document.querySelectorAll<HTMLElement>(".skillSection");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const section = Number(entry.target.dataset.section);
                    const item = Number(entry.target.dataset.item);

                    setProgress({ section, item });
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // center of screen
                threshold: 0,
            }
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);




    return (
        <>
            <div ref={triggerRef} className="opacity-0 border absolute mt-[65vh] z-[400]">hello world</div>

            <div className={`${styles.background}`}>
            
            <img src="/images/skills/blueprint.jpg" className="absolute top-[00px] opacity-20 w-full left-1/2 -translate-x-1/2" /></div>

            <div className={`${styles.headingsContainer}  ${isScrolled ? styles.headingsContainerTransition : ""}`}>

                {skills.map((sections, index) => (
                    <div className={`${styles.headingSubDivider} offscreenLeft`} key={index}>
                        <div className={`${styles.heading}  ${isScrolled ? styles.headingTransition : ""} `}>
                            {sections.title}
                        </div>
                        <div key={index} className={`${styles.container} `}>
                            {sections.items.map((items, key) => (
                                <div 
                                    key={key}
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => { playSound("drum"), document.getElementById(`${items}`)?.scrollIntoView({ behavior: "smooth", block: "center" }) }}
                                    className={`${styles.subheading} `}>

                                    {items}

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>



            {/* sidebar  */}
            <div className={`${styles.skillsInDetail} `}>
                <div className={` ${isScrolled ? styles.sidebar : styles.sidebarHidden}`}>
                    <div
                        onMouseEnter={() => playSound("hover")}
                        onClick={() => { playSound("back"), window.scrollTo({ top: 0, behavior: "smooth" }) }}
                        className={`${styles.sidebarHeading}  ${isScrolled ? styles.backButton : styles.sidebarHeadingHidden}`}>
                        ↑ back to top
                    </div>

                    {skills.map((sections, index) => (

                        <div key={index} className={`${styles.sidebarHeadingContainer}`}>
                            <div
                                style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}
                                className={`${styles.sidebarHeading}  ${isScrolled ? styles.sidebarHeadingVisible : styles.sidebarHeadingHidden}`}>

                                {sections.title}
                                <div className={`${index < progress.section ? styles.completed :
                                    index === progress.section ? styles.active : styles.inActive}`}>✓</div>
                            </div>

                            {sections.items.map((items, key) => (
                                <div
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => { playSound("click"), document.getElementById(`${items}`)?.scrollIntoView({ behavior: "smooth", block: "center" }) }}
                                    key={key} className={`${styles.sidebarSubHeading}`}>
                                    
                                    {items}

                                    <div className={`
                                        ${index < progress.section || (index === progress.section && key < progress.item) ? styles.completed :
                                            index < progress.section || (index === progress.section && key === progress.item) ? styles.active : styles.inActive}`}>
                                        ✓
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>


                {/*  skill card  */}

                {skills.map((sections, index) => (
                    <div key={index}>
                        {sections.items.map((items, key) => (
                            <div
                                id={`${items}`}
                                key={key}
                                data-section={index}
                                data-item={key}
                                className={`skillSection ${styles.offscreenPopUp}`}>

                                <div className={`${styles.skillHeading} `}>
                                    <div className={`${styles.skillHeadingName} `}>{items}</div>
                                    <div className={`${styles.skillExperience} `}>gained experience at
                                        <div className={`${styles.skillExperienceName} `}>HMLR</div>
                                        <div className={`${styles.skillExperienceName} `}>Brunel</div>
                                        <div className={`${styles.skillExperienceName} `}>Java</div>

                                    </div>
                                </div>
                                <div className={`${styles.skillDescription} `}>
                                    Java is the language I have the deepest experience with and the one I’ve used most consistently throughout my career and education. At Brunel University, the majority of my programming
                                    coursework (around 80–90%) was taught and delivered in Java, giving me a strong foundation in object-oriented programming and problem-solving. At Sparta Global, Java was the core
                                    focus of the intensive 3-month training programme, where I applied it to build real-world exercises and backend applications. At HMLR, Java has been my primary working language for
                                    developing and maintaining APIs, implementing backend services, and updating enterprise-level systems. Beyond formal training and work, I have also explored Java through self-study
                                    projects, such as creating small applications and experimenting with features, which has reinforced my confidence and adaptability in the language.
                                </div>
                                <div className={`${styles.skillExamples}`}>

                                    <div
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => playSound("blob")}
                                        className={`${styles.skillLinks}`}> git ↗</div>

                                    <div className={`${styles.divider}`}></div>

                                    <div
                                        className={`${styles.skillExample}`}
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => { playSound("click"), setEnlargeExample(true) }} />
                                    <div
                                        className={`${styles.skillExample}`}
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => { playSound("click"), setEnlargeExample(true) }} />
                                    <div
                                        className={`${styles.skillExample}`}
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => { playSound("click"), setEnlargeExample(true) }} />
                                    <div
                                        className={`${styles.skillExample}`}
                                        onMouseEnter={() => playSound("hover")}
                                        onClick={() => { playSound("click"), setEnlargeExample(true) }} />
                                </div>
                            </div>
                        ))}</div>


                ))}
            </div>

            <div
                className={`${enlargeExample ? styles.tint : ""}`}
                onClick={() => { playSound("whosh"), setEnlargeExample(false) }} />
            <img
                src={"/images/me3.jpeg"}
                className={`${styles.exampleImageHidden} ${enlargeExample ? styles.exampleImage : ""}`} />

        </>
    )
}