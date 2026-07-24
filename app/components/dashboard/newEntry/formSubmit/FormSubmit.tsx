import styles from "./FormSubmit.module.css"

type Props = {
    submitType: string
}

export default function FormSubmit({ submitType }: Props) {
    return (<>
        {
            submitType === "completed" && (
                <div className={`${styles.success}`}>✓</div>
            )
        }

        <div className={`${styles.error} ${submitType === "error" ? "" : styles.hide}`}>
            Invalid Input, make sure all validation with the symbol ⓘ are resolved
            <img className={`${styles.errorImage}`} src="/images/dashboard/validation-v2.png"></img>
        </div>
    </>
    )
}