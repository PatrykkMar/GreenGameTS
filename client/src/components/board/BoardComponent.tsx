import TileComponent from "./TileComponent";
import InputBoxComponent from "./InputBoxComponent";
import "./board.css"

export default function BoardComponent() {
  const tilesData = [
    { top: "G1", bottom: "D1", left: "L1", right: "P1" },
    { top: "G2", bottom: "D2", left: "L2", right: "P2" },
    { top: "G3", bottom: "D3", left: "L3", right: "P3" },
    { top: "G4", bottom: "D4", left: "L4", right: "P4" },
  ];

  return (
    <div className="container text-center">
      <div className="container-box">
        {tilesData.map((tile, index) => (
          <TileComponent key={index} labels={tile} />
        ))}

        <InputBoxComponent position="top" placeholder="Tekst" />
        <InputBoxComponent position="bottom" placeholder="Tekst" />
        <InputBoxComponent position="left" placeholder="Tekst" />
        <InputBoxComponent position="right" placeholder="Tekst" />
      </div>

      <button className="ready-btn">READY</button>
    </div>
  );
}