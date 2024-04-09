import { Socket } from "socket.io";
import { games } from "../model/games";
import { CustomError, IPlayer, ISocketActions, SocketEvent, Token } from "@monopoly-wallet/shared-types";

export class GameController implements ISocketActions {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  private emitError = error => {
    if (error instanceof CustomError) {
      return this.socket.emit(SocketEvent.CUSTOM_ERROR, error)
    }
    console.error('error :>> ', error);
    this.socket.emit(
      'error', { message: 'Something went wrong', data: error?.toString() }
    );
  };

  createGame = (room: string) => {
    try {
      games.createGameRoom(room);
      this.socket.join(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  joinRoom = (room: string) => {
    try {
      this.socket.join(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  leaveRoom = (room: string) => {
    try {
      games.getGame(room).disconnectPlayerById(this.socket.id);
      this.socket.leave(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  joinGame = (room: string, player: IPlayer) => {
    try {
      games.getGame(room).addPlayer(player)
    } catch (error) {
      this.emitError(error)
    }
  }

  joinGameToToken = (room: string, token: Token) => {
    try {
      games.getGame(room).connectPlayerById(this.socket.id, token)
    } catch (error) {
      this.emitError(error)
    }
  }

  leaveGame = (room: string, player: IPlayer) => {
    try {
      games.getGame(room).removePlayerByToken(player.token)
      this.socket.leave(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  disconnect = (data) => {
    try {
      this.socket.rooms.forEach(room => {
        games.getGame(room).disconnectPlayerById(this.socket.id);
      })
      console.warn(`Disconnect: ${this.socket.id}`, data);
    } catch (error) {
      this.emitError(error)
    }
  }
}
