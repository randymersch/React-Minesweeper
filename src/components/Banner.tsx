import { useEffect, useState } from "react";
import { GameTileProp } from "./Minesweeper";

interface BannerProps {
  gameBoard: GameTileProp[][];
  isGameOver: boolean;
  startGameClick: () => void;
  isMark: boolean;
  toggleIsMark: () => void;
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

function getBombs(gameBoard: GameTileProp[][]) {
  let bombs = 0;
  for (let x = 0; x < gameBoard.length; x++) {
    for (let y = 0; y < gameBoard[x].length; y++) {
      if (gameBoard[y][x].isBomb && !gameBoard[y][x].isFlagged) {
        bombs++;
      }
    }
  }

  return bombs.toString();
}

function Banner({
  gameBoard,
  isGameOver,
  startGameClick,
  isMark,
  toggleIsMark,
}: BannerProps) {
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
    <div className="border-solid border-gray-400 border-4 p-4 grid grid-cols-4 min-w-24">
      <label>
        <input
          type="checkbox"
          checked={isMark}
          className="mx-3"
          onChange={() => toggleIsMark()}
        />
        {isMark ? ">" : "B"}
      </label>
      <span className="text-red-700 font-bold">{getBombs(gameBoard)}</span>

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
