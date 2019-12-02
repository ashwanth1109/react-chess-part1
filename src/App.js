import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContainer, ChessBoard, Row, NewGameButton, Square } from "./styles";
import Game from "./classes/Game";

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
                {piece && <FontAwesomeIcon icon={piece.symbol} />}
              </Square>
            ))}
          </Row>
        ))}
      </ChessBoard>
    </AppContainer>
  );
};
