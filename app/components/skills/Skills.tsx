"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css"
import { skillsDummy } from "@/app/data/skills/skills"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { playSound } from "@/app/lib/SoundManager";
import { SkillResponse } from "@/app/types/Dashboard";
import { getSkills } from "@/app/services/SkillService";

export type SkillsByCategory = {
    id: string;
    category: string;
    skills: SkillResponse[];
};

export default function Skills() {

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [enlargeExample, setEnlargeExample] = useState(false);
    const [exampleImage, setExampleImage] = useState("/images/me3.jpeg");
    const [videoSrc, setVideoSrc] = useState("/videos/skills/bg-intro.mp4");
    const [loop, setLoop] = useState(false);
    const loopRef = useRef<HTMLVideoElement>(null);


    const [isScrolled, setIsScrolled] = useState(false);
    const [showSideBarMobile, setShowSideBarMobile] = useState(false);

    const [maxReachedIndex, setMaxReachedIndex] = useState<number>(-1);
    const [progress, setProgress] = useState({
        section: -1,
        item: -1,
    });
    const [activeId, setActiveId] = useState(-1);

    useScrollReveal(".offscreenLeft", "easeIn", false);
    useScrollReveal(`.${styles.offscreenPopUp}`, styles.subheadingInfo, true);

    const [skillse, setSkills] = useState<SkillResponse[]>([]);
    const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: SkillResponse[] = await getSkills();
                setSkills(data);

                setSkillsByCategory(transformSkills(data));

                console.log(transformSkills(data));
            } catch (error) {
                console.error("Failed to get skills", error);
            }
        };

        fetchRecent();
    }, [])

    const transformSkills = (skills: SkillResponse[]): SkillsByCategory[] => {
        const grouped: Record<string, SkillsByCategory> = {};
        skills.forEach(skill => {
            const key = skill.skill_type;

            if (!grouped[key]) {
                grouped[key] = {
                    id: key.toLowerCase().replaceAll(" ", "-"),
                    category: key,
                    skills: []
                }
            }

            grouped[key].skills.push(skill);
        });

        return Object.values(grouped);
    }

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const observer = new IntersectionObserver(
            ([entry]) => { 
                setIsScrolled(!entry.isIntersecting);
                if (entry.isIntersecting) { setShowSideBarMobile(!entry.isIntersecting); }
            },
            { threshold: 1 }
        );

        observer.observe(trigger);

        return () => observer.disconnect();

    }, [skillsByCategory]);

    useEffect(() => {
        const sections =
            document.querySelectorAll<HTMLElement>(".skillSection");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const target = entry.target as HTMLElement;

                    const section = Number(target.dataset.section);
                    const item = Number(target.dataset.item);
                    const skillId = Number(target.dataset.skillid);


                    setProgress({ section, item });
                    setActiveId(skillId)
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // center of screen
                threshold: 0,
            }
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [skillsByCategory]);




    return (
        <>
            <div ref={triggerRef} className="opacity-0 border absolute mt-[65vh] z-[400]">hello world</div>

            <div className={`${styles.background}`}>
                <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => {
                            setLoop(true);
                            loopRef.current?.play();
                    }}
                    className={`absolute top-[00px]  w-full left-1/2 -translate-x-1/2 ${loop ? `opacity-0` : `opacity-10`}`}
                >
                    <source src={"/videos/skills/bg-intro.mp4"} type="video/mp4" />
                </video>
                <video
                    ref={loopRef}
                    muted
                    loop
                    playsInline
                    className={`absolute top-[00px]  w-full left-1/2 -translate-x-1/2 ${loop ? `opacity-10` : `opacity-0`}`}
                >
                    <source src={"/videos/skills/bg2.mp4"} type="video/mp4" />
                </video>
                <img src="/images/skills/blueprint.jpg" className="absolute top-[00px] opacity-0 w-full left-1/2 -translate-x-1/2" /></div>

            {/*<div className={`${styles.headingsContainer} border ${isScrolled ? styles.headingsContainerTransition : ""}`}>
                <div>
                {skillsByCategory.map((sections, index) => (
                    <div className={`${styles.headingSubDivider} offscreenLef`} key={index}>
                        <div className={`${styles.heading}  ${isScrolled ? styles.headingTransition : ""} `}>
                            {sections.category}
                        </div>
                        <div key={index} className={`${styles.container} `}>
                            {sections.skills.map((items, key) => (
                                <div
                                    key={key}
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => { playSound("drum"), document.getElementById(`${items.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }) }}
                                    className={`${styles.subheading} `}>

                                    {items.name}

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
            </div>*/}
            <div className={`${styles.headingsContainer} ${isScrolled ? styles.headingsContainerTransition : ""}`}>
                {skillsDummy.map((sections, index) => (
                    <div className={`${styles.headingSubDivider} offscreenLeft`} key={index}>
                        <div className={`${styles.heading} ${isScrolled ? styles.headingTransition : ""} `}>
                            {sections.title}
                        </div>
                        <div key={index} className={`${styles.container} `}>
                            
                            {sections.items.map((items, key) => (
                                <div
                                    key={key}
                                    onMouseEnter={() => playSound("hover")}
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
                <div className={` ${isScrolled && showSideBarMobile ? styles.sidebar : styles.sidebarHidden}`}>
                    <div
                        onMouseEnter={() => playSound("hover")}
                        onClick={() => { playSound("back"), window.scrollTo({ top: 0, behavior: "smooth" }) }}
                        className={`${styles.sidebarHeading}  ${isScrolled ? styles.backButton : styles.sidebarHeadingHidden}`}>
                        ↑ back to top
                    </div>

                    {skillsByCategory.map((sections, index) => (

                        <div key={index} className={`${styles.sidebarHeadingContainer}`}>
                            <div
                                style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}
                                className={`${styles.sidebarHeading}  ${isScrolled ? styles.sidebarHeadingVisible : styles.sidebarHeadingHidden}`}>

                                {sections.category}
                                <div className={`${index < progress.section ? styles.completed :
                                    index === progress.section ? styles.active : styles.inActive}`}>✓</div>
                            </div>

                            {sections.skills.map((items, key) => (
                                <div
                                    onMouseEnter={() => playSound("hover")}
                                    onClick={() => { 
                                        playSound("click"), 
                                        setTimeout(() => { setShowSideBarMobile(false); }, 500);
                                        document.getElementById(`${items.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }) }}
                                    key={key} className={`${styles.sidebarSubHeading}`}>

                                    {items.name}

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

                {skillsByCategory.map((sections, index) => (
                    <div key={index}>
                        {sections.skills.map((items, key) => (
                            <div
                                id={`${items.id}`}
                                key={key}
                                data-section={index}
                                data-item={key}
                                data-skillid={items.id}
                                className={`skillSection ${styles.offscreenPopUp} ${activeId === items.id ? styles.subheadingInfo : ""}`}>

                                <div className={`${styles.skillHeading} `}>
                                    <div className={`${styles.skillHeadingName} `}>{items.name}</div>
                                    <div className={`${styles.skillExperience} `}>
                                        <div>gained experience at</div>
                                        <div className={`${styles.skillExperienceNames}`}>
                                        {items.experience_locations.map((location, key) => (
                                            <div key={key} className={`${styles.skillExperienceName} `}>{location}</div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.skillDescription} `}>
                                    {items.description}
                                </div>
                                {items.examples.length !== 0 && (<div className={`${styles.skillExamples}`}>
                                    {items.examples.map((example, key) => (
                                        example.exampleType === "LINK" && (
                                            <div
                                                key={key}
                                                onMouseEnter={() => playSound("hover")}
                                                onClick={() => playSound("blob")}
                                                className={`${styles.skillLinks}`}> {example.note} ↗</div>
                                        )
                                    ))}

                                    <div className={`${styles.divider}`}></div>

                                    {items.examples.map((example, key) => (
                                        example.exampleType === "IMAGE" && (
                                            <img
                                                key={key}
                                                src={example.url}
                                                className={`${styles.skillExample}`}
                                                onMouseEnter={() => playSound("hover")}
                                                onClick={() => { playSound("click"), setEnlargeExample(true), setExampleImage(example.url) }} />
                                        )
                                    ))}

                                </div>)}
                            </div>
                        ))}</div>


                ))}
            </div>
            <div className={`h-[300px]`} />
            <div
                className={`${enlargeExample ? styles.tint : ""}`}
                onClick={() => { playSound("whosh"), setEnlargeExample(false) }} />
            <img
                src={exampleImage}
                className={`${styles.exampleImageHidden} ${enlargeExample ? styles.exampleImage : ""}`} />

            <div className={`${styles.infoBar} ${isScrolled ? styles.hide : ""}`}>This page displays a list of my skill set</div>
            <div 
                onClick={() => {setShowSideBarMobile(true), playSound("blob")}}
                className={`${styles.skillMenuButton} ${!isScrolled || showSideBarMobile ? styles.hide : ""}`}>Ξ</div>
            <div 
                onClick={() => {setShowSideBarMobile(false), playSound("blob")}}
                className={`${styles.skillMenuButton} ${styles.closeButton} ${!isScrolled || !showSideBarMobile ? styles.hide : ""}`}>close</div>

        </>
    )
}