"use client"
import Info from "../components/info/Info";
import Nav from "../components/navigation/Nav";
import Skills from "../components/skills/Skills"
import useScrollReveal from "../hooks/useScrollReveal";

export default function SkillsPage() {
  useScrollReveal(".offscreenDown", "easeIn", false);
  
  return (
    <div className="skillsContainer">
      <div className="pageCenterer">
        <Info/>
        <Nav />
        <Skills/>
      </div>
      <div className="topFadeHomePage offscreenDown"></div>

    </div>
  );
}
  