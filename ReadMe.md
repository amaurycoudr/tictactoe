# TicTacToe

this package provides a simple API to play at the Tic Tac Toe

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

A box at undefined is empty

## API Reference

The package expose 5 functions:

- getEmptyInBoard
- makePlay
- getWinner
- isDraw
- printBoard

### getEmptyInBoard (board: BoardState)=> Coordinate[]

this function take in arguement a board an return the list of the emptyBoxes in this board

```ts
const board = [
  [undefined, 'X', '0'],
  [undefined, 'X', '0'],
  [undefined, 'X', '0'],
];

const emptyBoxes = getEmptyInBoard(board);

const result = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
];

emptyBox === result;
```

