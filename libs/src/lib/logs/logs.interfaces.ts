import { IPlayer } from "../game";

export interface ILog {
  date: Date;
  message: string;
  detail: string;
  from?: IPlayer;
  to?: IPlayer;
}
