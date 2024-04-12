import { createContext } from "react";
import { GameContextTypes } from './types';
import { TOKEN_OPTIONS } from "@monopoly-wallet/shared-types";

const GameContext = createContext<GameContextTypes>({
  game: null,
  setGame: () => {},
  player: null,
  setPlayer: () => {},
  availableTokens: TOKEN_OPTIONS,
})

export default GameContext;
