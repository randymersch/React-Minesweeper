import { useEffect, useState } from "react";
import { GameTileProp } from "./Minesweeper";

interface BannerProps {
  gameBoard: GameTileProp[][];
  isGameOver: boolean;
  startGameClick: () => void;
}

function getScore(gameBoard: GameTileProp[][]) {
  let score = 0;
  const pointMultiplier = 10;
  for (let x = 0; x < gameBoard.length; x++) {
    for (let y = 0; y < gameBoard[x].length; y++) {
      if (gameBoard[y][x].isDisplayed) {
        score += pointMultiplier;
      }
    }
  }

  return score.toString();
}

function Banner({ gameBoard, isGameOver, startGameClick }: BannerProps) {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (!isGameOver) {
      const timerInterval = setInterval(
        () => setTimer((prevTimer) => prevTimer + 1),
        1000,
      );

      return () => clearInterval(timerInterval);
    }
  }, [isGameOver, timer]);

  return (
    <div className="border-solid border-gray-400 border-4 p-4 grid grid-cols-3">
      <span className="text-red-700 font-bold">{getScore(gameBoard)}</span>

      <button
        onClick={() => {
          setTimer(0);
          startGameClick();
        }}
      >
        {isGameOver ? ":(" : ":)"}
      </button>

      <span className="text-red-700 font-bold">{timer}</span>
    </div>
  );
}

export default Banner;
