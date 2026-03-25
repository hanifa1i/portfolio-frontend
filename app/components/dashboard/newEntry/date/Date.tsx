import { useEffect, useState } from "react"
import inputStyles from "../NewEntry.module.css"
import styles from "./Date.module.css"

type Props = {
    heading: string,
    setDate: (value: string) => void
}

export default function Date({ heading, setDate }: Props) {

    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [dateError, setDateError] = useState("");

    const handleNameInput = (input: string, value: number, valueAsString: string) => {
        if (input === "day") {
            setDay(value);
            if (value < 0 || value > 31 || !/^\d+$/.test(valueAsString)) {
                setDateError("date must be in format - 00 00 0000     |     day - 01-31  |  month - 01-12  |  year - 4 digits");
            } else {
                setDateError("");
            }
        }
        if (input === "month") {
            setMonth(value);
            if (value < 0 || value > 12 || !/^\d+$/.test(valueAsString)) {
                setDateError("date must be in format - 00 00 0000     |     day - 01-31  |  month - 01-12  |  year - 4 digits");
            } else {
                setDateError("");
            }
        }
        if (input === "year") {
            setYear(value);
            if (value < 999 || value > 9999 || !/^\d+$/.test(valueAsString)) {
                setDateError("date must be in format - 00 00 0000     |     day - 01-31  |  month - 01-12  |  year - 4 digits");
            } else {
                setDateError("");
            }
        }


    };

    useEffect(() => {
        if (day < 10 || month < 10)
            setDate(year + '-0' + month + '-0' + day)
        else
            setDate(year + '-' + month + '-' + day)
        
        console.log(year + '-' + month + '-' + day)
    }, [year, month, day])

    return (
        <>
            <div className={`${styles.container}`}>
                <input
                    className={`${inputStyles.input} ${styles.day}`}
                    onChange={(e) => handleNameInput("day", Number(e.target.value), e.target.value)}
                    placeholder="day"
                />
                <input
                    className={`${inputStyles.input} ${styles.month}`}
                    onChange={(e) => handleNameInput("month", Number(e.target.value), e.target.value)}
                    placeholder="month"
                />
                <input
                    className={`${inputStyles.input} ${styles.year}`}
                    onChange={(e) => handleNameInput("year", Number(e.target.value), e.target.value)}
                    placeholder="year"
                />
                <div className={`${styles.heading}`}>{heading}</div>


            </div>
            <div className={`${dateError === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : inputStyles.validation}`}>ⓘ   {dateError}</div>

        </>
    )
}