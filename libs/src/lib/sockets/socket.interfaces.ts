import { IGame, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank } from "../game";

export interface IGameActions {
  createGame: (room: string) => void;

  joinRoom: (room: string) => void;

  leaveRoom: (callback: VoidFunction) => void;

  joinGame: (player: INewPlayer) => void;

  joinGameToToken: (player: INewPlayer) => void;

  leaveGame: (callback: VoidFunction) => void;

  restoreGame: (room: string, game: IGame) => void;
}

export interface IPaymentActions {
  paymentP2P: (data: IP2PPayment) => void;
  
  paymentToBank: (data: IPaymentToBank) => void;

  paymentToPlayer: (data: IPaymentFromBank) => void;
}

export interface ISocketActions extends IGameActions, IPaymentActions{}