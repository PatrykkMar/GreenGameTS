
import "./board.css";

export type BoardProps = {
  tiles: { words: string[] }[];
};
export default function Board() {


  return (
    <div className="container text-center">
    <div className="container-box">
        <input type="text" className="input-box top" placeholder="Tekst"/>
        <input type="text" className="input-box bottom" placeholder="Tekst"/>
        <input type="text" className="input-box left" placeholder="Tekst"/>
        <input type="text" className="input-box right" placeholder="Tekst"/>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
    </div>
    <div>
        <button className="btn btn-success ready-btn">READY</button>
    </div>
    </div>
  );
}