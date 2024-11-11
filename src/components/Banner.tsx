import { useEffect, useState } from "react";
import { GameTileProp } from "./Minesweeper";

interface BannerProps {
  gameBoard: GameTileProp[][];
  isGameOver: boolean;
  startGameClick: () => void;
}

function Banner({ gameBoard, isGameOver, startGameClick }: BannerProps) {
  console.log(gameBoard);

  const [timer, setTimer] = useState<number>(0);

  // useEffect(() => {
  //   if (!isGameOver) {
  //     const timerInterval = setInterval(
  //       () => setTimer((prevTimer) => prevTimer + 1),
  //       1000,
  //     );

  //     return () => clearInterval(timerInterval);
  //   }
  // }, [isGameOver, timer]);

  return (
    <div className="border-solid border-gray-400 border-4 p-4 grid grid-cols-3">
      <span className="text-red-700 font-bold">180</span>

      <button
        onClick={() => {
          setTimer(0);
          startGameClick();
        }}
      >
        start
      </button>

      <span className="text-red-700 font-bold">{timer}</span>
    </div>
  );
}

export default Banner;
