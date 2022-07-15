import * as A from "fp-ts/lib/Array";
import { Applicative, isLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getBox, getEmptyInRow } from "./getters";
import { BoardState, Play, Player } from "./type";
import { isUndefined } from "./typeGuard";
import { forEachBox, isWinningBox, printRow, updateRowBoxIfSameCoordinate } from "./utils";

/**
 *
 * @param board
 * @returns coordinates of empty boxes
 */
export const getEmptyInBoard = (board: BoardState) =>
  pipe(board, A.mapWithIndex(getEmptyInRow), A.flatten);

/**
 * @param board
 * @param play
 * @returns new board with updated box
 * @throws Error if box is not empty
 */
export const makePlay = (board: BoardState, play: Play): BoardState => {
  const newBoard = pipe(
    board,
    A.mapWithIndex(updateRowBoxIfSameCoordinate(play)),
    A.sequence(Applicative)
  );
  if (isLeft(newBoard)) throw new Error(newBoard.left.message);
  return newBoard.right;
};

/**
 * @param board
 * @returns winner of the game or undefined if no winner
 */
export const getWinner = (board: BoardState): Player | undefined => {
  let winner: Player | undefined;

  forEachBox(board, (coordinate) => {
    if (isWinningBox(board, coordinate) && isUndefined(winner)) {
      winner = getBox(board, coordinate);
    }
  });
  return winner;
};

/**
 * @param board
 * @returns true if game is over and there is no winner
 */
export const isDraw = (board: BoardState): boolean => {
  return getEmptyInBoard(board).length === 0 && !getWinner(board);
};

/**
 *
 * @param board
 * @returns representation of board
 */
export const printBoard = (board: BoardState): string => {
  return "\n-------------\n" + board.map(printRow).join("\n-------------\n") + "\n-------------\n";
};
