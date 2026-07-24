import { useEffect, useRef, useState } from "react"
import inputStyles from "../NewEntry.module.css"
import styles from "./Project.module.css"
import { WorkProject } from "@/app/types/FormPayload"
import Input from "../input/Input"

type Props = {
    data: WorkProject[]
    setData: (value: WorkProject[]) => void
    setValidationIssue: (value: WorkProject[]) => void
}
export default function Project({ data, setData, setValidationIssue }: Props) {

    const [numberOfProjects, setNumberOfProjects] = useState(data.length);
    const [projects, setProjects] = useState<WorkProject[]>(data);
    const [validation, setValidation] = useState<WorkProject[]>([]);

    const hasInitialised = useRef(false);

    useEffect(() => {
        if (!hasInitialised.current) {
            setProjects(data);
            setNumberOfProjects(data.length);
            setValidation(data.map(() => ({
                title: "",
                description: ""
            })));
            if (projects.length > 0) {
                hasInitialised.current = true;
            }
        }
        console.log("validation", validation)
    }, [data]);

    const handleTitleInput = (index: number, value: string) => {

        if (value.length < 1) {
            validation[index].title = "title must be added (30)";
        } else if (value.length > 30) {
            validation[index].title = "title must be below 30 characters";
        } else {
            validation[index].title = "";
        }
        setProjects(prev => {
            const updated = [...prev];
            updated[index].title = value;
            return updated;
        });
    };

    const handleDescriptionInput = (index: number, value: string) => {
        if (value.length < 1) {
            validation[index].description = "a description must be added (700)";
        } else if (value.length > 700) {
            validation[index].description = "description must be below 700 characters";
        } else {
            validation[index].description = "";
        }
        setProjects(prev => {
            const updated = [...prev];
            updated[index].description = value;
            return updated;
        });
        console.log(projects);
        console.log(validation);
    };

    const addInput = () => {

        setNumberOfProjects(prev => prev + 1);
        setProjects(prev => [...prev, { title: "", description: "" }]);
        setValidation(prev => [...prev, { title: "title must be added (30)", description: "a description must be added (700)" }]);
    };

    const removeInput = () => {
        if (numberOfProjects <= 0) return;

        setNumberOfProjects(prev => prev - 1);
        setProjects(prev => prev.slice(0, -1));
        setValidation(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        setData(projects);
        setValidationIssue(validation);
    }, [projects])

    return (
        <div className={`${styles.projectWrapper}`}>
            <div className={`${styles.projects}`}>
                <div className={`${styles.spacer}`}></div>
                {Array.from({ length: numberOfProjects }).map((_, key) => (
                    <div key={key} className={`${styles.projectContainer}`}>
                        <div className={styles.projectHeading}>project {key + 1}</div>
                        <div className="flex">
                            <input
                                className={`${inputStyles.input} ${styles.projectInput}`}
                                value={projects[key].title || ""}
                                onChange={(e) => handleTitleInput(key, e.target.value)}
                                placeholder="add project title"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].title === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={`${validation[key].title === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>ⓘ   {validation[key].title}</div>
                        <div className="flex">
                            <textarea
                                className={`${inputStyles.input} ${inputStyles.textArea} ${styles.projectInput}`}
                                value={projects[key].description || ""}
                                onChange={(e) => handleDescriptionInput(key, e.target.value)}
                                placeholder="add project description"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].description === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={`${validation[key].description === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>ⓘ   {validation[key].description}</div>
                    </div>
                ))}
                <div className={`${styles.spacer}`}></div>

            </div>

            <div className={`${styles.container}`}>
                <button className={styles.add} onClick={addInput}>+ project</button>
                <button className={styles.add} onClick={removeInput}>-</button>
            </div>
        </div>
    )
}