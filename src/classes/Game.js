import Square from "./Square";
import Piece from "./Piece";
import { specialRow, pieces } from "../pieces/icons";

class Game {
  constructor() {
    this.board = [];
    // create the board
    this.createBoard();
    this.setPiecesToInitialPosition();
  }

  createBoard() {
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) row.push(new Square(i + 1, j + 1));
      this.board.push(row);
    }
  }

  setPieceToSquare(symbol, player, square) {
    square.attachPiece(new Piece(symbol, player));
  }

  setSpecialAndPawn(player, piece, position) {
    const [row, next] = player === 1 ? [0, 1] : [7, 6];
    // set special piece
    this.setPieceToSquare(
      pieces[`${piece}`],
      player,
      this.board[row][position]
    );
    // set pawn in front of special piece
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

export default Game;
