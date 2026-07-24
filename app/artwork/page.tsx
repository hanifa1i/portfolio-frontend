"use client";
import Nav from "../components/navigation/Nav";
import ArtGrid from "../components/artwork/artGrid/ArtGrid"
import { getArtwork, getStandaloneArt } from "../services/artworkService";
import { useEffect, useState } from "react";
import { ArtworkResponse } from "../types/Dashboard";
import Info from "../components/info/Info";

export default function ArtworkPage() {

  const [artworks, setArtworks] = useState<ArtworkResponse[]>([]);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data: ArtworkResponse[] = await getStandaloneArt();
        setArtworks(data);
      } catch (error) {
        console.error("Failed to get Artwork", error);
      }
    };

    fetchArtwork();
  }, [])


  return (
    <div className="artworkContainer">
      <Info />
      <div className="pageCenterer">
        <Nav />
        <ArtGrid artworks={artworks} />
      </div>
    </div>
  );
}
