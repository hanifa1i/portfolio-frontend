import { useEffect, useState } from "react"
import inputStyles from "../NewEntry.module.css"
import styles from "./AddLinks.module.css"

type Props = {
    linkNames: (value: string[]) => void
    links: (value: string[]) => void
}

export default function AddLinks({ linkNames, links }: Props) {

    const [linkInputs, setLinkInputs] = useState(0);
    const [currentLinkNames, setCurrentLinkNames] = useState<string[]>([]);
    const [currentLinks, setCurrentLinks] = useState<string[]>([]);

    const handleNameInput = (index: number, value: string) => {
        setCurrentLinkNames(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
        console.log(currentLinkNames);
    };

    const handleLinkInput = (index: number, value: string) => {
        setCurrentLinks(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
        console.log(currentLinks);
    };

    const addInput = () => {
        setLinkInputs(prev => prev + 1);
        setCurrentLinkNames(prev => [...prev, ""]);
        setCurrentLinks(prev => [...prev, ""]);
    };

    const removeInput = () => {
        if (linkInputs <= 1) return;

        setLinkInputs(prev => prev - 1);
        setCurrentLinkNames(prev => prev.slice(0, -1));
        setCurrentLinks(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        linkNames(currentLinkNames);
        links(currentLinks);
    }, [currentLinkNames, currentLinks]);

    return (
        <>
            {Array.from({ length: linkInputs }).map((_, key) => (
                <div key={key} className="flex">
                    <input
                        className={`${inputStyles.input} ${styles.linkName}`}
                        value={currentLinkNames[key] || ""}
                        onChange={(e) => handleNameInput(key, e.target.value)}
                        placeholder="add link name"
                    />
                    <input
                        className={`${inputStyles.input} ${styles.linkAddress}`}
                        value={currentLinks[key] || ""}
                        onChange={(e) => handleLinkInput(key, e.target.value)}
                        placeholder="add link address"
                    />
                </div>
            ))}
            <div className={`${styles.container}`}>
                <button className={styles.add} onClick={addInput}>+ link example</button>
                <button className={styles.add} onClick={removeInput}>-</button>
            </div>
        </>
    )
}