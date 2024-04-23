import { IGameProps, IPlayer, Token } from "@monopoly-wallet/shared-types";
import { Log } from "../../context/game/Logs";

export interface Option<T> {
  label: string;
  value: T;
}

export interface TokenOption extends Option<Token> {
  usedBy?: string
}

export interface IGameToRecoverData {
  logs: Log[];
  player: IPlayer;
  game: IGameProps;
}