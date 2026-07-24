import { useEffect, useRef, useState } from "react"
import inputStyles from "../NewEntry.module.css"
import styles from "./Activity.module.css"
import { WorkActivity } from "@/app/types/FormPayload"
import SingleItemList from "../dropDownList/SingleItemList"
import { ActivityValidation } from "@/app/data/validation/inputValidation"

type Props = {
    data: WorkActivity[];
    setData: (value: WorkActivity[]) => void
    setValidationIssue: (value: WorkActivity[]) => void
}
export default function Activity({ data, setData, setValidationIssue }: Props) {

    const [numberOfActivity, setNumberOfActivity] = useState(data.length);
    const [activity, setActivity] = useState<WorkActivity[]>(data);
    const [validation, setValidation] = useState<WorkActivity[]>([]);
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    const [selectedDay, setSelectedDay] = useState<string>("");

    const hasInitialised = useRef(false);

    useEffect(() => {
        if (!hasInitialised.current) {
            setActivity(data);
            setNumberOfActivity(data.length);
            setValidation(data.map(() => ({
                activity: "",
                description: "",
                start_time: "",
                end_time: "",
                day: ""
            })));
            if (activity.length > 0) {
                hasInitialised.current = true;
            }
        }
    }, [data]);


    const handleActivityInput = (index: number, value: string) => {
        if (value.length < 1) {
            validation[index].activity = ActivityValidation.activityBlank;
        } else if (value.length > 30) {
            validation[index].activity = ActivityValidation.activityMaxLimit;
        } else {
            validation[index].activity = "";
        }
        setActivity(prev => {
            const updated = [...prev];
            updated[index].activity = value;
            return updated;
        });
    };

    const handleDescriptionInput = (index: number, value: string) => {
        if (value.length < 1) {
            validation[index].description = ActivityValidation.descriptionBlank;
        } else if (value.length > 200) {

            validation[index].description = ActivityValidation.descriptionMaxLimit;
        } else {
            validation[index].description = "";
        }
        setActivity(prev => {
            const updated = [...prev];
            updated[index].description = value;
            return updated;
        });

    };
    const handleStartTimeInput = (index: number, value: string) => {
        if (value === "") {
            validation[index].start_time = ActivityValidation.startTimeBlank
        } else if (!isValidTime(value)) {
            validation[index].start_time = ActivityValidation.invalidTime
        } else {
            validation[index].start_time = "";
        }
        setActivity(prev => {
            const updated = [...prev];
            updated[index].start_time = value;
            return updated;
        });

    };

    const handleEndTimeInput = (index: number, value: string) => {
        if (value === "") {
            validation[index].end_time = ActivityValidation.endTimeBlank
        } else if (!isValidTime(value)) {
            validation[index].end_time = ActivityValidation.invalidTime
        } else {
            validation[index].end_time = "";
        }
        setActivity(prev => {
            const updated = [...prev];
            updated[index].end_time = value;
            return updated;
        });
    };
    const handleDayInput = (index: number, value: string) => {
        if (value === "") {
            validation[index].day = ActivityValidation.dayBlank
        } else {
            validation[index].day = "";
        }
        setActivity(prev => {
            const updated = [...prev];
            updated[index].day = value;
            return updated;
        });
        console.log(activity);
        console.log(validation);

    };

    const isValidTime = (str: string) => {
        return /^(1[0-2]|[1-9])(am|pm)$/.test(str);
    };

    const addInput = () => {
        setNumberOfActivity(prev => prev + 1);
        setActivity(prev => [...prev, { activity: "", description: "", day: "", start_time: "", end_time: "" }]);
        setValidation(prev => [...prev, {
            activity: ActivityValidation.activityBlank,
            description: ActivityValidation.descriptionBlank,
            day: ActivityValidation.dayBlank,
            start_time: ActivityValidation.startTimeBlank,
            end_time: ActivityValidation.endTimeBlank
        }]);

    };

    const removeInput = () => {
        if (numberOfActivity <= 0) return;

        setNumberOfActivity(prev => prev - 1);
        setActivity(prev => prev.slice(0, -1));
        setValidation(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        setData(activity);
        setValidationIssue(validation);
    }, [activity])
    return (
        <div className={`${styles.activityWrapper}`}>
            <div className={`${styles.activities}`}>
                <div className={`${styles.spacer}`}></div>
                {Array.from({ length: numberOfActivity }).map((_, key) => (
                    <div key={key} className={`${styles.activityContainer}`}>
                        <div className={styles.activityHeading}>activity {key + 1}</div>
                        <div className="flex">
                            <input
                                className={`${inputStyles.input} ${styles.activityInput}`}
                                value={activity[key].activity || ""}
                                onChange={(e) => handleActivityInput(key, e.target.value)}
                                placeholder="add activity"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].activity === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={`${validation[key].activity === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>{validation[key].activity}</div>
                        <div className="flex">
                            <textarea
                                className={`${inputStyles.input} ${inputStyles.textArea} ${styles.activityInput}`}
                                value={activity[key].description || ""}
                                onChange={(e) => handleDescriptionInput(key, e.target.value)}
                                placeholder="add activity description"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].description === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={`${validation[key].description === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>{validation[key].description}</div>
                        <div className="flex">
                            <input
                                className={`${inputStyles.input} ${styles.activityInput}`}
                                value={activity[key].start_time || ""}
                                onChange={(e) => handleStartTimeInput(key, e.target.value)}
                                placeholder="required - start time"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].start_time === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={`${validation[key].start_time === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>{validation[key].start_time}</div>
                        <div className="flex">
                            <input
                                className={`${inputStyles.input} ${styles.activityInput}`}
                                value={activity[key].end_time || ""}
                                onChange={(e) => handleEndTimeInput(key, e.target.value)}
                                placeholder="required - end time"
                            />
                            <div className={`${inputStyles.inputTick} ${validation[key].end_time === "" ? "" : inputStyles.inputTickHide}`}>
                                ✓
                            </div>
                        </div>
                        <div className={` ${validation[key].end_time === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : `${inputStyles.validation} ${styles.validation}`}`}>{validation[key].end_time}</div>

                        <SingleItemList heading="day" validationMessage={ActivityValidation.dayBlank} values={days} selectedValue={setSelectedDay} index={key} method={handleDayInput} required preSetValue={activity[key].day}/>
                    </div>
                ))}
                <div className={`${styles.spacer}`}></div>

            </div>

            <div className={`${styles.container}`}>
                <button className={styles.add} onClick={addInput}>+ activity</button>
                <button className={styles.add} onClick={removeInput}>-</button>


            </div>
        </div>
    )
}