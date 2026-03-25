"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ArtGrid.module.css"
import ArtCard from "./arkCard/ArtCard"
import { recentArt } from "@/app/data/recentArt"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import FullScreenArt from "../fullScreenArt/FullScreenArt";
import Sort from "./sort/Sort";

type Art ={
    images: string[];
    date: string;
    tool: string;
}
type Props = {
    art: Art;
};

export default function ArtGrid({ art }: Props) {

    const [expandArt, setExpandArt] = useState(false);

    const [artwork, setArtwork] = useState(art);

    const [activeTool, setActiveTool] = useState("All");

    var sortedArt

    const handleExpandArt = (artwork: Art) => {
        setExpandArt(true);
        setArtwork(artwork);
    }

    const handleCloseArt = () => {
        setExpandArt(false);
    };

    const handleActiveTool = (tool: string) => {
        setActiveTool(tool);
    }

    if (activeTool === "most recent") {
        sortedArt = [...recentArt]
            .filter(item => item.date) // remove bad entries
            .sort((a, b) => {
                const [dA, mA, yA] = a.date.split("/").map(Number);
                const [dB, mB, yB] = b.date.split("/").map(Number);

                const dateA = new Date(yA, mA - 1, dA);
                const dateB = new Date(yB, mB - 1, dB);

                return dateB.getTime() - dateA.getTime();
            });
    }
    else {
        sortedArt = recentArt.filter(art =>
            activeTool === "All" ? true : art.tool === activeTool
        )
    }
    useScrollReveal(".offscreenDown", "easeIn");


    return (
        <>
            <div>


                <Sort
                    filterName={activeTool}
                    setFilter={handleActiveTool}
                />

                {expandArt && (<FullScreenArt
                    artwork={artwork}
                    onClose={handleCloseArt}
                />)}

                <div className={`${styles.artGrid} `}>
                    {sortedArt.map((items, index) => (
                        <ArtCard
                            key={index}
                            art={items}
                            onExpand={handleExpandArt} />
                    ))}
                    {sortedArt.map((items, index) => (
                        <ArtCard
                            key={index}
                            art={items}
                            onExpand={handleExpandArt} />
                    ))}
                    {sortedArt.map((items, index) => (
                        <ArtCard
                            key={index}
                            art={items}
                            onExpand={handleExpandArt} />
                    ))}
                    {sortedArt.map((items, index) => (
                        <ArtCard
                            key={index}
                            art={items}
                            onExpand={handleExpandArt} />
                    ))}
                    {sortedArt.map((items, index) => (
                        <ArtCard
                            key={index}
                            art={items}
                            onExpand={handleExpandArt} />
                    ))}
                    
                </div>
            </div>
        </>
    )
}