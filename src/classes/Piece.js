class Piece {
  constructor(piece, player, square) {
    this.symbol = piece.symbol;
    this.name = piece.name;
    this.player = player;
    this.square = square;
  }
}

export default Piece;
