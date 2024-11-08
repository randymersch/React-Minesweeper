import { GameTileProp } from "./Minesweeper";
import Tile from "./Tile";
interface TilesProps {
  gameBoard: GameTileProp[][];
  updateTileClick: any;
}

function Tiles({ gameBoard, updateTileClick }: TilesProps) {
  console.log("tiles");
  console.log(gameBoard);
  return (
    <div>
      {gameBoard.map((row, x) => (
        <div className="flex flex-row grid-rows-1">
          {row.map((column) => (
            <Tile tileData={column} updateTileClick={updateTileClick} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Tiles;
