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

  gameUpdated(game: IGame) {
    try {
      this.socket.in(game.room).emit(SocketEvent.GAME_UPDATED, game);
    } catch (error) {
      this.emitError(error)
    }
  }

  log(game: IGame, log) {
    try {
      this.socket.in(game.room).emit(SocketEvent.LOG, log);
    } catch (error) {
      this.emitError(error)
    }
  }
}

/* enum events {
  LOG = 'log',
  WALLET_UPDATED = 'wallet-updated',
  GAME_UPDATED = 'game-updated',
  NEW_PLAYER = 'new-player',
  PLAYER_LEFT_ROOM = 'player-left-room',
} */