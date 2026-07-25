"use client"
import { useEffect, useState } from "react"
import styles from "./Dashboard.module.css"
import { type Section, 
    type Artwork, 
    type Sketchbook, type ArtworkResponse, SkillResponse, QualificationResponse, WorkExperienceResponse } from "@/app/types/Dashboard";
import { sections } from "@/app/data/dashboard/sections";
import { ArtworkFields } from "./fields/ArtworkFields";
import { SketchbookFields } from "./fields/SketchbookFields";
import { skillFields } from "./fields/SkillsFields";
import { qualificationFields } from "./fields/QualificationFields";

import SketchbookPages from "./sketchbookPages/SketchbookPages";
import DataTable from "./table/DataTable";


import { sketchbooks } from "@/app/data/dashboard/Sketchbooks";
import { skills } from "@/app/data/dashboard/Skills";
import { playSound } from "@/app/lib/SoundManager";
import NewArtworkEntry from "./newEntry/NewArtworkEntry";
import NewSketchbookEntry from "./newEntry/NewSketchEntry";
import NewSkillEntry from "./newEntry/NewSkillEntry";
import NewQualificationEntry from "./newEntry/NewQualificationEntry";
import NewExperienceEntry from "./newEntry/NewExperienceEntry";

import { getArtwork, getSketchbookArt, getStandaloneArt } from "@/app/services/artworkService";

import { artworkResponseFields } from "./fields/ArtworkResponseFields";
import { getSkills } from "@/app/services/SkillService";
import { getQualifications } from "@/app/services/QualificationService";
import { experienceFields } from "./fields/ExperienceFields";
import { getExperience } from "@/app/services/ExperienceService";
import RecentActivites from "./modules/recentActivities/RecentActivites";
import EntryCount from "./modules/entryCount/EntryCount";
import ProfileEditor from "./modules/profileEditor/ProfileEditor";
import Settings from "./modules/settings/Settings";
import useScrollReveal from "@/app/hooks/useScrollReveal";



export default function Dashboard() {

    useScrollReveal(".offscreenLeft", "easeIn", true);
    useScrollReveal(".offscreenUp", "easeIn", true);
    useScrollReveal(".offscreenRight", "easeIn", true);


    const [state, setState] = useState<string>("");
    const [newEntry, setNewEntry] = useState<string>("");
    const [getData, setGetData] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [existingId, setExistingId] = useState(0);
    const [activeTable, setActiveTable] = useState<string | null>(null);

    const handleToggle = () => {
        if (toggle === true) { setToggle(false); }
        else if (toggle === false) { setToggle(true); }
    }



    const [artworkData, setArtworkData] = useState<ArtworkResponse[]>([]);
    const [sketchbookData, setSketchbookData] = useState<ArtworkResponse[]>([]);

    const [skillData, setSkillData] = useState<SkillResponse[]>([]);
    const [qualificationData, setQualificationData] = useState<QualificationResponse[]>([]);
    const [experienceData, setExperienceData] = useState<WorkExperienceResponse[]>([]);


    useEffect(() => {
        if (activeTable === "artwork" && state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getStandaloneArt();
                    setArtworkData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }
        if (activeTable === "sketchbooks" && state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getSketchbookArt();
                    setSketchbookData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }
        if (activeTable === "skills" && state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getSkills();
                    setSkillData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }
        if (activeTable === "qualifications" && state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getQualifications();
                    setQualificationData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }
        if (activeTable === "experience" && state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getExperience();
                    setExperienceData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }

        if (state !== "list") {
            setActiveTable(null);
        }
    }, [state, getData]);

    const handleSwitch = (section: string) => {
        setState(section);
    }



    return (
        <>
            <div className={`${styles.dashboardDivider} ${state === "new" || state === "list" ? styles.dashboardDividerForNewEntryList : ""}`}>
                <div className={`${styles.section} ${styles.listContainer}
                    ${state === "list" ? styles.open : styles.close}`}>

                    {activeTable === "artwork" && (
                        <DataTable fields={artworkResponseFields} data={artworkData} editToggle={toggle} type={activeTable} setState={setState} setNewEntry={setNewEntry} setExistingId={setExistingId} />
                    )}
                    {activeTable === "sketchbooks" && (
                        <DataTable fields={SketchbookFields} data={sketchbookData} editToggle={toggle} type={activeTable} setState={setState} setNewEntry={setNewEntry} setExistingId={setExistingId} />
                    )}

                    {activeTable === "skills" && (
                        <DataTable fields={skillFields} data={skillData} editToggle={toggle} type={activeTable} setState={setState} setNewEntry={setNewEntry} setExistingId={setExistingId} />
                    )}

                    {activeTable === "qualifications" && (
                        <DataTable fields={qualificationFields} data={qualificationData} editToggle={toggle} type={activeTable} setState={setState} setNewEntry={setNewEntry} setExistingId={setExistingId} />
                    )}

                    {activeTable === "experience" && (
                        <DataTable fields={experienceFields} data={experienceData} editToggle={toggle} type={activeTable} setState={setState} setNewEntry={setNewEntry} setExistingId={setExistingId} />
                    )}

                </div>

                <div className={`${styles.section} ${styles.buttonContainer} ${state === "new" ? styles.hideButtons : ""}`}>
                    <div className={`${styles.heading} ${state === "" ? "" : styles.hide}`}>Dashboard</div>

                    <div className={`${styles.dashboardContainer}`}>
                        <div className={`${styles.recentActivites} ${state === "" ? "" : styles.hide} offscreenLeft`}>{state === "" && (<RecentActivites />)}</div>
                        <div className={`${styles.entryCount} ${state === "" ? "" : styles.hide} offscreenUp`}>{state === "" && (<EntryCount />)}</div>
                        <div className={`${styles.dashboardModules} ${state === "" ? "" : styles.hide} offscreenUp`}><ProfileEditor /></div>

                        <div className={`${styles.statButtons} offscreenRight`}>
                            {state === "" && (<Settings />)}

                            {state === "list" && (<div className={`${styles.toggleContainer}`}>
                                <div onMouseEnter={() => playSound("hover")} onClick={() => { playSound("click"), handleToggle() }}
                                    className={` ${styles.tableEditToggle} ${toggle ? styles.tableEditToggleTrue : ""} ${state !== "list" ? styles.toggleHide : ""}`}>
                                    <div className={`${styles.toggleButton} ${toggle ? styles.toggleTrue : ""}`}></div>
                                </div>
                            </div>)}
                            <div onClick={() => { setState(""), setActiveTable(null) }} className={`${styles.exitButton} ${state === "list" ? "" : styles.hide}`}>✕</div>
                            <div className={`${styles.buttons}`}>
                                {sections.map((section, key) => (
                                    <div key={key} className={`${styles.statButtonContainer}`}>
                                        <div onMouseEnter={() => playSound("hover")} onClick={() => { playSound("click"), setState("list"), setActiveTable(section.label), setGetData(true) }}
                                            className={`
                                                ${styles.button} ${state === "list" || state === "new" ? styles.shrinkButton : ""}
                                                ${activeTable === section.label ? styles.selectedButton : ""}
                                    `}>
                                            <img className={`${styles.buttonIcon} ${activeTable === section.label ? styles.selectedButtonIcon : ""}`} src={section.image} />
                                            {!(state === "list") && (section.label)}
                                            {!(state === "list") && (<div onClick={(e) => { e.stopPropagation(); setState("new"); playSound("blob"); setNewEntry(section.label) }} className={`${styles.addButton}`}>+</div>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`${styles.section} ${styles.addNewContainer}
                    ${state === "new" ? styles.openNew : styles.close}`}>
                    {newEntry === "artwork" && (
                        <NewArtworkEntry section={state} switchSection={handleSwitch} setNewEntry={setNewEntry} existingId={existingId} setExistingId={setExistingId} />
                    )}
                    {newEntry === "sketchbooks" && (
                        <NewSketchbookEntry section={state} switchSection={handleSwitch} setNewEntry={setNewEntry} existingId={existingId} setExistingId={setExistingId} />
                    )}
                    {newEntry === "skills" && (
                        <NewSkillEntry section={state} switchSection={handleSwitch} setNewEntry={setNewEntry} existingId={existingId} setExistingId={setExistingId} />
                    )}
                    {newEntry === "qualifications" && (
                        <NewQualificationEntry section={state} switchSection={handleSwitch} setNewEntry={setNewEntry} existingId={existingId} setExistingId={setExistingId} />
                    )}
                    {newEntry === "experience" && (
                        <NewExperienceEntry section={state} switchSection={handleSwitch} setNewEntry={setNewEntry} existingId={existingId} setExistingId={setExistingId} />
                    )}
                </div>
            </div>


        </>
    )
}