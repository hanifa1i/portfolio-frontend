"use client"
import HomeNav from "./components/navigation/HomeNav";
import Recent from "./components/home/recent/Recent";
import Divider from "./components/common/Divider";
import AboutMe from "./components/home/about/AboutMe";
import DepthImage from "./components/common/DepthImage";


import Image from "next/image";
import Info from "./components/info/Info";
import { useState } from "react";

export default function Home() {

    const [fadeOutRecent, setFadeOutRecent] = useState(false);
  return (
    <div className={`homePage flex  w-full bg-zinc-900 font-sans ${fadeOutRecent ? "fadeOutRecent" : ""}`}>
      <main className="w-full ">
        <div className="items-center w-full h-fit ">
          <div className="homeBg"></div>

          <div className="title gradient-text">software engineer</div>
          <div className="title title2 gradient-text">and a artist</div>
          <div className="title title3 gradient-text">welcome </div>
          
          <div className="homeIntro homeBg gradient "></div>

          <div className="homeIntro fixed top-[00px] w-full h-[95vh]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`min-h-full object-cover`}
            >
              <source src={"/videos/home/bg-home.mp4"} type="video/mp4" />
            </video>
          </div>


          <Info />
          <div className=" portfolioHeadingContainer ">
            <div className="portfolioHeading ">artist</div>
            <div className="portfolioHeading ">software developer</div>

          </div>

          <div className="pt-[100px] text-center top-0 text-[32px] h-[70vh] text-[#222]/0 font-bold"></div>
          <HomeNav />

          <div className="home px-[100px] bg-zinc-900 h-fit justify-center pb-[200px] pt-[150px] z-20 relative text-4xl overflow-x-hidden">
            <AboutMe />
            <Divider />
            <div className="customBigHeading recent">RECENT</div>
            <Recent 
              fadeOutRecent={fadeOutRecent}
              setFadeOutRecent={setFadeOutRecent}/>
          </div>

        </div>


      </main>
    </div>
  );
}
