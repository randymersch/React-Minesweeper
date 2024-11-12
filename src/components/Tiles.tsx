import { GameTileProp } from "./Minesweeper";
import Tile from "./Tile";
interface TilesProps {
  gameBoard: GameTileProp[][];
  isGameOver: boolean;
  updateTileClick: (x: number, y: number, isRightClick: boolean) => void;
}

function Tiles({ gameBoard, isGameOver, updateTileClick }: TilesProps) {
  return (
    <div>
      {gameBoard.map((row, x) => (
        <div key={x} className="flex flex-row">
          {row.map((column, y) => (
            <Tile
              key={`${x}, ${y}`}
              tileData={column}
              isGameOver={isGameOver}
              updateTileClick={updateTileClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Tiles;
