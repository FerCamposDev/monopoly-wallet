import { IPlayer } from "../game";
import { PaymentReason } from "../sockets";

export interface ILog {
  date: Date;
  message: string;
  detail: string;
  amount: number;
  reason: PaymentReason;
  from?: IPlayer;
  to?: IPlayer;
}
