import { useState } from "react";
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

  for (let x = 0; x < maxWidth; x++) {
    for (let y = 0; y < maxHeight; y++) {
      newGameBoard[y][x] = {
        isBomb: generateIsABomb(),
        isDisplayed: false,
        isFlagged: false,
        x: x,
        y: y,
        numberDisplay: "",
      } as GameTileProp;
    }
  }

  for (let x = 0; x < maxHeight; x++) {
    for (let y = 0; y < maxWidth; y++) {
      const currentTile = newGameBoard[x][y];

      //TODO: refactor this to an array
      const left = x > 0 && newGameBoard[x - 1][y].isBomb;
      const topLeft = x > 0 && y > 0 && newGameBoard[x - 1][y - 1].isBomb;
      const top = y > 0 && newGameBoard[x][y - 1].isBomb;
      const topRight =
        x < maxWidth - 1 && y > 0 && newGameBoard[x + 1][y - 1].isBomb;
      const right = x < maxWidth - 1 && newGameBoard[x + 1][y].isBomb;
      const rightBottom =
        x < maxWidth - 1 &&
        y < maxHeight - 1 &&
        newGameBoard[x + 1][y + 1].isBomb;
      const bottom = y < maxHeight - 1 && newGameBoard[x][y + 1].isBomb;
      const bottomLeft =
        x > 0 && y < maxHeight - 1 && newGameBoard[x - 1][y + 1].isBomb;
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
  const [isMark, setIsMark] = useState<boolean>(false);

  function handleStartGameClick(): void {
    setIsGameOver(false);
    setGameBoard(generateGameBoard());
  }
  function handleUpdateTileClick(x: number, y: number): void {
    if (isGameOver || gameBoard[y][x].isDisplayed) {
      return;
    }

    const tile = gameBoard[y][x] as GameTileProp;
    if (!isMark) {
      tile.isDisplayed = true;
      if (tile.isBomb && !tile.isFlagged) {
        setIsGameOver(true);
      }
    } else {
      tile.isFlagged = !tile.isFlagged;
    }
  }

  return (
    <>
      {isGameOver && <div>Game over!!</div>}

      <div className="bg-gray-200 border-solid border-4 border-gray-500">
        <Banner
          gameBoard={gameBoard}
          isGameOver={isGameOver}
          startGameClick={handleStartGameClick}
          isMark={isMark}
          toggleIsMark={() => setIsMark(!isMark)}
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
