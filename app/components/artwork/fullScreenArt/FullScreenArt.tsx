import useScrollReveal from "@/app/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import styles from "./FullScreenArt.module.css"
import { ArtworkResponse } from "@/app/types/Dashboard";
import { formatDateFromDistanceToNow } from "@/app/services/CommonService";
import { toolIconMatcher } from "@/app/data/artwork/toolIcon";
import { playSound } from "@/app/lib/SoundManager";

type Props = {
    artwork: ArtworkResponse;
    onClose: () => void;
};



export default function FullScreenArt({ artwork, onClose }: Props) {

    const [moreInfo, setMoreInfo] = useState(false);

    const [spotlight, setSpotlight] = useState<string>(artwork.image_urls[0].image_url);
    const [spotlightTransition, setSpotlightTransition] = useState(false);

    const [exit, onExit] = useState(false);

    const handleSpotlight = (selectedImage: string) => {
        if (selectedImage === spotlight) return;

        playSound("click");
        setSpotlightTransition(true);

        setTimeout(() => {

            setSpotlightTransition(false);
            setSpotlight(selectedImage);
        }, 200);



    }

    const handleMoreInfo = () => {
        playSound("blob");
        if (moreInfo == false) setMoreInfo(true);
        else if (moreInfo == true) setMoreInfo(false);
    }

    const handleExit = () => {
        playSound("back");
        onExit(true);
        setTimeout(() => {
            onClose();
        }, 500);
    }

    const toolIcon = (tool: string) => {
        const match = toolIconMatcher.find(matcher => matcher.label === tool)
        return match ? match.icon : ""
    }

    useScrollReveal(".offscreenLeft", "easeIn", false);
    useScrollReveal(".offscreenUp", "easeIn", false);


    return (
        <>
            <div className={`${styles.fullscreenArt} ${exit ? styles.closing : "offscreenLeft"}`}>
                <div className={`${styles.spotlight} ${spotlightTransition ? styles.fadeOut : styles.fadeIn}`}>
                    <img src={spotlight} className={`${styles.spotlightImage}`} />
                </div>
                <div className={`${moreInfo ? styles.moreInfo : styles.moreInfoHidden}`}>
                    <div className={`${moreInfo ? styles.description : "hidden"}`}>
                        <div className={`${styles.title}`}>{artwork.title}</div>
                        <div className={`${styles.descriptionInfo}`}>{artwork.description}</div>

                    </div>
                    <div className={`${moreInfo ? styles.sideInfo : styles.hiddenInfo}`}>
                        <div className={`${styles.sideInfoContainer}`}>
                            <div className={`${styles.heading}`}>added</div>
                            <div className={`${styles.value}`}><div className={`${styles.tag}`}>{formatDateFromDistanceToNow(artwork.created_at)}</div></div>
                        </div>
                        <div className={`${styles.sideInfoContainer}`}>
                            <div className={`${styles.heading}`}>last updated</div>
                            <div className={`${styles.value}`}><div className={`${styles.tag}`}>{formatDateFromDistanceToNow(artwork.updated_at)}</div></div>
                        </div>
                        <div className={`${styles.sideInfoContainer}`}>
                            <div className={`${styles.heading}`}>tool used</div>
                            <div className={`${styles.value} ${styles.valueTool}`}>
                                <div className={`${styles.tag}`}>{artwork.tool}</div>
                                {toolIcon(artwork.tool) !== "" && (<img src={toolIcon(artwork.tool)} className={`${styles.toolImage}`} />)}
                            </div>
                        </div>
                        <div className={`${styles.sideInfoContainer}`}>
                            <div className={`${styles.heading}`}>tags</div>
                            <div className={`${styles.value}`}>
                                {artwork.tag_names.map((tag, key) => (
                                    <div key={key} className={`${styles.tag}`}>{tag}</div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`${styles.infoBar} `}>
                    <div className={`${styles.sideContainer}  `}>
                        <button onMouseEnter={() => playSound("hover")} className={`${styles.exitButton}`} onClick={handleExit}>←</button>
                    </div>
                    <div className={`${styles.imageSlider}`}>
                        {artwork.image_urls.map((image, key) => (
                            <div key={key} className={`${styles.imagePreview} ${image.image_url === spotlight ? styles.imagePreviewSelected : ""} `} onMouseEnter={() => playSound("hover")} onClick={() => handleSpotlight(image.image_url)}>
                                <img src={image.image_url} className={`${styles.imagePrevieImage}`} />
                            </div>
                        ))}

                    </div>
                    <div className={`${styles.sideContainer}  `}>
                        <button className={`${styles.infoButton}`} onMouseEnter={() => playSound("hover")} onClick={handleMoreInfo}>
                            <img
                                className={`${styles.infoIcon}`}
                                src={"images/sketchbook/info-static.png"} />
                        </button>
                    </div>
                </div>


            </div>
        </>
    )
} 