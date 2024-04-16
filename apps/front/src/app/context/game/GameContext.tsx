import { createContext } from "react";
import { GameContextTypes } from './types';
import { TOKEN_OPTIONS } from "../../commons/constants";
import { Token } from "@monopoly-wallet/shared-types";

export const initialGameState: GameContextTypes = {
  game: {
    room: '',
    players: []
  },
  setGame: () => { },
  player: {
    name: '',
    balance: 0,
    socketId: '',
    token: '' as Token
  },
  setPlayer: () => { },
  availableTokens: TOKEN_OPTIONS,
  reset: () => { },
  logs: [],
  setLogs: () => { },
}

const GameContext = createContext<GameContextTypes>(initialGameState)

export default GameContext;
