import { GameTileProp } from "./Minesweeper";

interface TileProp {
  tileData: GameTileProp;
  isGameOver: boolean;
  updateTileClick: any;
}

function Tile(tileProp: TileProp) {
  return (
    <div className="w-6 h-6 border-solid border-gray-400 border-2">
      {tileProp.tileData.isDisplayed ||
        (tileProp.isGameOver && (
          <>
            {tileProp.tileData.isFlagged
              ? ">"
              : tileProp.tileData.isBomb
                ? "B"
                : tileProp.tileData.numberDisplay}
          </>
        ))}
      {!tileProp.tileData.isDisplayed && (
        <button
          className="w-full h-full outline-offset-4 outline-stone-100 bg-white"
          onClick={() =>
            tileProp.updateTileClick(
              tileProp.tileData.x,
              tileProp.tileData.y,
              false,
            )
          }
        ></button>
      )}
    </div>
  );
}

export default Tile;
