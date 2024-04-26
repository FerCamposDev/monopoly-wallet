import { IGameProps, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank } from "../game";

export interface IGameActions {
  createGame: (room: string) => void;

  joinRoom: (room: string, callback?: VoidFunction) => void;

  leaveRoom: (callback: VoidFunction) => void;

  joinGame: (player: INewPlayer) => void;

  joinGameToToken: (player: INewPlayer) => void;

  leaveGame: (callback: VoidFunction) => void;

  restoreGame: (room: string, game: IGameProps) => void;
}

export interface IPaymentActions {
  paymentP2P: (data: IP2PPayment, callback: VoidFunction) => void;
  
  paymentToBank: (data: IPaymentToBank, callback: VoidFunction) => void;

  paymentToPlayer: (data: IPaymentFromBank, callback: VoidFunction) => void;
}

export interface ISocketActions extends IGameActions, IPaymentActions{}