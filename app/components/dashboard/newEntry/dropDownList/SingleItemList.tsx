import { useEffect, useState } from "react"
import styles from "./DropDownList.module.css"
import inputStyles from "../NewEntry.module.css"
import { it } from "node:test";

type Props = {
    heading: string;
    validationMessage: string;
    values: string[];
    selectedValue: (value: string) => void;
    index: number;
    method: (index: number, day: string) => void;
    required: boolean;
    preSetValue: string;
}

export default function SingleItemList({ heading, validationMessage, values, selectedValue, index, method, required, preSetValue}: Props) {

    const [openList, setOpenList] = useState(false);
    const [selected, setSelected] = useState<string>('select ' + heading);
    const [item, setItem] = useState("");
    const [validation, setValidation] = useState(validationMessage);

    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun && preSetValue !== "" ) {
        setItem(preSetValue);
        setOneTimeRun(false);
    }

    const addItem = (item: string) => {
        setItem(item);
        if (index !== -1) {
            method(index, item);
        }
    };
    const removeItem = () => {
        setItem("");
        if (index !== -1) {
            method(index, "");
        }
    };

    useEffect(() => {
        selectedValue(item);
        if (required && item === "") setValidation(validationMessage)
        else if (required && item !== "") setValidation("")
    }, [item])

    return (
        <>
            <div className="flex">
                <div onClick={() => setOpenList(true)} className={`${styles.input} ${styles.removeMargin} ${openList ? styles.openList : ""} ${validation === "" ? styles.expandInput : ""}`}>
                    {selected}
                    <div onClick={(e) => { e.stopPropagation(); removeItem() }} className={`${item === "" ? "" : styles.value}`}>
                        {item}
                    </div>

                    <div className={`${styles.list} ${styles.block}`}>
                        <button
                            onClick={(e) => { if (openList) { e.stopPropagation(); setOpenList(false) } }}
                            className={`${styles.arrow} ${openList ? styles.rotateArrow : ""}`}>
                            ❯
                        </button>

                        {values.map((item, key) => (
                            <button
                                key={key}
                                onClick={(e) => { e.stopPropagation(); setSelected(heading + `: `); addItem(item); setOpenList(false) }}
                                className={`${styles.value} ${openList ? "" : styles.hide}`}>{item}</button>
                        ))}
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
type PropsNoArray = {
    heading: string;
    validationMessage: string;
    values: string[];
    selectedValue: (value: string) => void;
    method: (value: string) => void;
    required: boolean;
    preSetValue: string;
}
export function SingleItemListNoArray({ heading, validationMessage, values, selectedValue, method, required, preSetValue}: PropsNoArray) {

    const [openList, setOpenList] = useState(false);
    const [selected, setSelected] = useState<string>('select ' + heading);
    const [item, setItem] = useState("");
    const [validation, setValidation] = useState(validationMessage);

    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun && preSetValue !== "" ) {
        setItem(preSetValue);
        setOneTimeRun(false);
    }
    const addItem = (item: string) => {
        setItem(item);{
            method(item);
        }
    };
    const removeItem = () => {
        setItem("");
        method("");
    };

    useEffect(() => {
        selectedValue(item);
        if (required && item === "") setValidation(validationMessage)
        else if (required && item !== "") setValidation("")
    }, [item])

    return (
        <>
            <div className="flex">
                <div onClick={() => setOpenList(true)} className={`${styles.input} ${openList ? styles.openList : ""} ${validation === "" ? styles.expandInput : ""}`}>
                    {selected}
                    <div onClick={(e) => { e.stopPropagation(); removeItem() }} className={`${item === "" ? "" : styles.value}`}>
                        {item}
                    </div>

                    <div className={`${styles.list} ${styles.block}`}>
                        <button
                            onClick={(e) => { if (openList) { e.stopPropagation(); setOpenList(false) } }}
                            className={`${styles.arrow} ${openList ? styles.rotateArrow : ""}`}>
                            ❯
                        </button>

                        {values.map((item, key) => (
                            <button
                                key={key}
                                onClick={(e) => { e.stopPropagation(); setSelected(heading + `: `); addItem(item); setOpenList(false) }}
                                className={`${styles.value} ${openList ? "" : styles.hide}`}>{item}</button>
                        ))}
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