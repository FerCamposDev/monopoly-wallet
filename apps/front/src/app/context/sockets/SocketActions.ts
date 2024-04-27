import { IGameProps, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank, ISocketActions, SocketAction } from '@monopoly-wallet/shared-types';
import { Socket } from 'socket.io-client';

export class SocketActions implements ISocketActions {
  private socket: Socket | null;

  constructor(socket: Socket | null) {
    this.socket = socket;
  }

  createGame = (room: string) => {
    try {
      this.socket?.emit(SocketAction.CREATE_GAME, room);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  restoreGame = (room: string, game: IGameProps) => {
    try {
      this.socket?.emit(SocketAction.RESTORE_GAME, room, game);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  joinRoom = (room: string, callback?: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.JOIN_ROOM, room, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  leaveRoom = (callback: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.LEAVE_ROOM, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  joinGame = (player: INewPlayer) => {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME, player);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  joinGameToToken = (newPlayer: INewPlayer) => {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME_TO_TOKEN, newPlayer);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  leaveGame = (callback: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.LEAVE_GAME, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  paymentP2P = (data: IP2PPayment, callback: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_P2P, data, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  paymentToBank = (data: IPaymentToBank, callback: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_BANK, data, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  paymentToPlayer = (data: IPaymentFromBank, callback: VoidFunction) => {
    try {
      this.socket?.emit(SocketAction.PAYMENT_TO_PLAYER, data, callback);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
}