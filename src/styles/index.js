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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const Square = styled.div`
  flex: 1;
  background: ${props => (props.isWhite ? white : blueberry)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: ${props => (props.isPlayer1 ? redViolet : darkGunmetal)};
`;
