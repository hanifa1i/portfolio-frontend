import { useEffect, useState } from "react"
import styles from "./DropDownList.module.css"

type Props = {
    values : string[];
    onChange: (value: string[]) => void
}

export default function DropDownList({values, onChange} : Props) {

    const [openList, setOpenList] = useState(false);
    const [selected, setSelected] = useState<string>("select tags");
    const [items, setItems] = useState([]);
    
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
    }, [items])

    return (

        <div onClick={() => setOpenList(true)} className={`${styles.input} ${openList ? styles.openList : ""}`}>
            {selected}
            {items.map((item, key) => (
                <div
                    key={key}
                    onClick={(e) => { e.stopPropagation(); removeItem(key)}}
                    className={`${styles.value}`}>{item}</div>
            ))}
            <div className={`${styles.list}`}>
                <button
                    onClick={(e) => { if (openList) { e.stopPropagation(); setOpenList(false) } }}
                    className={`${styles.arrow} ${openList ? styles.rotateArrow : ""}`}>
                    ❯
                </button>

                {values.map((item, key) => (
                    <button
                        key={key}
                        onClick={(e) => { e.stopPropagation(); setSelected("tags:"); addItem(item); setOpenList(false) }}
                        className={`${styles.value} ${openList ? "" : styles.hide}`}>{item}</button>
                ))}
            </div>
        </div>
    )
}