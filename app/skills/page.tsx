import Info from "../components/info/Info";
import Nav from "../components/navigation/Nav";
import Skills from "../components/skills/Skills"

export default function SkillsPage() {
  return (
    <div className="skillsContainer">
      <div className="pageCenterer">
        <Info/>
        <Nav />
        <Skills/>
      </div>
    </div>
  );
}
  