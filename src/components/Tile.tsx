import { GameTileProp } from "./Minesweeper";

interface TileProp {
  tileData: GameTileProp;
  updateTileClick: any;
}

function Tile(tileData: TileProp) {
  return (
    <button
      className="w-6 h-6 border-solid border-gray-400 border-2"
      onClick={() =>
        tileData.updateTileClick(
          tileData.tileData.x,
          tileData.tileData.y,
          false,
        )
      }
    >
      {tileData.tileData.isDisplayed ? "" : ""}
      {tileData.tileData.isBomb ? "B" : "N"}
      {tileData.tileData.isFlagged ? "" : ""}
    </button>
  );
}

export default Tile;
