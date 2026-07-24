import { playSound } from "@/app/lib/SoundManager"
import styles from "./Toggle.module.css"
import { useState } from "react";

type ToggleProps = {
    checked?: boolean;
    onChange: () => void;
    disabled?: boolean;
};

export default function Toggle({ checked = false, onChange, disabled = false }: ToggleProps) {

    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        if (toggle === true) { setToggle(false); }
        else if (toggle === false) { setToggle(true); }
    }
    const handleClick = () => {
        if (disabled) return;

        playSound("click");
        onChange();
    };

    return (
        <>
            <div 
                onMouseEnter={() => playSound("hover")} 
                onClick={handleClick}
                className={` ${styles.tableEditToggle} ${checked ? styles.tableEditToggleTrue : ""} ${disabled ? styles.disabled : ""}`}>

                <div className={`${styles.toggleButton} ${checked ? styles.toggleTrue : ""}`}></div>

            </div>
        </>
    )
}