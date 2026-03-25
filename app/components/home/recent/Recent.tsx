"use client";

import { useEffect, useRef, useState } from "react";
import useScrollReveal from "@/app/hooks/useScrollReveal";
import { recentArt } from "@/app/data/recentArt"
import styles from "./Recent.module.css";
import RecentArtwork from "./recentArtwork/RecentArtwork";
import RecentBlogs from "./recentBlogs/RecentBlogs";


export default function Recent() {
    useScrollReveal(".offscreenLeft", "easeIn");
    useScrollReveal(".offscreenRight", "easeIn");
    return (
        <>
            <div className="recent">

                <div className=" recentArtworkContainer">
                    <div className="custom-heading">artworks</div>
                    <ul className={styles.recentArtworks}>
                        {recentArt.map((items, index) => (
                            <RecentArtwork
                                key={index}
                                image={items.image} />
                        ))}
                    </ul>
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