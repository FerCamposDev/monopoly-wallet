/* eslint-disable @typescript-eslint/no-empty-function */
import { IPlayer, Token } from "../game";

export interface ISocketActions {
  createGame: (room: string) => void;

  joinRoom: (room: string) => void;

  leaveRoom: (room: string) => void;

  joinGame: (room: string, player: IPlayer) => void;

  joinGameToToken: (room: string, token: Token) => void;

  leaveGame: (room: string, player: IPlayer) => void;
}