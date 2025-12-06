
import "./board.css";

export type BoardProps = {
  tiles: { words: string[] }[];
};
export default function Board() {


  return (
    <div className="container-box">
        <input className="input-box top" placeholder="Tekst" />
        <input className="input-box bottom" placeholder="Tekst" />
        <input className="input-box left" placeholder="Tekst" />
        <input className="input-box right" placeholder="Tekst" />

        <div className="tile">
            <label className="tile-label top">G1</label>
            <label className="tile-label bottom">D1</label>
            <label className="tile-label left">L1</label>
            <label className="tile-label right">P1</label>
        </div>

        <div className="tile">
            <label className="tile-label top">G2</label>
            <label className="tile-label bottom">D2</label>
            <label className="tile-label left">L2</label>
            <label className="tile-label right">P2</label>
        </div>

        <div className="tile">
            <label className="tile-label top">G3</label>
            <label className="tile-label bottom">D3</label>
            <label className="tile-label left">L3</label>
            <label className="tile-label right">P3</label>
        </div>

        <div className="tile">
            <label className="tile-label top">G4</label>
            <label className="tile-label bottom">D4</label>
            <label className="tile-label left">L4</label>
            <label className="tile-label right">P4</label>
        </div>
    </div>
  );
}