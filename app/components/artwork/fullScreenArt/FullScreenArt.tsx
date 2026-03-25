import useScrollReveal from "@/app/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import styles from "./FullScreenArt.module.css"

type Art ={
    images: string[];
    date: string;
    tool: string;
}

type Props = {
    artwork: Art;
    onClose: () => void;
};



export default function FullScreenArt({ artwork, onClose }: Props) {

    const [moreInfo, setMoreInfo] = useState(false);

    const [spotlight, setSpotlight] = useState<string>(artwork.images[0]);
    const [spotlightTransition, setSpotlightTransition] = useState(false);

    const [exit, onExit] = useState(false);

    const handleSpotlight = (selectedImage: string) => {
        if (selectedImage === spotlight) return;

        setSpotlightTransition(true);

        setTimeout(() => {

        setSpotlightTransition(false);
        setSpotlight(selectedImage);
        }, 200);

                    

    }

    const handleMoreInfo = () => {
        if (moreInfo == false) setMoreInfo(true);
        else if (moreInfo == true) setMoreInfo(false);
    }

    const handleExit = () => {
        onExit(true);
        setTimeout(() => {
            onClose();
        }, 500);
    }
 
    useScrollReveal(".offscreenLeft", "easeIn");
    useScrollReveal(".offscreenUp", "easeIn");


    return (
        <>
            <div className={`${styles.fullscreenArt} ${exit ? styles.closing:"offscreenLeft"}`}>
                <img src={spotlight} className={`${styles.spotlight} ${spotlightTransition ? styles.fadeOut : styles.fadeIn}`} />
                <div className={`${moreInfo ? styles.moreInfo : styles.moreInfoHidden}`}>
                    <div className={`${moreInfo ? styles.description : "hidden"}`}>
                        Flimbarous wendled the quast of shimmering plinths while the overmorrow tickled sideways into a blur of almost-thoughts.
                        Somewhere between the wobble of luminary sprockets and the hush of neon drapples, a notion unspooled itself, backwards
                        and humming. Grindlehop echoes layered upon themselves like polite avalanches, each softer than the last but somehow
                        louder in intent.


                    </div>
                    <div className={`${moreInfo ? styles.sideInfo : styles.hiddenInfo}`}>
                        <div className={`${styles.date}`}>date created</div>
                        <div className={`${styles.dateValue}`}>{artwork.date}</div>
                        <div className={`${styles.tool}`}>tool used</div>
                        <div className={`${styles.toolValue}`}>{artwork.tool}</div>
                        <div className={`${styles.category}`}>category</div>
                        <div className={`${styles.categoryValue}`}>Water</div>
                        <div className={`${styles.dimensions}`}>dimensions</div>
                        <div className={`${styles.dimensionsValue}`}>1920X1080</div>
                    </div>
                </div>

                <div className={`${styles.infoBar} `}>
                    <div className={`${styles.sideContainer}  `}>
                        <button className={`${styles.exitButton}`} onClick={handleExit}>exit</button>
                    </div>
                    <div className={`${styles.imageSlider}`}>
                        <div className={`${styles.imagePreview} ${artwork.images[0] === spotlight ? styles.imagePreviewSelected : ""} `} onClick={() => handleSpotlight(artwork.images[0])}>
                            <img src={artwork.images[0]} className="h-full object-cover"/>
                        </div>
                        <div className={`${styles.imagePreview} ${artwork.images[1] === spotlight ? styles.imagePreviewSelected : ""} `} onClick={() => handleSpotlight(artwork.images[1])}>
                            <img src={artwork.images[1]} className="h-full object-cover"/>
                        </div>
                        <div className={`${styles.imagePreview} ${artwork.images[2] === spotlight ? styles.imagePreviewSelected : ""} `} onClick={() => handleSpotlight(artwork.images[2])}>
                            <img src={artwork.images[2]} className="h-full object-cover"/>
                        </div>
                        <div className={`${styles.imagePreview} ${artwork.images[3] === spotlight ? styles.imagePreviewSelected : ""} `} onClick={() => handleSpotlight(artwork.images[3])}>
                            <img src={artwork.images[3]} className="h-full object-cover"/>
                        </div>
                        <div className={`${styles.imagePreview} ${artwork.images[4] === spotlight ? styles.imagePreviewSelected : ""} `} onClick={() => handleSpotlight(artwork.images[4])}>
                            <img src={artwork.images[4]} className="h-full object-cover"/>
                        </div>
                    </div>
                    <div className={`${styles.sideContainer}  `}>
                        <button className={`${styles.infoButton}`} onClick={handleMoreInfo}> 

                            show info</button>
                    </div>
                </div>


            </div>
        </>
    )
} 