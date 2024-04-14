import { Server, Socket } from "socket.io";
import { CustomError, IGame, SocketEvent, Token } from "@monopoly-wallet/shared-types";
import { Log } from "../model/Log";

export class GameEventsController {
  private socket: Socket;
  private io: Server;

  constructor(socket: Socket, io: Server) {
    this.socket = socket;
    this.io = io;
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

  gameUpdated = (game: IGame) => {
    try {
      this.io.in(game.room).emit(SocketEvent.GAME_UPDATED, game);
      // this.socket.emit(SocketEvent.GAME_UPDATED, game);
    } catch (error) {
      this.emitError(error)
    }
  }

  playerJoined = (game: IGame) => {
    try {
      const player = game.players.find(p => p.socketId === this.socket.id);
      this.io.in(game.room).emit(SocketEvent.PLAYER_JOINED, player);
    } catch (error) {
      this.emitError(error)
    }
  }

  playerLeave = () => {
    try {
      this.socket.emit(SocketEvent.PLAYER_LEAVES_GAME);
    } catch (error) {
      this.emitError(error)
    }
  }

  playerUpdated = (game: IGame, token: Token) => {
    const updated = game.players.find(p => p.token === token);
    if (updated) {
      this.io.to(updated.socketId).emit(SocketEvent.PLAYER_UPDATED, updated);
    }
  }

  log = (game: IGame, log: Log) => {
    try {
      this.io.in(game.room).emit(SocketEvent.LOG, log);
      // this.socket.emit(SocketEvent.LOG, log);
    } catch (error) {
      this.emitError(error)
    }
  }
}
