import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/lib/Array';
import { BoardState, Box, Coordinate, Line, RowState } from './type';
import { isDefined } from './typeGuard';

const getCoardinateWhenEmpty =
  (y: number) =>
  (x: number, value: Box): Coordinate | undefined =>
    value ? undefined : { x, y };

export const getEmptyInRow = (y: number, row: RowState): Coordinate[] =>
  pipe(row, A.mapWithIndex(getCoardinateWhenEmpty(y)), A.filter(isDefined));

export const getBox = (board: BoardState, coordinate: Coordinate): Box =>
  board[coordinate.y]?.[coordinate.x];

const addCoordinate = ({ x: x1, y: y1 }: Coordinate, { x: x2, y: y2 }: Coordinate) => ({
  x: x1 + x2,
  y: y1 + y2,
});

export const getLineAroundCoordinate =
  (board: BoardState, coordinate: Coordinate) =>
  (line: Line): RowState =>
    [
      getBox(board, coordinate),
      getBox(board, addCoordinate(coordinate, line[1])),
      getBox(board, addCoordinate(coordinate, line[0])),
    ];
