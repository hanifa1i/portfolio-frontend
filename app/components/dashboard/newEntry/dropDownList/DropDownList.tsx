import { useEffect, useState } from "react"
import styles from "./DropDownList.module.css"
import inputStyles from "../NewEntry.module.css"

type Props = {
    heading: string;
    validationMessage: string;
    values: string[];
    onChange: (value: string[]) => void;
    required: boolean;
    preSetValues: string[];
}

export default function DropDownList({ heading, validationMessage, values, onChange, required, preSetValues }: Props) {

    const [openList, setOpenList] = useState(false);
    const [selected, setSelected] = useState<string>(`select ` + heading);
    const [items, setItems] = useState<string[]>([]);
    const [validation, setValidation] = useState(validationMessage);

    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun && preSetValues.length !== 0) {
        setItems(preSetValues);
        setOneTimeRun(false);
    }

    const addItem = (item: string) => {
        setItems(prevItems => [...prevItems, item]);
    };
    const removeItem = (indexToRemove: number) => {
        setItems(prev =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    useEffect(() => {
        onChange(items);
        if (required && items.length === 0) setValidation(validationMessage)
        else if (required && items.length !== 0) setValidation("")
    }, [items])

    return (
        <>
            <div className="flex">
                <div onClick={() => setOpenList(true)} className={`${styles.input} ${openList ? styles.openList : ""} ${validation === "" ? styles.expandInput : ""}  `}>
                    {selected}
                    {items.map((item, key) => (
                        <div
                            key={key}
                            onClick={(e) => { e.stopPropagation(); removeItem(key) }}
                            className={`${styles.value}`}>{item}</div>
                    ))}
                    <div className={`${styles.list}`}>
                        <button
                            onClick={(e) => { if (openList) { e.stopPropagation(); setOpenList(false) } }}
                            className={`${styles.arrow} ${openList ? styles.rotateArrow : ""}`}>
                            ❯
                        </button>

                        <div className={`${openList ? styles.valuesContainer : ""}`}>
                        {values.map((item, key) => (
                            <button
                                key={key}
                                onClick={(e) => { e.stopPropagation(); setSelected(heading + `: `); addItem(item); setOpenList(false) }}
                                className={`${styles.value} ${openList ? "" : styles.hide}`}>{item}</button>
                        ))}
                        </div>
                    </div>

                </div>
                <div className={`${inputStyles.inputTick} ${openList || validation !== "" ? inputStyles.inputTickHide : ""}`}>
                    ✓
                </div>
            </div>
            {required && (
                <div className={`${validation === "" ? `${inputStyles.hide} ${inputStyles.hideValidation}` : inputStyles.validation}`}>{validation}</div>
            )}

        </>
    )
}