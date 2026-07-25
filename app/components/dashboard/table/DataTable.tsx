"use client";

import { useState } from "react";
import type { Field } from "@/app/types/Field";
import styles from "./DataTable.module.css";
import { playSound } from "@/app/lib/SoundManager";
import { deleteArtwork } from "@/app/services/artworkService";
import { deleteSkill } from "@/app/services/SkillService";
import { deleteQualification } from "@/app/services/QualificationService";
import { deleteExperience } from "@/app/services/ExperienceService";
import ExpandArtwork from "./expand/ExpandArtwork";
import { ArtworkResponse, QualificationResponse, SkillResponse, WorkExperienceResponse } from "@/app/types/Dashboard";
import ExpandSkill from "./expand/ExpandSkill";
import ExpandQualification from "./expand/ExpandQualification";
import ExpandExpereince from "./expand/ExpandExperience";
import ExpandSketchbook from "./expand/ExpandSketchbook";

type Props<T extends { id: number }> = {
  fields: Field<T>[];
  data: T[];
  editToggle: boolean
  type: string
  setState: (state: string) => void;
  setNewEntry: (entryType: string) => void;
  setExistingId: (id: number) => void
};

export default function DataTable<T extends { id: number }>({
  fields,
  data,
  editToggle,
  type,
  setState,
  setNewEntry,
  setExistingId,
}: Props<T>) {
  const template = fields.map(f => f.width ?? "1fr").join(" ");

  const handleEdit = (id: number) => {
    console.log(`editing ${type}: ${id}`);
    setState("new");
    setNewEntry(type);
    setExistingId(id);

  }

  const [confirmDelete, setConfirmDelete] = useState(0);
  const [removed, setRemoved] = useState<number[]>([]);

  const handleDelete = (id: number) => {
    console.log(`deleting ${type}: ${id}`)
    if (type === "artwork") { deleteArtwork(id); }
    if (type === "sketchbooks") { deleteArtwork(id); }
    if (type === "skills") { deleteSkill(id); }
    if (type === "qualifications") { deleteQualification(id); }
    if (type === "experience") { deleteExperience(id); }

    setRemoved(prev => [...prev, id])
  }

  const [expand, setExpand] = useState(0);
  const handleExpand = (id: number) => {
    if (expand === id) {
      setExpand(0);
    }
    else {
      setExpand(id);
    }

  }

  return (

    <div className={`${styles.table}`}>
      <div className={`flex`}>
        {/* Header */}
        <div className={`${styles.row} ${styles.heading}`} style={{ gridTemplateColumns: template }}>
          {fields.map(field => (
            <div key={String(field.key)} className={`${styles.cell} ${styles.cellHeading} `}>
              {field.label}
            </div>
          ))}

        </div>
        <div className={`${styles.customizeContainer} ${editToggle ? "" : styles.hideCustomizeContainer} `}>

        </div>
      </div>

      {/* Rows */}
      {data.map(row => (
        <div className={`flex ${removed.some(a => a === row.id) ? styles.hideRow : ""}`} key={row.id}>
          <div
            className={`${styles.row} ${expand === row.id ? styles.expand : ""}`}
            style={{ gridTemplateColumns: template }}
            onMouseEnter={() => playSound("hover")}
            onClick={() => { playSound("blob"), handleExpand(row.id) }
            }
          >
            {expand !== row.id && fields.map(field => (
              <div key={String(field.key)} className={styles.cell}>
                {field.render
                  ? field.render(row[field.key], row)
                  : String(row[field.key])}
              </div>
            ))}
            {expand === row.id && type === "artwork" && (
              <ExpandArtwork data={row as unknown as ArtworkResponse} />
            )}
            {expand === row.id && type === "sketchbooks" && (
              <ExpandSketchbook data={row as unknown as ArtworkResponse} />
            )}
            {expand === row.id && type === "skills" && (
              <ExpandSkill data={row as unknown as SkillResponse} />
            )}
            {expand === row.id && type === "qualifications" && (
              <ExpandQualification data={row as unknown as QualificationResponse} />
            )}
            {expand === row.id && type === "experience" && (
              <ExpandExpereince data={row as unknown as WorkExperienceResponse} />
            )}
          </div>



          <div onMouseLeave={() => setConfirmDelete(0)} className={`${styles.customizeContainer} ${editToggle ? "" : styles.hideCustomizeContainer} ${expand === row.id ? styles.changeToRow : ""} `}>
            <div onClick={() => handleEdit(row.id)} className={`${styles.customizeButton} ${styles.edit}`}><img src={`/images/dashboard/edit.svg`} /></div>
            <div onClick={() => setConfirmDelete(row.id)} className={`${styles.customizeButton} ${styles.bin}`}><img src={`/images/dashboard/trash-bin.png`} />
              <div onClick={() => handleDelete(row.id)} className={`${styles.confirmDelete} ${confirmDelete === row.id ? "" : styles.hide}`}>confirm</div>
            </div>
          </div>


        </div>
      ))}
    </div>
  );
}
