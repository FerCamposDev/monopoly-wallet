import { Socket } from "socket.io";
import { CustomError, IGame, SocketEvent } from "@monopoly-wallet/shared-types";

export class GameEventsController {
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

  gameUpdated = (game: IGame) => {
    try {
      this.socket.in(game.room).emit(SocketEvent.GAME_UPDATED, game);
      this.socket.emit(SocketEvent.GAME_UPDATED, game);
    } catch (error) {
      this.emitError(error)
    }
  }

  playerJoined = (game: IGame) => {
    try {
      const player = game.players.find(p => p.socketId === this.socket.id);
      this.socket.emit(SocketEvent.PLAYER_JOINED, player);
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

  log = (game: IGame, log) => {
    try {
      this.socket.in(game.room).emit(SocketEvent.LOG, log);
    } catch (error) {
      this.emitError(error)
    }
  }
}

/* enum events {
  GAME_UPDATED,
  PLAYER_JOINED,
  LOG,
  WALLET_UPDATED,
  PLAYER_LEFT_ROOM,
} */