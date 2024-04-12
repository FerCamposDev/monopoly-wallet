import { Token } from "./token.enum";

export interface INewPlayer {
  name: string;
  token: Token;
}

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
  addPlayer(player: INewPlayer, socketId: string): void;
  removePlayerByToken(token: Token): void;
  disconnectPlayerById(playerId: string): void;
  connectPlayerById(playerId: string, player: INewPlayer): void;
  paymentP2P(from: IPlayer, to: IPlayer, amount: number): void;
  paymentToBank(from: IPlayer, amount: number): void;
  paymentToPlayer(to: IPlayer, amount: number): void;
}

export interface IGame extends IGameProps, IGameMethods { }

export interface IGamesByRoom {
  [room: string]: IGame
}