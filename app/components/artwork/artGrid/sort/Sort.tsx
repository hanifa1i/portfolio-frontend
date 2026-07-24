import { useState } from "react";
import styles from "../ArtGrid.module.css"
import { getTags } from "@/app/services/artworkService";
import { playSound } from "@/app/lib/SoundManager";

type Props = {
    setFilter: (filterType: string, filter: string) => void;
}

export default function Sort({ setFilter }: Props) {

    const [tagList, setTagList] = useState<String[]>([]);
    const [update, setUpdate] = useState(true);
    const [filterName, setFilterName] = useState("");


    const callTags = async () => {
        const tags = await getTags();
        const tagNames = tags.map(tag => tag.name);
        console.log(tagNames);
        setTagList(tagNames);
    }
    if (update === true) {
        callTags();
        setUpdate(false);
    }
    const selected = (filterType: string, filter: string) => {
        playSound("blob")
        setFilter(filterType, filter);
        setFilterName(filter);
    }

    return (
        <>
            <div onMouseEnter={() => playSound("hover")} className={`${styles.sorter}  offscreenDown`}>

                <div className={`${styles.filterHeading}`}>Filter<div className={`${styles.activeFilter}`}>{filterName}</div></div>
                <div className={`${styles.filterName} `}>
                    <button onMouseEnter={() => playSound("hover")} className="mr-[15px] w-[100px]">date</button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubName} ${filterName === "most recent" ? styles.filterSubNameOn : ""}`} onClick={() => selected("date", "most recent")}>
                        <div className={`  ${filterName === "most recent" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">most recent</div>
                    </button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubName} ${filterName === "least recent" ? styles.filterSubNameOn : ""}`} onClick={() => selected("date", "least recent")}>
                        <div className={`  ${filterName === "least recent" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">least recent</div>
                    </button>

                </div>
                <div className={`${styles.filterName}`}>
                    <button onMouseEnter={() => playSound("hover")} className="mr-[15px] w-[100px]">tool</button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubName} ${filterName === "Procreate" ? styles.filterSubNameOn : ""}`} onClick={() => selected("tool", "Procreate")}>
                        <div className={`  ${filterName === "Procreate" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">procreate</div>
                    </button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubName} ${filterName === "Photoshop" ? styles.filterSubNameOn : ""}`} onClick={() => selected("tool", "Photoshop")}>
                        <div className={`  ${filterName === "Photoshop" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">photoshop</div>
                    </button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubName} ${filterName === "Others" ? styles.filterSubNameOn : ""}`} onClick={() => selected("tool", "Others")}>
                        <div className={`  ${filterName === "Others" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">others</div>
                    </button>
                </div>
                <div className={`${styles.filterName}`}>
                    <button onMouseEnter={() => playSound("hover")} className="mr-[15px] w-[100px]">ratio</button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubNameRatio} ${filterName === "wide" ? styles.filterSubNameRatioOn : ""} w-fit`} onClick={() => selected("ratio", "wide")}>
                        <div className={`  ${filterName === "wide" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/wide-ratio.svg" alt="" className={`${styles.ratioImage}`} />
                    </button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubNameRatio} ${filterName === "square" ? styles.filterSubNameRatioOn : ""} w-fit`} onClick={() => selected("ratio", "square")}>
                        <div className={`  ${filterName === "square" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/square-ratio.svg" alt="" className={`${styles.ratioImage}`} />
                    </button>
                    <button onMouseEnter={() => playSound("hover")} className={`${styles.filterSubNameRatio} ${filterName === "portrait" ? styles.filterSubNameRatioOn : ""} w-fit`} onClick={() => selected("ratio", "portrait")}>
                        <div className={`  ${filterName === "1:1" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/wide-ratio.svg" alt="" className={`${styles.ratioImage} rotate-90`} />
                    </button>

                </div>
                <div className={`${styles.filterName}`}>
                    <button onMouseEnter={() => playSound("hover")}  className="mr-[15px] w-[100px]">tags</button>
                    <div className={`${styles.tagContainer}`}>
                        {tagList.map((tag, key) => (
                            <button
                                key={key}
                                onMouseEnter={() => playSound("hover")} 
                                className={`${styles.filterSubName} ${filterName === tag ? styles.filterSubNameOn : ""} ${styles.tag}`}
                                onClick={() => selected("tag", tag.toString())}>
                                <div className={`  ${filterName === tag ? styles.tick : "hidden"}`}>✓</div>
                                <div>{tag}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`${filterName !== "" ? styles.removeFilter : "text-[0px]"}`}
                    onClick={() => selected("", "")}>reset</div>

            </div>
        </>
    );
} 