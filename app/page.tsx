"use client"
import HomeNav from "./components/navigation/HomeNav";
import Recent from "./components/home/recent/Recent";
import Divider from "./components/common/Divider";
import AboutMe from "./components/home/about/AboutMe";
import DepthImage from "./components/common/DepthImage";


import Image from "next/image";
import Info from "./components/info/Info";
import { useState } from "react";
import useScrollReveal from "./hooks/useScrollReveal";
import BackgroundSlider from "./components/home/backgroundSlider/BackgroundSlider";

export default function Home() {
  useScrollReveal(".offscreenDown", "easeIn", false);
  const [fadeOutRecent, setFadeOutRecent] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("center");
  return (
    <div className={`homePage flex  w-full bg-zinc-900 font-sans ${fadeOutRecent ? "fadeOutRecent" : ""}`}>

      <main className="w-full ">
        <div className="items-center w-full h-fit ">
          <div className="homeBg"></div>

          <div className="title gradient-text">welcome</div>

          <div className="homeIntro homeBg gradient "></div>

          <div className={`homeIntro fixed top-[00px] w-full h-[95vh] 
          
           backgroundViewer ${backgroundPos === "left" ? "backgroundViewerLeft" : backgroundPos === "right" ? "backgroundViewerRight" : ""}`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`min-h-full object-cover  `}
            >
              <source src={"/videos/home/bg-home.mp4"} type="video/mp4" />
            </video>
          </div>
          <BackgroundSlider position={backgroundPos} setPosition={setBackgroundPos}/>

          <Info />
          <div className=" portfolioHeadingContainer ">
            <div className="portfolioHeading ">artist</div>
            <div className="portfolioHeading ">software developer</div>

          </div>

          <div className="pt-[100px] text-center top-0 text-[32px] h-[70vh] text-[#222]/0 font-bold"></div>
          <HomeNav />

          <div className="home px-[100px] bg-[#171717] h-fit justify-center pb-[200px] pt-[150px] z-20 relative text-4xl overflow-x-hidden">


            <AboutMe />
            <Divider />
            <div className="customBigHeading recent recentHeading">RECENT</div>
            <Recent
              fadeOutRecent={fadeOutRecent}
              setFadeOutRecent={setFadeOutRecent} />
          </div>


        </div>

        <div className="topFadeHomePage offscreenDown"></div>

      </main>
    </div>
  );
}
