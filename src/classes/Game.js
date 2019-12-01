import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import Square from "./Square";
import Piece from "./Piece";
import { specialRow, pawn } from "../pieces/icons";

class Game {
  constructor() {
    this.board = [];
    // create the board
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) row.push(new Square(i + 1, j + 1));
      this.board.push(row);
    }

    this.setPiecesToInitialPosition();
  }

  setPieceToSquare(pieceObj, player, square) {
    const piece = new Piece(pieceObj, player, square);
    square.attachPiece(piece);
  }

  setSpecialAndPawn(player, piece, position) {
    const [row, next] = player === 1 ? [0, 1] : [7, 6];
    // set special piece
    this.setPieceToSquare(piece, player, this.board[row][position]);
    // set pawn in front of special piece
    this.setPieceToSquare(pawn, player, this.board[next][position]);
  }

  setPiecesToInitialPosition() {
    // set player 1 pieces
    specialRow.map((specialPiece, id) => {
      this.setSpecialAndPawn(1, specialPiece, id);
    });
    // set player 2 pieces
    specialRow.reverse().map((specialPiece, id) => {
      this.setSpecialAndPawn(2, specialPiece, id);
    });
  }
}

export default Game;
