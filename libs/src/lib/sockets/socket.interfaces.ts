import { IGame, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank } from "../game";

export interface IGameActions {
  createGame: (room: string) => void;

  joinRoom: (room: string) => void;

  leaveRoom: (room: string) => void;

  joinGame: (room: string, player: INewPlayer) => void;

  joinGameToToken: (room: string, player: INewPlayer) => void;

  leaveGame: (room: string) => void;

  restoreGame: (room: string, game: IGame) => void;
}

export interface IPaymentActions {
  paymentP2P: (room: string, data: IP2PPayment) => void;
  
  paymentToBank: (room: string, data: IPaymentToBank) => void;

  paymentToPlayer: (room: string, data: IPaymentFromBank) => void;
}

export interface ISocketActions extends IGameActions, IPaymentActions{}