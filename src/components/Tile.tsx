import { useEffect, useState } from "react";
import { GameTileProp } from "./Minesweeper";

interface TileProp {
  tileData: GameTileProp;
  isGameOver: boolean;
  updateTileClick: (x: number, y: number, isRightClick: boolean) => void;
}

function Tile({ tileData, isGameOver, updateTileClick }: TileProp) {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(tileData.isDisplayed);
  const displayTile = isGameOver || isDisplayed;

  // useEffect(() => {
  //   console.log("changed: " + tileData.isDisplayed);
  //   console.log(tileData.x);
  // }, [tileData, updateTileClick]);

  function localClick() {
    console.log("local coffee");
    updateTileClick(tileData.x, tileData.y, false);
    setIsDisplayed(true);
  }

  return (
    <div className="size-11 border-solid border-gray-400 border-2">
      {displayTile && (
        <>
          <div>
            {tileData.isFlagged
              ? ">"
              : tileData.isBomb
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
        ></button>
      )}
    </div>
  );
}

export default Tile;
