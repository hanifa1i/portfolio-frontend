import styles from "../ArtGrid.module.css"

type Props = {
    filterName: string;
    setFilter: (filter: string) => void;
}

export default function Sort({ filterName, setFilter }: Props) {

    return (
        <>
            <div className={`${styles.sorter}  offscreenDown`}>

                <div className={`${styles.filterHeading}`}>Filter<div className={`${styles.activeFilter}`}>{filterName}</div></div>
                <div className={`${styles.filterName} `}>
                    <button className="mr-[15px]">date</button>
                    <button className={`${styles.filterSubName} ${filterName === "most recent" ? styles.filterSubNameOn : ""}`} onClick={() => setFilter("most recent")}>
                        <div className={`  ${filterName === "most recent" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">most recent</div>
                    </button>
                    <button className={`${styles.filterSubName} ${filterName === "leastRecent" ? styles.filterSubNameOn : ""}`} onClick={() => setFilter("leastRecent")}>
                        <div className={`  ${filterName === "leastRecent" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">least recent</div>
                    </button>

                </div>
                <div className={`${styles.filterName}`}>
                    <button className="mr-[15px]">tool</button>
                    <button className={`${styles.filterSubName} ${filterName === "procreate" ? styles.filterSubNameOn : ""}`} onClick={() => setFilter("procreate")}>
                        <div className={`  ${filterName === "procreate" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">procreate</div>
                    </button>
                    <button className={`${styles.filterSubName} ${filterName === "photoshop" ? styles.filterSubNameOn : ""}`} onClick={() => setFilter("photoshop")}>
                        <div className={`  ${filterName === "photoshop" ? styles.tick : "hidden"}`}>✓</div>
                        <div className="">photoshop</div>
                    </button>
                    <button className={`${styles.filterSubName}`}> procreate</button>

                </div>
                <div className={`${styles.filterName}`}>
                    <button className="mr-[15px]">category</button>
                    <button className={`${styles.filterSubName}`}>landscape</button>
                    <button className={`${styles.filterSubName}`}>potrait</button>
                    <button className={`${styles.filterSubName}`}> widelife</button>
                </div>
                <div className={`${styles.filterName}`}>
                    <button className="mr-[15px]">ratio</button>
                    <button className={`${styles.filterSubNameRatio} ${filterName === "wide" ? styles.filterSubNameRatioOn: ""} w-fit`} onClick={() => setFilter("wide")}>
                        <div className={`  ${filterName === "wide" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/wide-ratio.svg" alt="" className={`${styles.ratioImage}`} />
                    </button>
                    <button className={`${styles.filterSubNameRatio} ${filterName === "square" ? styles.filterSubNameRatioOn: ""} w-fit`} onClick={() => setFilter("square")}>
                        <div className={`  ${filterName === "square" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/square-ratio.svg" alt="" className={`${styles.ratioImage}`} />
                    </button>
                    <button className={`${styles.filterSubNameRatio} ${filterName === "1:1" ? styles.filterSubNameRatioOn: ""} w-fit`} onClick={() => setFilter("1:1")}>
                        <div className={`  ${filterName === "1:1" ? styles.tick : "hidden"}`}>✓</div>
                        <img src="/images/filter/wide-ratio.svg" alt="" className={`${styles.ratioImage} rotate-90`} />
                    </button>
                    
                </div>
                <div className={`${styles.filterName}`}></div>

            </div>
        </>
    );
} 