import { either } from "fp-ts";
import * as A from "fp-ts/lib/Array";
import { Applicative, Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getLineAroundCoordinate } from "./getters";
import { BoardState, Box, Coordinate, LINES, Play, Player, RowState } from "./type";
import { isDefined, isSameCoordinate, isUndefined } from "./typeGuard";

export const forEachBox = (board: BoardState, callback: (coordinate: Coordinate) => void) => {
  for (let y = 0; y < board.length; y++)
    for (let x = 0; x < (board[y]?.length || 0); x++) callback({ x, y });
};

const updateBox = (currentBox: Box, player: Player): Either<Error, Box> =>
  isUndefined(currentBox) ? either.right(player) : either.left(new Error("Box is not empty"));

const updateBoxIfSameCoordinate =
  ({ y, play }: { y: number; play: Play }) =>
  (x: number, box: Box) =>
    isSameCoordinate(play.coordinate, { x, y }) ? updateBox(box, play.player) : either.right(box);

export const updateRowBoxIfSameCoordinate =
  (play: Play) =>
  (y: number, currentRow: RowState): Either<Error, RowState> =>
    pipe(
      currentRow,
      A.mapWithIndex(updateBoxIfSameCoordinate({ y, play })),
      A.sequence(Applicative)
    );

export const isWinningBox = (board: BoardState, coordinate: Coordinate): boolean =>
  pipe(LINES, A.map(getLineAroundCoordinate(board, coordinate)), A.some(isWinningLine));

const isWinningLine = ([box1, box2, box3]: RowState) =>
  isDefined(box1) && box1 === box3 && box2 === box3;

const printBox = (box: Box): string => {
  return box ? box : " ";
};
export const printRow = (row: RowState): string => {
  return "| " + row.map(printBox).join(" | ") + " |";
};
