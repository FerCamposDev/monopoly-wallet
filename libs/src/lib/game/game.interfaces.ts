import { Option } from "../ui";
import { Token } from "./token.enum";

export interface IPlayer {
  socketId: string;
  name: string;
  token: Token;
  balance: number;
}

export interface IGame {
  room: string;
  players: IPlayer[];
  addPlayer(player: IPlayer): void;
  removePlayerByToken(token: Token): void;
  disconnectPlayerById(playerId: string): void;
  connectPlayerById(playerId: string, token: Token): void;
  updatePlayerBalanceByToken(token: Token, payment: number): void;
  availableTokens: Option<Token>[];
}

export interface IGamesByRoom {
  [room: string]: IGame
}