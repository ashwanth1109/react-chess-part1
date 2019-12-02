Link to video:

## Transcript

### Nano React App and Parcel

To set up a boilerplate react application, we use `nano-react-app`.

You might be familiar with `create-react-app`. It is a quick way to kickstart a boilerplate react application bundled using Webpack, all with one single command.

For fun projects that last barely a week, I found that create-react-app is overkill. More often than not, I end up stripping the template to a more minimal version. What's more exasperating, is the pain involved when working with webpack config.

I started looking around for a solution and that's when I found `nano-react-app`. A very minimal web app bundled using parcel.

```
$ npx nano-react-app react-chess
```

Once you have finished creating the app, you install the dependencies and start the project using the command:

```
$ cd react-chess && npm install && npm start
```

### Installing styled components

Once we have our app running, we start writing our code in the `App.js` file. First, we need to set up a board that is 600px \* 600px in dimensions. We choose these dimensions, because most web browsers are higher than this.

To apply styles to our board as we are building it, we will use `styled-components`. Styled Components is an incredible system for styling React Components due to several reasons:

- Lets you write css styles with the same format (unlike when writing styles inline in react)
- No need for class names since the component itself refers to the css styles
- Easier to understand component nesting
- Simple dynamic prop based styling
- React-like feel because of components

You can install [styled-components](https://www.npmjs.com/package/styled-components) using the command:

```
npm i styled-components
```

### Picking the color palette

We then choose a color palette for the app. I browsed around `coolors.co` till I came up with this [color palette](https://coolors.co/ffffff-5096f3-1f292e-b91372-adaabf).

We define them as constants in a colors file.

```js
// square colors
export const white = "#fff";
export const blueberry = "#5096F3";

// piece colors
export const redViolet = "#B91372";
export const darkGunmetal = "#1F292E";

// backdrop
export const silverChalice = "#ADAABF";
```

### React Functional Component

We then move on to creating a container and a chess board for our app using styled components.

```js
import React from "react";

export default () => {
  return (
    <AppContainer>
      <ChessBoard></ChessBoard>
    </AppContainer>
  );
};
```

### Writing Styles using Styled Components

The styled components will be as follows:

```js
import styled from "styled-components";
import {
  white,
  blueberry,
  silverChalice,
  redViolet,
  darkGunmetal
} from "./colors";

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${silverChalice};
`;

export const ChessBoard = styled.div`
  width: 600px;
  height: 600px;
  background: ${white};
  display: flex;
  flex-direction: column;
`;
```

### Writing Classes in React

In order to create a board, I chose to do it using a class, since I wanted the game to have self-contained methods that can help with the game logic.

There are three classes you want to create.

- **Game**: which keeps track of game progress, the board and positions of the pieces
- **Square**: which keeps track of its own position on the board and whether it has a piece on it or not
- **Piece**: which keeps track of the type of piece (e.g. king, queen etc.) and which player it belongs to.

**Piece Class**:

```js
class Piece {
  constructor(symbol, player) {
    this.symbol = symbol;
    this.player = player;
  }
}

export default Piece;
```

**Square Class**:

```js
class Square {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isWhite = (row + col) % 2 === 0;
  }

  attachPiece(piece) {
    this.piece = piece;
  }
}

export default Square;
```

The square class has a method called `attachPiece`, which creates a pointer to the piece that is present on the square, thus enabling the square to track pieces. Each square also knows whether it is a white square or a blue square.

### Using a class to render UI

The Game class will contain most of our logic.

We initialize our game board as an array in the class' constructor.

```js
class Game {
  constructor() {
    this.board = [];
  }
}
```

We then create the game board in the constructor by calling the `createBoard()` method.

```js
class Game {
  createBoard() {
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) row.push(new Square(i + 1, j + 1));
      this.board.push(row);
    }
  }
}
```

The board contains an array of rows and each row contains an array of squares.

### useState react hook

We want to use our Game object in the app. But we want to maintain each game in the state. When we start a new game, we can reset the game easily by resetting the state to a new instance of the class. To use state in our app, we import in the useState from the react package.

```js
import { useState } from "react";
```

Inside our component, we call the useState hook to define the state of our game as an instance of the class Game.

```js
const [game, setGame] = useState(new Game());
```

Hooks are a new addition as part of the React 16.8 update. They let you abstact away stateful logic and side effects into reusable functions, so that they can be shared across components. If you've worked with React for a while, then you would have used something called renderProps or higher order components to reuse logic but they often require restructuring your components and is an overall a very painful way of reusing logic, especially when compared with hooks. Also, hooks let you work with functional components rather than classes which has been a pleasant experience to be honest. So, we'll try staying away from higher-order components and the component lifecycle methods in this series.

### Using Lists and Keys in React

The board that we created in the Game class constists of a nested array of rows which consist of squares. In React, there are several places where you need to render lists. To render a collection of elements you can map through an array and return an element for each value in JSX.

Keys need to be provided since it helps React identify which items in the list have changed and can keep portions of the DOM tree intact if they havent changed.

Note: A key only has to be unique amongst its siblings. It doesnt have to be unique across all global lists.

It is usually considered an anti-pattern to use the array indices as keys since items in an array can get reordered, therefore preventing React from being able to identify elements that change or dont change accordingly.

If the list is never re-ordered or filtered and the items are static (i.e. they are not computed and do not change), then its probably okay to use indices as keys.

```js
export default () => {
  const [game, setGame] = useState(new Game());

  return (
    <AppContainer>
      <ChessBoard>
        {game.board.map(row => (
          <Row key={row[0].row}>
            {row.map(({ isWhite, row, col, piece }) => (
              <Square
                isWhite={isWhite}
                key={`${row}-${col}`}
                isPlayer1={piece && piece.player === 1}
              >
                {
                  // The rendered piece should go here
                }
              </Square>
            ))}
          </Row>
        ))}
      </ChessBoard>
    </AppContainer>
  );
};
```

### Dynamic Rendering of Styled Components using Props

Row is a flex container styled component. Pretty straight-forward.

```js
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
```

Square has a little more going on though. It is a styled component that adapts its styling based on props that it is provided. It renders white or blue based on a boolean called isWhite. It also picks a font color based on whether it is player 1 or player 2. We will see this when we add the pieces.

```js
export const Square = styled.div`
  flex: 1;
  background: ${props => (props.isWhite ? white : blueberry)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: ${props => (props.isPlayer1 ? redViolet : darkGunmetal)};
`;
```

With this, you should be able to see a chess board render.

Now, we need to set all our pieces to their initial positions. Before we do this though, we need the icons for our game.

### Custom icons using Font Awesome

We install the necessary font awesome packages by running the following command.

```
npm i @fortawesome/react-fontawesome && npm i @fortawesome/free-solid-svg-icons
```

After installing the dependencies, we import in the icons. We export all the icons as an object called `pieces`.

```js
import {
  faChessKing,
  faChessQueen,
  faChessBishop,
  faChessKnight,
  faChessRook,
  faChessPawn
} from "@fortawesome/free-solid-svg-icons";

export const pieces = {
  king: faChessKing,
  queen: faChessQueen,
  bishop: faChessBishop,
  knight: faChessKnight,
  rook: faChessRook,
  pawn: faChessPawn
};
```

We also export the order and arrangement of the special chess pieces on the board as an array of strings.

```js
export const specialRow = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook"
];
```

We can render this later by passing the icons into a FontAwesomeIcon component from the react-fontawesome package.

```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<FontAwesomeIcon icon={faChessKing} />;
```

### DRY as a software engineering principle

In order to set all our chess pieces to their initial positions, we will define and call a method in our class called `setPiecesToInitialPosition()`.

In order to set our special pieces & pawns in their initial positions, we import in our Game class, the pieces object and specialRow array we defined earlier.

```js
import { specialRow, pieces } from "../pieces/icons";
```

Before we create the method, we need to keep in mind a very important software engineering principle called DRY (or Don't Repeat Yourself). It is this idea that repeating the same code in different places is a bad idea. By maintaining your code in one place and reusing it, any changes you make in the future need to be made only once and it makes it easier to debug and apply bug fixes across your entire code base.

Note that, for a game of chess, you need to set pieces for two players (repeat 2 times). For each player you need to set 8 special pieces (repeat 8 times) and for each special piece, you need to set the special piece and a pawn in front of it (repeat 2 times).

We can keep our code DRY by abstracting these away into smaller functions that you can then reuse for setting the pieces to their initial positions. We can extend the class Game's functionality by adding these methods. When I started I used to wonder as to when to abstract logic into reusable functions. What I've realized over time is that premature optimization is more harmful than beneficial. The general principle I follow now is, I write the code in the main function and then if I find myself writing the same piece of code twice, then I abstract away into smaller reusable functions.

```js
class Game {
  setPieceToSquare(symbol, player, square) {
    square.attachPiece(new Piece(symbol, player));
  }

  // set special piece and a pawn in front of it
  setSpecialAndPawn(player, piece, position) {
    const [row, next] = player === 1 ? [0, 1] : [7, 6];
    this.setPieceToSquare(
      pieces[`${piece}`],
      player,
      this.board[row][position]
    );
    this.setPieceToSquare(pieces["pawn"], player, this.board[next][position]);
  }

  setPiecesForPlayer(player) {
    specialRow.map((piece, id) => this.setSpecialAndPawn(player, piece, id));
  }

  setPiecesToInitialPosition() {
    this.setPiecesForPlayer(1);
    this.setPiecesForPlayer(2);
  }
}
```

### Conditional Rendering in React

Once we have set the pieces inside specific squares, we need to render them as UI. Note that, there are some squares that contain pieces and some that don't.
So, we have to conditionally render the FontAwesomeIcon component based on whether there is a piece present in the square or not.

There are several patterns to conditionally render in React. You can use if-else or ternary operators to render one element or an alternative element. In our case we want to render an element only if the item is present. So, we choose to render it in JSX with inline logical AND operator. It works because in Javascript, true && expression always evaluates to the expression or in this case the JSX of the component we want to conditionally render. If its false, React will ignore it and skip it.

```jsx
<Square
  isWhite={isWhite}
  key={`${row}-${col}`}
  isPlayer1={piece && piece.player === 1}
>
  {piece && <FontAwesomeIcon icon={piece.symbol} />}
</Square>
```

With all of these pieces together, you should now have a chess board in its initial state. That concludes the scope of this tutorial. In the next one, we will work on adding click events to move pieces and the move logic for the different pieces.
