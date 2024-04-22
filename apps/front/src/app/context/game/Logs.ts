import { ILog, IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";

export class Log implements ILog {
  private socketId?: string;

  date: Date;
  message: string;
  detail: string;
  amount: number;
  reason: PaymentReason;
  from?: IPlayer | undefined;
  to?: IPlayer | undefined;
  fail?: boolean | undefined;

  constructor(log: ILog, socketId?: string) {
    this.socketId = socketId;

    this.date = new Date(log.date);
    this.message = log.message;
    this.detail = log.detail;
    this.amount = log.amount;
    this.reason = log.reason;
    this.from = log.from;
    this.to = log.to;
    this.fail = log.fail;
  }

  get isIn(){
    return this.to?.socketId === this.socketId
  }

  get isOut(){
    return this.from?.socketId === this.socketId;
  } 

  get isRelatedToPlayer(){
    return this.isIn || this.isOut
  }

  get displayTime() {
    const hour = this.date.getHours().toString().padStart(2, '0');
    const min = this.date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${min}`;
  }
}