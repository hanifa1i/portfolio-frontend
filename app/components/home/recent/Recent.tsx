"use client";

import { useEffect, useRef, useState } from "react";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { useRouter, usePathname } from "next/navigation";
import { recentArt } from "@/app/data/recentArt"
import styles from "./Recent.module.css";
import RecentArtwork from "./recentArtwork/RecentArtwork";
import RecentBlogs from "./recentBlogs/RecentBlogs";
import { ArtworkResponse } from "@/app/types/Dashboard";
import { getRecentArtwork } from "@/app/services/artworkService";
import { playSound } from "@/app/lib/SoundManager";

type Props = {
    fadeOutRecent: boolean
    setFadeOutRecent: (state: boolean) => void
}

export default function Recent({fadeOutRecent, setFadeOutRecent} : Props) {
    useScrollReveal(".offscreenLeft", "easeIn", false);
    useScrollReveal(".offscreenRight", "easeIn", false);

    const router = useRouter();


    const [recent, setRecent] = useState<ArtworkResponse[]>([]);

    const pageTransition = () => {
        playSound("whosh")
        setFadeOutRecent(true);
        setTimeout(() => { router.push("/artwork"); }, 500)
    }

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const data: ArtworkResponse[] = await getRecentArtwork(5);
                setRecent(data);
                console.log("recent data:", data);
                console.log("recent data:", data);


            } catch (error) {
                console.error("Failed to get recent artworks", error);
            }
        };

        fetchRecent();
    }, [])

    return (
        <>
            <div className={`recent` }>

                <div className=" recentArtworkContainer">
                    <div className="custom-heading">artworks</div>
                    <ul className={styles.recentArtworks}>
                        {recent.map((value, index) => (
                            <RecentArtwork
                                key={index}
                                image={value.image_urls[0].image_url} />
                        ))}
                    </ul>
                    <div onClick={pageTransition} onMouseEnter={() => playSound("hover")} className={styles.moreArtworkButton}>view all →</div>
                </div>

                <div className=" recentBlogsContainer">
                    <div className="custom-heading">blog posts</div>
                    <ul className={styles.recentBlogs}>
                        {[...Array(6)].map((_, i) => (
                            <RecentBlogs
                                key={i}
                                heading="blog 1"
                                body="fdfdf jgriorsjg op rp gspo oprog pog
                                fdfdf jgriorsjg op rp gspo oprog pog
                                fdfdf jgriorsjg op rp gspo oprog pog
                                fdfdf jgriorsjg op rp gspo oprog pog
                                fdfdf jgriorsjg op rp gspo oprog pog
                                fdfdf jgriorsjg op rp gspo oprog pog"
                                date="1 month ago" />
                        ))}
                    </ul>
                </div>

            </div>
        </>
    );
}