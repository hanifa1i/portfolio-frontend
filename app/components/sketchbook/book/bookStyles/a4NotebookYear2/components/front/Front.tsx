import styles from "./Front.module.css"
 
type Props = {
    state : string;
}
export default function Front(){

    return (<>
        <div className={`${styles.coverStitching}`}>
            <div className={`${styles.button}`}></div>
        </div>
    </>)
}