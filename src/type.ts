export type Row<T> = T[];
type Board<T> = Row<T>[];

export type Player = "X" | "O";
export type Box = Player | undefined;
export type RowState = Row<Box>;
export type BoardState = Board<Box>;

export type Play = {
  coordinate: Coordinate;
  player: Player;
};
export type Coordinate = {
  y: number;
  x: number;
};

export const LEFT_RIGHT = [
  { y: 0, x: -1 },
  { y: 0, x: 1 },
] as const;
export const UP_DOWN = [
  { y: -1, x: 0 },
  { y: 1, x: 0 },
] as const;
export const DIAGONAL_LEFT_BOTTOM = [
  { y: 1, x: -1 },
  { y: -1, x: 1 },
] as const;
export const DIAGONAL_LEFT_UP = [
  { y: -1, x: -1 },
  { y: 1, x: 1 },
] as const;

export const LINES = [LEFT_RIGHT, UP_DOWN, DIAGONAL_LEFT_BOTTOM, DIAGONAL_LEFT_UP];
export type Line = typeof LINES[number];
