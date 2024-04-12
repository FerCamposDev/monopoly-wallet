import { IGame, INewPlayer, IPlayer, ISocketActions, PaymentReason, SocketAction, Token } from "@monopoly-wallet/shared-types";
import { Socket } from "socket.io-client";

export class SocketActions implements ISocketActions {
  private socket: Socket | null;

  constructor(socket: Socket | null) {
    this.socket = socket;
  }

  createGame = (room: string) => {
    try {
      this.socket?.emit(SocketAction.CREATE_GAME, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  restoreGame = (room: string, game: IGame) => {
    try {
      this.socket?.emit(SocketAction.RESTORE_GAME, game);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinRoom = (room: string) => {
    try {
      this.socket?.emit(SocketAction.JOIN_ROOM, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  leaveRoom = (room: string) => {
    try {
      this.socket?.emit(SocketAction.LEAVE_ROOM, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinGame = (room: string, player: INewPlayer) => {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME, room, player)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinGameToToken = (room: string, token: Token) => {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME_TO_TOKEN, room, token)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  leaveGame = (room: string) => {
    try {
      this.socket?.emit(SocketAction.LEAVE_GAME, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  paymentP2P = (game: IGame, from: IPlayer, to: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_P2P, game, from, to, amount, reason);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  paymentToBank = (game: IGame, from: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_BANK, game, from, amount, reason);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  paymentToPlayer = (game: IGame, to: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_PLAYER, game, to, amount, reason);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
}