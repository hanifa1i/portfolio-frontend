import Nav from "../components/navigation/Nav";
import ArtGrid from "../components/artwork/artGrid/ArtGrid"

export default function ArtworkPage() {
  return (
    <div className="artworkContainer">
      <div className="pageCenterer">
        <Nav />
        <ArtGrid />
      </div>
    </div>
  );
}
