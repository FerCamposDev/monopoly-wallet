import { Socket } from "socket.io";
import { games } from "../model/games";
import { CustomError, GameErrors, IGame, INewPlayer, IPlayer, ISocketActions, PaymentReason, SocketEvent } from "@monopoly-wallet/shared-types";
import { GameEventsController } from "./GameEvents.controller";
import { Game } from "../game/Game.class";

export class GameController implements ISocketActions {
  private socket: Socket;
  private events: GameEventsController;
  private socketRooms: string[] = [];

  constructor(socket: Socket) {
    this.socket = socket;
    this.events = new GameEventsController(socket);
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
      this.socketRooms.push(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  joinRoom = (room: string) => {
    try {
      this.socket.join(room);
      this.socketRooms.push(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  leaveRoom = (room: string) => {
    try {
      const game = games.getGame(room);
      game.disconnectPlayerById(this.socket.id);
      this.socket.leave(room);
      this.events.gameUpdated(game);
    } catch (error) {
      this.emitError(error)
    }
  }

  joinGame = (room: string, player: INewPlayer) => {
    try {
      const game = games.getGame(room);
      game.addPlayer(player, this.socket.id);
      this.events.gameUpdated(game);
      this.events.playerJoined(game);
    } catch (error) {
      this.emitError(error)
    }
  }

  joinGameToToken = (room: string, player: INewPlayer) => {
    try {
      const game = games.getGame(room);
      game.connectPlayerById(this.socket.id, player)
      this.events.gameUpdated(game);
      this.events.playerJoined(game);
    } catch (error) {
      this.emitError(error)
    }
  }

  leaveGame = (room: string) => {
    try {
      const game = games.getGame(room);
      const player = game.players.find(p => p.socketId === this.socket.id);
      game.removePlayerByToken(player.token);
      this.socket.leave(room);
      this.events.gameUpdated(game);
      this.events.playerLeave();
    } catch (error) {
      this.emitError(error)
    }
  }

  restoreGame = (room: string, game: Game) => {
    try {
      games.restoreGame(room, game);
      this.socket.join(room);
      this.socketRooms.push(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentP2P = (game: IGame, from: IPlayer, to: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      if (this.socket.id !== from.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money from other user.',
        })
      }
      games.getGame(game.room).paymentP2P(from, to, amount);
      // this.events.log
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentToPlayer = (game: IGame, to: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      if (this.socket.id !== to.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money to yourself.',
        })
      }
      games.getGame(game.room).paymentToPlayer(to, amount);
      // this.events.walletUpdated
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentToBank = (game: IGame, from: IPlayer, amount: number, reason: PaymentReason) => {
    try {
      if (this.socket.id !== from.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money from other user.',
        })
      }
      games.getGame(game.room).paymentToBank(from, amount);
      // this.events.walletUpdated
    } catch (error) {
      this.emitError(error)
    }
  }

  disconnect = (reason) => {
    try {
      this.socketRooms.forEach(room => {
        const game = games.getGame(room);
        game.disconnectPlayerById(this.socket.id);
        this.events.gameUpdated(game);
      })
      console.warn(`Disconnect: ${this.socket?.id}`, reason);
    } catch (error) {
      console.log('error :>> ', error);
      this.emitError(error)
    }
  }
}
