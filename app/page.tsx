import HomeNav from "./components/navigation/HomeNav";
import Recent from "./components/home/recent/Recent";
import Divider from "./components/common/Divider";
import AboutMe from "./components/home/about/AboutMe";
import DepthImage from "./components/common/DepthImage";


import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-[200vh]  w-full bg-zinc-900 font-sans ">
      <main className="w-full">
        <div className="bg-[#FFC700] items-center w-full h-fit ">
          <img src="/images/me5.jpg" className="fixed top-[00px] w-full left-1/2 -translate-x-1/2" />

          <div className="portfolioHeadingContainer ">
            <div className="portfolioHeading">artist</div>

            <div className="portfolioHeading">software developer</div>

          </div>

          <div className="pt-[100px] text-center top-0 text-[320px] h-[70vh] text-[#222]/0 font-bold">porfolio</div>
          <HomeNav />

          <div className="px-[100px] bg-zinc-900 h-fit justify-center pb-[200px] pt-[150px] z-20 relative text-4xl ">

            <AboutMe />
            <Divider />
            <div className="customBigHeading">RECENT</div>
            <Recent />

          </div>

        </div>


      </main>
    </div>
  );
}
