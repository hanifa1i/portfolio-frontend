import { playSound, playSoundAt } from "@/app/lib/SoundManager"
import styles from "../NewEntry.module.css"

type Props = {
    inputType: string
    value: string
    required: boolean
    validationMessage: string
    handleValidation: (input: string, value: string) => void
 }

export default function Input({ inputType, value, required, validationMessage, handleValidation }: Props) {
    return (
        <>
            <div className="flex">
                <input
                    className={`${styles.input}`}
                    value={value}
                    onMouseEnter={() => playSoundAt("hover", 0.5)}
                    onClick={() => playSoundAt("click", 0.5)}
                    onChange={(e) => handleValidation(inputType, e.target.value)} 
                    placeholder={`${required ? "required -" : "optional -"} ${inputType}`}
                />
                <div className={`${styles.inputTick} ${validationMessage === "" ? "" : styles.inputTickHide}`}>
                    ✓
                </div>
            </div>

            <div className={`${validationMessage === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>{validationMessage}</div>
        </>
    )
}
export function InputLarge({ inputType, value, required, validationMessage, handleValidation }: Props) {
    return (
        <>
            <div className="flex">
                <textarea 
                    className={`${styles.input} ${styles.textArea}`}
                    value={value}
                    onChange={(e) => handleValidation(inputType, e.target.value)} 
                    placeholder={`${required ? "required -" : "optional -"} ${inputType}`}
                />
                <div className={`${styles.inputTick} ${validationMessage === "" ? "" : styles.inputTickHide}`}>
                    ✓
                </div>
            </div>

            <div className={`${validationMessage === "" ? `${styles.hide} ${styles.hideValidation}` : styles.validation}`}>{validationMessage}</div>
        </>
    )
}