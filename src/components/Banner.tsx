import { GameTileProp } from "./Minesweeper";

interface BannerProps {
  gameBoard: GameTileProp[][];
  startGameClick: () => void;
}

function Banner({ gameBoard, startGameClick }: BannerProps) {
  console.log(gameBoard);
  return (
    <div className="border-solid border-gray-400 border-4 p-4 grid grid-cols-3">
      <span className="text-red-700 font-bold">180</span>

      <button onClick={() => startGameClick()}>start</button>

      <span className="text-red-700 font-bold">100</span>
    </div>
  );
}

export default Banner;
