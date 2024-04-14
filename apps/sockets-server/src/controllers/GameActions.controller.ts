import { Server, Socket } from "socket.io";
import { games } from "../model/games";
import { CustomError, GameErrors, IGame, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank, ISocketActions, SocketEvent } from "@monopoly-wallet/shared-types";
import { GameEventsController } from "./GameEvents.controller";
import { createPaymentFromBankLog, createPaymentP2PLog, createPaymentToBankLog } from "../commons/helpers/logs";

export class GameController implements ISocketActions {
  private socket: Socket;
  private io: Server;
  private events: GameEventsController;
  private socketRooms: string[] = [];

  constructor(socket: Socket, io: Server) {
    this.socket = socket;
    this.io = io;
    this.events = new GameEventsController(socket, io);
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

  private disconnectFromAllRooms = () => {
    this.socketRooms.forEach(room => {
      const game = games.getGame(room);
      game.disconnectPlayerById(this.socket.id);
      this.events.gameUpdated(game);
    });
    this.socketRooms = [];
  }

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
      games.getGame(room); // to check if game exist
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

  restoreGame = (room: string, game: IGame) => {
    try {
      games.restoreGame(room, game);
      this.socket.join(room);
      this.socketRooms.push(room);
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentP2P = (room: string, data: IP2PPayment) => {
    try {
      if (this.socket.id !== data.from.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money from other user.',
        })
      }
      const game = games.getGame(room);
      game.paymentP2P(data);
      this.events.log(game, createPaymentP2PLog(data));

      this.events.playerUpdated(game, data.from.token);
      this.events.playerUpdated(game, data.to.token);
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentToPlayer = (room: string, data: IPaymentFromBank) => {
    try {
      if (this.socket.id !== data.to.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money to yourself.',
        })
      }
      const game = games.getGame(room);
      game.paymentToPlayer(data);
      this.events.log(game, createPaymentFromBankLog(data));
      this.events.playerUpdated(game, data.to.token);
    } catch (error) {
      this.emitError(error)
    }
  }

  paymentToBank = (room: string, data: IPaymentToBank) => {
    try {
      if (this.socket.id !== data.from.socketId) {
        throw new CustomError({
          code: GameErrors.ActionForbidden,
          message: 'You cannot send money from other user.',
        })
      }
      const game = games.getGame(room);
      game.paymentToBank(data);
      this.events.log(game, createPaymentToBankLog(data));
      this.events.playerUpdated(game, data.from.token);
    } catch (error) {
      this.emitError(error)
    }
  }

  disconnect = (reason) => {
    try {
      this.disconnectFromAllRooms();
      console.warn(`Disconnect: ${this.socket?.id}`, reason);
    } catch (error) {
      console.log('error :>> ', error);
      this.emitError(error)
    }
  }
}
