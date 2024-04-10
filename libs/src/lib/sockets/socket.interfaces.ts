import { IGame, IPlayer, Token } from "../game";
import { PaymentReason } from "./sockets.enums";

export interface IGameActions {
  createGame: (room: string) => void;

  joinRoom: (room: string) => void;

  leaveRoom: (room: string) => void;

  joinGame: (room: string, player: IPlayer) => void;

  joinGameToToken: (room: string, token: Token) => void;

  leaveGame: (room: string, player: IPlayer) => void;

  restoreGame: (room: string, game: IGame) => void;
}

export interface IPaymentActions {
  paymentP2P: (game: IGame, from: IPlayer, to: IPlayer, amount: number, reason: PaymentReason) => void;
  
  paymentToBank: (game: IGame, from: IPlayer, amount: number, reason: PaymentReason) => void;

  paymentToPlayer: (game: IGame, to: IPlayer, amount: number, reason: PaymentReason) => void;
}

export interface ISocketActions extends IGameActions, IPaymentActions{}