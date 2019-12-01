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
