/* eslint-disable @typescript-eslint/no-empty-function */
import { Token } from "../game";
import { SocketActions } from "./sockets.enums";

export interface SocketActionInterfaces {
  [SocketActions.CREATE_GAME]: (name: string) => void,
  [SocketActions.JOIN_ROOM]: (name: string) => void,
  [SocketActions.LEAVE_ROOM]: undefined,
  [SocketActions.JOIN_GAME]: undefined,
  [SocketActions.JOIN_GAME_TO_TOKEN]: (name: string, token: Token) => void,
  [SocketActions.LEAVE_GAME]: undefined
}
