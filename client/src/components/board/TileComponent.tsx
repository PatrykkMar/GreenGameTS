import type BoardTile from "@shared/models/BoardTile";
import  { useState } from "react";

interface TileProps {
  boardTile: BoardTile;
}

export default function TileComponent({ boardTile }: TileProps) {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prev) => prev + 90); 
  };

  return (
    <div className="tile">
      <label className="tile-label top">{boardTile.words[0]}</label>
      <label className="tile-label bottom">{boardTile.words[1]}</label>
      <label className="tile-label left">{boardTile.words[2]}</label>
      <label className="tile-label right">{boardTile.words[3]}</label>

      <button
        className="rotate-btn"
        onClick={handleRotate}
        style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
      >
        Rotate
      </button>
    </div>
  );
}