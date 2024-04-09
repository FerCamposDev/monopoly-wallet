import { IPlayer, ISocketActions, SocketAction, Token } from "@monopoly-wallet/shared-types";
import { Socket } from "socket.io-client";


export class SocketActions implements ISocketActions {
  private socket: Socket | null;

  constructor(socket: Socket | null) {
    this.socket = socket;
  }

  createGame(room: string) {
    try {
      this.socket?.emit(SocketAction.CREATE_GAME, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinRoom(room: string) {
    try {
      this.socket?.emit(SocketAction.JOIN_ROOM, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  leaveRoom(room: string) {
    try {
      this.socket?.emit(SocketAction.LEAVE_ROOM, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinGame(room: string, player: IPlayer) {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME, room, player)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  joinGameToToken(room: string, token: Token) {
    try {
      this.socket?.emit(SocketAction.JOIN_GAME_TO_TOKEN, room, token)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  leaveGame(room: string, player: IPlayer) {
    try {
      this.socket?.emit(SocketAction.LEAVE_GAME, room, player)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

}