import TileComponent from "./TileComponent";
import InputBoxComponent from "./InputBoxComponent";
import "./board.css";
import { useEffect, useState } from "react";
import type Board from "@shared/models/Board";
import clientSocket from "../../socket";

export default function BoardComponent() {
  const [board, setBoard] = useState<Board>({
    boardTiles: [],
    inputs: ["", "", "", ""],
  });

  const [rotation, setRotation] = useState(0);

  const rotateBoard = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  type InputPosition = "top" | "bottom" | "left" | "right";

    const positionToRotationLevel: Record<InputPosition, number> = {
      top: 0,
      right: 3,
      bottom: 2,
      left: 1,
    };

    const handleInputFocus = (position: InputPosition) => {
      const targetRotationLevel: number = positionToRotationLevel[position];
      console.log(position);
      console.log(targetRotationLevel);
      setRotation(targetRotationLevel * 90);
    };

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
      <div className="boardRotator" style={{ transform: `rotate(${rotation}deg)` }}>
        <InputBoxComponent position="top" placeholder="Tekst" onFocus={handleInputFocus} />
        <div className="middle-row">
          <InputBoxComponent position="left" placeholder="Tekst" onFocus={handleInputFocus}/>
          <div className="boardWrapper">
          <div className="board">
            {board.boardTiles.map((tile, index) => (
              <TileComponent key={index} boardTile={tile} />
            ))}
          </div>

          <button className="rotate-btn rotate-btn--center" onClick={rotateBoard}>
            ⟳
          </button>
        </div>
          <InputBoxComponent position="right" placeholder="Tekst" onFocus={handleInputFocus} />
        </div>
        <InputBoxComponent position="bottom" placeholder="Tekst" onFocus={handleInputFocus}   />
      </div>

      <button className="ready-btn">READY</button>
    </div>
  );
}