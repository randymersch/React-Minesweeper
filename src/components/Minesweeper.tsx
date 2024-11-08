import { useState } from "react";
import Banner from "./Banner";
import Tiles from "./Tiles";
import Tile from "./Tile";

function generateGameBoard(): GameTileProp[][] {
  const maxWidth = 9;
  const maxHeight = 9;
  const maxBombs = 9;
  let numberBombs = 0;

  // const newGameBoard = Array<GameTileProp[]>(maxWidth).fill(
  //   new Array(maxHeight).fill({} as GameTileProp),
  // );

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
      } as GameTileProp;
    }
  }

  return newGameBoard;

  function generateIsABomb(): boolean {
    if (numberBombs < maxBombs && Math.random() < 1 / maxHeight) {
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
  x: number;
  y: number;
}

function Minesweeper() {
  const [gameBoard, setGameBoard] = useState<GameTileProp[][]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(true);

  function handleStartGameClick(): void {
    console.log("start game");
    setIsGameOver(false);
    setGameBoard(generateGameBoard());
  }
  function handleUpdateTileClick(
    x: number,
    y: number,
    isRightClick: boolean,
  ): void {
    console.log("tile clicked");
    const tile = gameBoard[x][y] as GameTileProp;
    console.log(tile);
    if (!isRightClick) {
      tile.isDisplayed = true;
      if (tile.isBomb) {
        setIsGameOver(true);
      }
    } else {
      tile.isFlagged = true;
    }
  }

  return (
    <div className="bg-gray-200 border-solid border-4 border-gray-500 w-56">
      <Banner gameBoard={gameBoard} startGameClick={handleStartGameClick} />
      {!isGameOver && (
        <Tiles gameBoard={gameBoard} updateTileClick={handleUpdateTileClick} />
      )}
      {isGameOver && <div>Game over!!</div>}
    </div>
  );
}

export default Minesweeper;
