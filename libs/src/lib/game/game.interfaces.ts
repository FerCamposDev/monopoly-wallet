import { PaymentReason } from "../sockets";
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
  disconnectPlayerById(playerId: string): IPlayer;
  connectPlayerById(playerId: string, player: INewPlayer): void;
  paymentP2P(paymentData: IP2PPayment): void;
  paymentToBank(paymentData: IPaymentToBank): void;
  paymentToPlayer(paymentData: IPaymentFromBank): void;
}

export interface IGame extends IGameProps, IGameMethods { }

export interface IGamesByRoom {
  [room: string]: IGame
}

interface IPaymentBase {
  amount: number;
  reason: PaymentReason;
}

export interface IP2PPayment extends IPaymentBase {
  from: IPlayer;
  to: IPlayer;
}

export interface IPaymentFromBank  extends IPaymentBase {
  to: IPlayer;
}

export interface IPaymentToBank extends IPaymentBase {
  from: IPlayer;
}

// export type IBankPayment = IPaymentFromBank | IPaymentToBank;