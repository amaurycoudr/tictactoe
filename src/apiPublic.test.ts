import { getEmptyInBoard, getWinner, isDraw, makePlay, printBoard } from './apiPublic';
import { BoardState, Coordinate } from './type';
import { printRow } from './utils';

// test of printBoard.ts

const emptyBoard: BoardState = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];
const emptyCoordinates: Coordinate[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
];

const xBoard: BoardState = [
  ['X', 'X', 'X'],
  ['X', 'X', 'X'],
  ['X', 'X', 'X'],
];
const xWinnerBoard: BoardState = [
  ['X', 'X', 'X'],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

const oWinnerBoard: BoardState = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  ['O', 'O', 'O'],
];
const drawBoard: BoardState = [
  ['X', 'O', 'X'],
  ['O', 'X', 'O'],
  ['O', 'X', 'O'],
];

describe(`test of ${getEmptyInBoard.name}()`, () => {
  it('should return all the coordinates for an empty board', () => {
    const coordinates = getEmptyInBoard(emptyBoard);
    expect(coordinates).toStrictEqual(emptyCoordinates);
  });

  it('should return an empty array for a board with no empty coordinates', () => {
    const coordinates = getEmptyInBoard(xBoard);
    expect(coordinates).toStrictEqual([]);
  });

  it('should return {x:0, y:0} if it is the only empty coordinate', () => {
    const board: BoardState = [
      [undefined, 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];
    const coordinates = getEmptyInBoard(board);
    expect(coordinates).toStrictEqual([{ x: 0, y: 0 }]);
  });
  it('should return {x:1, y:1} if it is the only empty coordinate', () => {
    const board: BoardState = [
      ['X', 'X', 'X'],
      ['X', undefined, 'X'],
      ['X', 'X', 'X'],
    ];
    const coordinates = getEmptyInBoard(board);
    expect(coordinates).toStrictEqual([{ x: 1, y: 1 }]);
  });
  it('should return {x:2, y:2} if it is the only empty coordinate', () => {
    const board: BoardState = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', undefined],
    ];
    const coordinates = getEmptyInBoard(board);
    expect(coordinates).toStrictEqual([{ x: 2, y: 2 }]);
  });
});

describe(`test of ${makePlay.name}()`, () => {
  it('should return the board with an X in {x:0, y:0} for the play { coordinate: { x: 0, y: 0 }, player: "X" } ', () => {
    const newBoard = makePlay(emptyBoard, { coordinate: { x: 0, y: 0 }, player: 'X' });
    expect(newBoard).toStrictEqual([
      ['X', undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
  });
  it('should return the board with an 0 in {x:2, y:1} for the play { coordinate: { x: 2, y: 1 }, player: "O" } ', () => {
    const newBoard = makePlay(emptyBoard, { coordinate: { x: 2, y: 1 }, player: 'O' });
    expect(newBoard).toStrictEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, 'O'],
      [undefined, undefined, undefined],
    ]);
  });
  it('should throw an error if the coordinate is not empty', () => {
    const newBoard = () => makePlay(xBoard, { coordinate: { x: 0, y: 0 }, player: 'X' });
    expect(newBoard).toThrowError('Box is not empty');
  });
});

describe(`test of ${getWinner.name}`, () => {
  it('should return "X" if the board is a win for "X"', () => {
    const winner = getWinner(xWinnerBoard);
    expect(winner).toBe('X');
  });
  it('should return "O" if the board is a win for "O"', () => {
    const winner = getWinner(oWinnerBoard);
    expect(winner).toBe('O');
  });
  it('should return undefined if the board is not a win', () => {
    const winner = getWinner(emptyBoard);
    expect(winner).toBeUndefined();
  });
});

describe(`test of ${isDraw.name}`, () => {
  it('should return false if the board is not full', () => {
    const result = isDraw(emptyBoard);
    expect(result).toBe(false);
  });
  it('should return false if their is a winner', () => {
    const result = isDraw(xWinnerBoard);
    expect(result).toBe(false);
  });
  it('should return true if the board is full and there is no winner', () => {
    const result = isDraw(drawBoard);
    expect(result).toBe(true);
  });
});

describe(`test of ${printBoard.name}`, () => {
  it('should return a string with the board', () => {
    const board: BoardState = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];
    const result = printBoard(board);
    console.log(result);

    expect(result).toBe(
      `\n-------------\n${board.map(printRow).join('\n-------------\n')}\n-------------\n`
    );
  });
});
