import { Token } from "./token.enum";

export interface IPlayer {
  socketId: string;
  name: string;
  token: Token;
  balance: number;
}

export interface IGameProps {
  room: string;
  players: IPlayer[];
}

export interface IGameMethods {
  addPlayer(player: IPlayer): void;
  removePlayerByToken(token: Token): void;
  disconnectPlayerById(playerId: string): void;
  connectPlayerById(playerId: string, token: Token): void;
  paymentP2P(from: IPlayer, to: IPlayer, amount: number): void;
  paymentToBank(from: IPlayer, amount: number): void;
  paymentToPlayer(to: IPlayer, amount: number): void;
}

export interface IGame extends IGameProps, IGameMethods {}

export interface IGamesByRoom {
  [room: string]: IGame
}