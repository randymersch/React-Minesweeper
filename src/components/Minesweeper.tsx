import { useEffect, useState } from "react";
import Banner from "./Banner";
import Tiles from "./Tiles";

function generateGameBoard(): GameTileProp[][] {
  const maxWidth = 9;
  const maxHeight = 9;
  const maxBombs = maxWidth + maxHeight;
  let numberBombs = 0;

  const newGameBoard = Array.from({ length: maxWidth }, () =>
    Array(maxHeight).fill({} as GameTileProp),
  );

  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
      newGameBoard[x][y] = {
        isBomb: generateIsABomb(),
        isDisplayed: false,
        isFlagged: false,
        x: x,
        y: y,
        numberDisplay: "",
      } as GameTileProp;
    }
  }

  //calc the numbers
  for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
      const currentTile = newGameBoard[x][y];

      if (currentTile.isBomb) {
        break;
      }
      const left = x > 0 && newGameBoard[x - 1][y].isBomb;
      const topLeft = x > 0 && y > 0 && newGameBoard[x - 1][y - 1].isBomb;
      const top = y > 0 && newGameBoard[x][y - 1].isBomb;
      const topRight =
        x < maxWidth && y > 0 && newGameBoard[x + 1][y - 1].isBomb;
      const right = x < maxWidth && newGameBoard[x + 1][y].isBomb;
      const rightBottom =
        x < maxWidth && y < maxHeight && newGameBoard[x + 1][y + 1].isBomb;
      const bottom = y < maxHeight && newGameBoard[x][y + 1].isBomb;
      const bottomLeft =
        x > 0 && y < maxHeight && newGameBoard[x - 1][y + 1].isBomb;
      const surroundingTiles = [
        left,
        topLeft,
        top,
        topRight,
        right,
        rightBottom,
        bottom,
        bottomLeft,
      ];

      let numBombs = 0;

      console.log("surrounding");
      console.log(surroundingTiles);
      for (let i = 0; i < surroundingTiles.length; i++) {
        if (surroundingTiles[i]) {
          ++numBombs;
        }
      }

      currentTile.numberDisplay = numBombs.toString();
    }
  }

  return newGameBoard;

  function generateIsABomb(): boolean {
    if (numberBombs < maxBombs && Math.random() < 1 / (maxHeight / 2)) {
      numberBombs++;
      return true;
    }
    return false;
  }
}

export interface GameTileProp {
  isDisplayed: boolean;
  isBomb: boolean;
  isFlagged: boolean;
  numberDisplay: string;
  x: number;
  y: number;
}

function Minesweeper() {
  const [gameBoard, setGameBoard] = useState<GameTileProp[][]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(true);

  function handleStartGameClick(): void {
    setIsGameOver(false);
    setGameBoard(generateGameBoard());
  }
  function handleUpdateTileClick(
    x: number,
    y: number,
    isRightClick: boolean,
  ): void {
    const tile = gameBoard[x][y] as GameTileProp;
    alert(`isBomb: ${tile.isBomb}`);
    if (!isRightClick) {
      tile.isDisplayed = true;
      if (tile.isBomb && !tile.isFlagged) {
        setIsGameOver(true);
      }
    } else {
      tile.isFlagged = true;
    }
  }

  return (
    <>
      {isGameOver && <div>Game over!!</div>}

      <div className="bg-gray-200 border-solid border-4 border-gray-500 w-56">
        <Banner
          gameBoard={gameBoard}
          isGameOver={isGameOver}
          startGameClick={handleStartGameClick}
        />
        {
          <Tiles
            gameBoard={gameBoard}
            isGameOver={isGameOver}
            updateTileClick={handleUpdateTileClick}
          />
        }
      </div>
    </>
  );
}

export default Minesweeper;
