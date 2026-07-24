import { useEffect, useRef, useState } from "react"
import inputStyles from "../NewEntry.module.css"
import styles from "./Date.module.css"
import { CommonValidation } from "@/app/data/validation/inputValidation"

type Props = {
    heading: string,
    preSetDate: string,
    setDate: (value: string, validation: string) => void
}

export default function Date({ heading, preSetDate, setDate }: Props) {

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [validation, setValidation] = useState(CommonValidation.dateInvalidFormat);

    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun === true && preSetDate !== "") {
        const existingDate = preSetDate.split("-");
        setYear(existingDate[0]);
        setMonth(existingDate[1]);
        setDay(existingDate[2]);
        setValidation("");
        setOneTimeRun(false);
    }

    const handleNameInput = (input: string, value: string) => {
        if (input === "day") {
            setDay(value);
            if (Number(value) <= 0 || Number(value) > 31 || !/^\d+$/.test(value)) {
                setValidation(CommonValidation.dateInvalidFormat);
            } else {
                setValidation("");
            }
        }
        if (input === "month") {
            setMonth(value);
            if (Number(value) <= 0 || Number(value) > 12 || !/^\d+$/.test(value)) {
                setValidation(CommonValidation.dateInvalidFormat);
            } else {
                setValidation("");
            }
        }
        if (input === "year") {
            setYear(value);
            if (Number(value) < 999 || Number(value) > 9999 || !/^\d+$/.test(value)) {
                setValidation(CommonValidation.dateInvalidFormat);
            } else {
                setValidation("");
            }
        }
    };

    useEffect(() => {

        const formattedDay = day.padStart(2, "0");
        const formattedMonth = month.padStart(2, "0");

        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

        setDate(formattedDate, validation)
        console.log(formattedDate, validation)
    }, [year, month, day])

    return (
        <>
            <div className={`${styles.container}`}>
                <input
                    className={`${inputStyles.input} ${styles.day}`}
                    value={day}
                    onChange={(e) => handleNameInput("day", e.target.value)}
                    placeholder="day"
                />
                <input
                    className={`${inputStyles.input} ${styles.month}`}
                    value={month}
                    onChange={(e) => handleNameInput("month", e.target.value)}
                    placeholder="month"
                />
                <input
                    className={`${inputStyles.input} ${styles.year}`}
                    value={year}
                    onChange={(e) => handleNameInput("year", e.target.value)}
                    placeholder="year"
                />
                <div className={`${styles.heading} ${validation === "" ? styles.headingExpand : ""}`}>{heading}</div>
                <div className={`${inputStyles.inputTick} ${inputStyles.inputTickDate} ${validation === "" ? "" : inputStyles.inputTickHide}`}>
                    ✓
                </div>
            </div>

            <div className={`${validation === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : inputStyles.validation}`}>{validation}</div>

        </>
    )
}