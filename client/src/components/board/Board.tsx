import Tile from "./Tile";
import InputBox from "./InputBox";
import "./board.css"

export default function Board() {
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
          <Tile key={index} labels={tile} />
        ))}

        <InputBox position="top" placeholder="Tekst" />
        <InputBox position="bottom" placeholder="Tekst" />
        <InputBox position="left" placeholder="Tekst" />
        <InputBox position="right" placeholder="Tekst" />
      </div>

      <button className="ready-btn">READY</button>
    </div>
  );
}