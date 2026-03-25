"use client"
import { useEffect, useState } from "react"
import styles from "./dashboard.module.css"
import type { Section, Artwork, Sketchbook, Skill, Qualification, ArtworkResponse } from "@/app/types/dashboard";
import { sections } from "@/app/data/dashboard/sections";
import { artworkFields } from "./fields/artworkFields";
import { sketchbookFields } from "./fields/SketchbookFields";
import { skillFields } from "./fields/SkillsFields";
import { qualificationFields } from "./fields/QualificationFields";

import SketchbookPages from "./sketchbookPages/SketchbookPages";
import DataTable from "./table/DataTable";
import EditArtworkCard from "./editCard/EditArtworkCard";
import EditSketchbookCard from "./editCard/EditSketchbookCard";
import EditSkillCard from "./editCard/EditSkillCard";

import { artworks } from "@/app/data/dashboard/Artworks";
import { sketchbooks } from "@/app/data/dashboard/Sketchbooks";
import { skills } from "@/app/data/dashboard/Skills";
import { qualifications } from "@/app/data/dashboard/Qualifications";
import { playSound } from "@/app/lib/SoundManager";
import NewArtworkEntry from "./newEntry/NewArtworkEntry";
import NewSketchbookEntry from "./newEntry/NewSketchEntry";
import NewSkillEntry from "./newEntry/NewSkillEntry";
import NewQualificationEntry from "./newEntry/NewQualificationEntry";
import { getArtwork } from "@/app/services/artworkService";

import { artworkResponseFields } from "./fields/ArtworkResponseFields";


export default function dashboard() {
    const [state, setState] = useState<string>("");
    const [newEntry, setNewEntry] = useState<string>("");
    const [getData, setGetData] = useState(true);



    const [artworkData, setArtworkData] = useState<ArtworkResponse[]>([]);

    useEffect(() => {
        if (state === "list" && getData) {
            const fetch = async () => {
                try {
                    const data = await getArtwork();
                    setArtworkData(data);
                    console.log("Received", data);
                    setGetData(false);
                } catch (error) {
                    console.error(error);
                }
            };

            fetch();
        }
    }, [state, getData]);

    type EditableItem =
        | ArtworkResponse
        | Artwork
        | Sketchbook
        | Skill
        | Qualification;

    const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
    const handleEdit = (item: EditableItem) => {
        setEditingItem(item);
    };
    const handleSwitch = (section: string) => {
        setState(section);
    }


    const [activeTable, setActiveTable] = useState<string | null>(null);

    //const [artworksList, setArtworksList] = useState<Artwork[]>(artworks);

    return (
        <>
            <div className={`${styles.dashboardDivider} ${state === "new" ? styles.dashboardDividerForNewEntry : ""}`}>
                <div className={`${styles.section} ${styles.listContainer}
                    ${state === "list" ? styles.open : styles.close}`}>

                    {activeTable === "artwork" && (
                        <DataTable fields={artworkResponseFields} data={artworkData} onRowClick={handleEdit} />
                    )}
                    {activeTable === "artworkRes" && (
                        <DataTable fields={artworkFields} data={artworks} onRowClick={handleEdit} />
                    )}

                    {activeTable === "sketchbooks" && (
                        <DataTable fields={sketchbookFields} data={sketchbooks} renderExpandedRow={(sketchbook) => (
                            <SketchbookPages pages={sketchbook.pages} />
                        )} onRowClick={handleEdit} />
                    )}

                    {activeTable === "skills" && (
                        <DataTable fields={skillFields} data={skills} onRowClick={handleEdit} />
                    )}

                    {activeTable === "qualifications" && (
                        <DataTable fields={qualificationFields} data={qualifications} onRowClick={handleEdit} />
                    )}

                </div>

                <div className={`${styles.section} ${styles.buttonContainer} ${state === "new" ? styles.hideButtons : ""}`}>
                    {/*<div className={`${styles.profileButtons}`}>
                        <div onClick={() => { setState(""), setActiveTable(null) }} className={`${styles.button} ${state === "list" || state === "new" ? styles.shrinkButton : ""}`}></div>
                        <div className={`${styles.button} ${state === "list" || state === "new" ? styles.shrinkButton : ""}`}></div>
                    </div>*/}

                    <div className={`${styles.statButtons}`}>

                        <div onClick={() => { setState(""), setActiveTable(null) }} className={`${styles.exitButton} ${state === "list" ? "" : styles.hide}`}>✕</div>
                        {sections.map((section, key) => (
                            <div key={key} className={`${styles.statButtonContainer} `}>
                                <div onMouseEnter={() => playSound("hover")} onClick={() => { playSound("click"), setState("list"), setActiveTable(section.label) }}
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


                <div className={`${styles.section} ${styles.addNewContainer}
                    ${state === "new" ? styles.openNew : styles.close}`}>
                    {newEntry === "artwork" && (
                        <NewArtworkEntry section={state} switchSection={handleSwitch} />
                    )}
                    {newEntry === "sketchbooks" && (
                        <NewSketchbookEntry section={state} switchSection={handleSwitch} />
                    )}
                    {newEntry === "skills" && (
                        <NewSkillEntry section={state} switchSection={handleSwitch} />
                    )}
                    {newEntry === "qualifications" && (
                        <NewQualificationEntry section={state} switchSection={handleSwitch} />
                    )}
                </div>
            </div>

            <div
                className={`${editingItem !== null ? styles.tint : ""}`}
                onClick={() => { playSound("whosh"), setEditingItem(null) }} />
            <div
                className={`${styles.editCardHidden} ${editingItem !== null ? styles.editCard : ""}`}>

                {activeTable === "artwork" && editingItem !== null && (
                    <EditArtworkCard
                        artwork={editingItem as Artwork}
                        onClose={() => setEditingItem(null)}
                    />
                )}

                {activeTable === "sketchbook" && editingItem !== null && (
                    <EditSketchbookCard
                        sketchbook={editingItem as Sketchbook}
                        onClose={() => setEditingItem(null)}
                    />
                )}
                {activeTable === "skills" && editingItem !== null && (
                    <EditSkillCard
                        skill={editingItem as Skill}
                        onClose={() => setEditingItem(null)}
                    />
                )}
            </div>

        </>
    )
}