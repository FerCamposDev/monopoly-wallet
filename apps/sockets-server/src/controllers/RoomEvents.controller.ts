import { CustomError, SocketEvent } from "@monopoly-wallet/shared-types";
import { Server } from "socket.io";
import { games } from "../model/games";

export class RoomController {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  private emitError = (error, room: string) => {
    if (error instanceof CustomError) {
      return this.io.in(room).emit(SocketEvent.CUSTOM_ERROR, error)
    }
    console.error('error :>> ', error);
    this.io.in(room).emit(
      'error', { message: 'Something went wrong', data: error?.toString() }
    );
  };

  create = (room: string) => {
    try {
      console.log(`room ${room} was created`);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  join = (room: string, id: string) => {
    if (room !== id) {
      try {
        console.log(`socket ${id} has joined room ${room}`);
        this.io.in(room).emit(SocketEvent.GAME_UPDATED, games.getGame(room));
      } catch (error) {
        this.emitError(error, room);
      }
    }
  }

  leave = (room: string, id) => {
    if (room !== id) {
      try {
        console.log(`socket ${id} has leave room ${room}`);
        this.io.in(room).emit(SocketEvent.GAME_UPDATED, games.getGame(room));
      } catch (error) {
        this.emitError(error, room);
      }
    }
  }
}