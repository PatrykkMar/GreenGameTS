import  { useState } from "react";

interface TileProps {
  labels: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}

export default function Tile({ labels }: TileProps) {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prev) => prev + 90); 
  };

  return (
    <div className="tile">
      <label className="tile-label top">{labels.top}</label>
      <label className="tile-label bottom">{labels.bottom}</label>
      <label className="tile-label left">{labels.left}</label>
      <label className="tile-label right">{labels.right}</label>

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