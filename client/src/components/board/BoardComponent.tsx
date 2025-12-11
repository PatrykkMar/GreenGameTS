import TileComponent from "./TileComponent";
import InputBoxComponent from "./InputBoxComponent";
import "./board.css"
import { useEffect, useState } from "react";
import { clientSocket } from "../../socket";
import type Board from "@shared/models/Board";

export default function BoardComponent() {

  const [board, setBoard] = useState<Board>({
    boardTiles: [],
    inputs: ["", "", "", ""],
  });

  
      useEffect(() => {
          const handleBoard = (board: Board) => {
            setBoard(board);
          };

          clientSocket.onBoard(handleBoard);
  
          clientSocket.requestBoard().then(res => {
              if (res.ok && res.data) {
                  setBoard(res.data);
              }
          });

          return () => {
              clientSocket.offBoard(handleBoard);
          };
      }, []);

  return (
    <div className="container text-center">
      <div className="container-box">
        {board.boardTiles.map((tile, index) => (
          <TileComponent key={index} boardTile={tile} />
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