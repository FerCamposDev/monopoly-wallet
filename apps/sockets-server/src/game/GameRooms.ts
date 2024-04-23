import { CustomError, GameErrors, IGameProps, IGamesByRoom } from "@monopoly-wallet/shared-types";
import { Game } from "./Game.class";

export class GameRooms {
  private rooms: IGamesByRoom = {};

  createGameRoom(roomName: string) {
    if (this.rooms[roomName]) {
      throw new CustomError({ code: GameErrors.AlreadyExist });
    }

    this.rooms[roomName] = new Game(roomName);
  }

  restoreGame(roomName: string, game: IGameProps) {
    if (this.rooms[roomName]) {
      throw new CustomError({ code: GameErrors.AlreadyExist });
    }

    game.players.forEach(p => p.socketId = ''); // clean ids
    this.rooms[roomName] = new Game(roomName, game);
  }

  getGame(roomName: string) {
    if (!this.rooms[roomName]) {
      throw new CustomError({ code: GameErrors.NotExist });
    }

    return this.rooms[roomName];
  }
}