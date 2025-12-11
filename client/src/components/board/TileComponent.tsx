import type BoardTile from "@shared/models/BoardTile";
import Directions from "@shared/models/Directions";
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
      <label className="tile-label top">{boardTile.words.get(Directions.Top)}</label>
      <label className="tile-label bottom">{boardTile.words.get(Directions.Bottom)}</label>
      <label className="tile-label left">{boardTile.words.get(Directions.Left)}</label>
      <label className="tile-label right">{boardTile.words.get(Directions.Right)}</label>

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