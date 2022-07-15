import { Coordinate } from './type';

export const isUndefined = <T>(value: T | undefined): value is undefined => value === undefined;

export const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

export const isSameCoordinate = (coordinate: Coordinate, otherCoordinate: Coordinate) =>
  coordinate.x === otherCoordinate.x && coordinate.y === otherCoordinate.y;
