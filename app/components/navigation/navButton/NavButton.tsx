import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import style from "./NavButton.module.css"

type ButtonProps = {
    label: string;
    icon: string;
    page: string
    isScrolled: boolean;
    isSamePage: boolean
    switchPage: (url: string) => void;
};

export default function Button({ label, icon, page, isScrolled, isSamePage, switchPage }: ButtonProps) {

    return (
        <>
            <div
                onMouseEnter={() => playSound("hover")}
                onClick={() => {
                    if (page === label) {
                        playSoundAt("error", 0.3);
                    } else {
                        playSound("blob");
                    }

                    switchPage(label);
                }
                }
                className={`
                    ${style.navButton} 
                    ${isScrolled ? style.navButtonSmall : style.navButtonLarge}
                    ${page === label ? style.currentPage : ""}
                    ${isSamePage && page === label ? style.blockAction : ""}`}>

                <img src={icon} alt="" className={`
                    ${style.navImage} 
                    ${isScrolled ? style.navImageSmall : ""}
                    ${page !== label ? style.highlightedMobile : ""}`} />
                <div className={`${style.label}`}>{label}</div>

            </div>
            {isSamePage && page === label && (<div className={`${style.blockMessage}`}>your already on this page :)..... dumbass</div>)}

        </>
    )
}