import { IGame, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank, ISocketActions, SocketAction } from "@monopoly-wallet/shared-types";
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

  joinGameToToken = (room: string, newPlayer: INewPlayer) => {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME_TO_TOKEN, room, newPlayer)
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

  paymentP2P = (room: string, data: IP2PPayment) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_P2P, room, data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  paymentToBank = (room: string, data: IPaymentToBank) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_BANK, room, data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  paymentToPlayer = (room: string, data: IPaymentFromBank) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_PLAYER, room, data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
}