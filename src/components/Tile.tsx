import { useEffect, useState } from "react";
import { GameTileProp } from "./Minesweeper";

interface TileProp {
  tileData: GameTileProp;
  isGameOver: boolean;
  updateTileClick: (x: number, y: number) => void;
}

function Tile({ tileData, isGameOver, updateTileClick }: TileProp) {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(tileData.isDisplayed);
  const [isFlagged, setIsFlagged] = useState<boolean>(tileData.isFlagged);
  const displayTile = isGameOver || (isDisplayed && !tileData.isFlagged);

  useEffect(() => {
    setIsDisplayed(isGameOver || tileData.isDisplayed);
  }, [isGameOver, tileData.isDisplayed]);

  useEffect(() => {
    setIsFlagged(tileData.isFlagged);
  }, [isGameOver, tileData.isFlagged]);

  function localClick() {
    updateTileClick(tileData.x, tileData.y);
    setIsDisplayed(true);
    setIsFlagged(false);
  }

  return (
    <div className="size-11 border-solid border-gray-400 border-2">
      {displayTile && (
        <>
          <div>
            {tileData.isBomb
              ? "B"
              : tileData.numberDisplay === "0"
                ? ""
                : tileData.numberDisplay}
          </div>
          {/* {`${tileProp.tileData.x}, ${tileProp.tileData.y}`} */}
        </>
      )}
      {!displayTile && (
        <button
          className="w-full h-full outline-offset-4 outline-stone-100 bg-white"
          onClick={() => localClick()}
        >
          {isFlagged ? ">" : ""}
        </button>
      )}
    </div>
  );
}

export default Tile;
