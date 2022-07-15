# TicTacToe

this package provides a simple API to play at the Tic Tac Toe

```
    -------------
    | X | O | O |
    -------------
    | O | X | X |
    -------------
    | O | O | X |
    -------------
```

## Instalation

```bash
yarn add amaurycoudr-tictactoe
#or
npm i amaurycoudr-tictactoe
```

## Data strucutre

The **Board** is represented by an array of array of **Box**

```typescript
type Box = 'X' | 'O' | undefined;

type RowState = [Box, Box, Box];

type BoardState = [RowState, RowState, RowState];
```

:warning: A box at **undefined is empty**

## API Reference

The package expose 5 functions:

- getEmptyInBoard
- makePlay
- getWinner
- isDraw
- printBoard

### getEmptyInBoard (board: BoardState)=> Coordinate[]

This function take in arguement a board and return the list of the emptyBoxes in this board

```ts
const emptyBoxes = getEmptyInBoard([
  [undefined, 'X', '0'],
  [undefined, 'X', '0'],
  [undefined, 'X', '0'],
]);

const result = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
];

console.log(emptyBox === result); // true
```

### makePlay (board: BoardState, play: Play) => BoardState

This function take in argument a board and a play and return the board afer the play

```ts
const play = { coordinate: { x: 0, y: 0 }, player: 'X' };
const board = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

const newBoard = makePlayer(board, play);

const result = [
  ['X', undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

console.log(newBoar === result); // true
```

:warning: **It will throw an a error if the box is not empty**

### getWinner (board: BoardState) => "X" | "O" | undefined

This function wil return of the party if there is no return it return undefined

```ts
const board = [
  ['X', undefined, undefined],
  [undefined, 'X', undefined],
  [undefined, undefined, 'X'],
];

const winner = getWinner(board);

const result = 'X';

console.log(winner === result); // true
```

### isDraw (board: BoardState) => boolean

This function wil return true if the party is a draw

```ts
const board = [
  ['X', 'X', 'O'],
  ['O', 'O', 'X'],
  ['X', 'O', 'X'],
];

const draw = isDraw(board);

const result = false;

console.log(draw === result); // true
```
