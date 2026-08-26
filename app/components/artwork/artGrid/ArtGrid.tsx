"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ArtGrid.module.css"
import ArtCard from "./arkCard/ArtCard"
import { recentArt } from "@/app/data/recentArt"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import FullScreenArt from "../fullScreenArt/FullScreenArt";
import Sort from "./sort/Sort";
import { ArtworkResponse } from "@/app/types/Dashboard";

type Props = {
    artworks: ArtworkResponse[];
};

export default function ArtGrid({ artworks }: Props) {

    const [expandArt, setExpandArt] = useState(false);

    const [artwork, setArtwork] = useState<ArtworkResponse>();
    const [mobileResizer, setMobileResizer] = useState("large");
    const [activeTool, setActiveTool] = useState("All");
    const [filtertedArtworks, setFilteredArtworks] = useState<ArtworkResponse[]>([]);

    useEffect(() => {
        setFilteredArtworks(artworks);
    }, [artworks]);

    const handleExpandArt = (artwork: ArtworkResponse) => {
        setExpandArt(true);
        setArtwork(artwork);
    }

    const handleCloseArt = () => {
        setExpandArt(false);
    };

    const handleActiveTool = (tool: string) => {
        setActiveTool(tool);
    }

    const handleSorting = (filterType: string, filter: string) => {
        console.log(artworks)
        if (filterType === "") {
            setFilteredArtworks(artworks);
            console.log("hello", filtertedArtworks)

        }
        else if (filterType === "date") {
            if (filter === "most recent") {
                const sorted = [...artworks].sort(
                    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                );
                setFilteredArtworks(sorted);

            }
            if (filter === "least recent") {
                const sorted = [...artworks].sort(
                    (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
                );
                setFilteredArtworks(sorted);

            }
        }
        else if (filterType === "tool") {
            if (filter === "Others") {
                const filtered = artworks.filter(artwork => artwork.tool !== "Procreate" && artwork.tool !== "Photoshop");
                setFilteredArtworks(filtered);
            }
            else {
                const filtered = artworks.filter(artwork => artwork.tool === filter);
                setFilteredArtworks(filtered);
            }
        }
        else if (filterType === "ratio") {

            if (filter === "wide") {
                const filtered = artworks.filter(artwork => artwork.tag_names.includes("landscape"));
                setFilteredArtworks(filtered);
            }
            else if (filter === "square") {
                const filtered = artworks.filter(artwork => artwork.tag_names.includes("square"));
                setFilteredArtworks(filtered);
            }
        }
        else if (filterType === "tag") {
            const filtered = artworks.filter(artwork => artwork.tag_names.includes(filter));
            setFilteredArtworks(filtered);
        }
    }


    useScrollReveal(".offscreenDown", "easeIn", false);


    return (
        <>
            <div>


                <Sort
                    setFilter={handleSorting}
                />

                {expandArt && artwork && (<FullScreenArt
                    artwork={artwork}
                    onClose={handleCloseArt}
                />)}

                <div className={`${styles.artGrid} ${mobileResizer === "small" ? styles.artGridSmall : ""}`}>
                    {filtertedArtworks.map((items, index) => (
                        <ArtCard
                            key={index}
                            artwork={items}
                            onExpand={handleExpandArt} 
                            resize={mobileResizer}/>
                    ))}
                </div>

                <div className={`${styles.resizer}`}>
                    <div className={`${styles.resizeButton} ${styles.resizeSelector} ${mobileResizer === "small" ? styles.resizeSelectorSmall : ""}`}></div>
                    <div onClick={() => setMobileResizer("large")}className={`${styles.resizeButton} ${mobileResizer === "large" ? styles.resizeSelect : ""}`}>⊟</div>
                    <div onClick={() => setMobileResizer("small")} className={`${styles.resizeButton} ${mobileResizer === "small" ? styles.resizeSelect : ""}`}>⊞</div>

                </div>
            </div>
        </>
    )
}