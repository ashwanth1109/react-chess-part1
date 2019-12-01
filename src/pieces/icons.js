import {
  faChessKing,
  faChessQueen,
  faChessBishop,
  faChessKnight,
  faChessRook,
  faChessPawn
} from "@fortawesome/free-solid-svg-icons";

export const king = {
  symbol: faChessKing,
  name: "king"
};
export const queen = {
  symbol: faChessQueen,
  name: "queen"
};
export const rook = {
  symbol: faChessRook,
  name: "rook"
};
export const bishop = {
  symbol: faChessBishop,
  name: "bishop"
};
export const knight = {
  symbol: faChessKnight,
  name: "knight"
};
export const pawn = {
  symbol: faChessPawn,
  name: "pawn"
};

export const specialRow = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook
];
