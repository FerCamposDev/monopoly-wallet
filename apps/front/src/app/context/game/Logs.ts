import { ILog, IPlayer } from "@monopoly-wallet/shared-types";

export class Log implements ILog {
  private socketId?: string;

  date: Date;
  message: string;
  detail: string;
  from?: IPlayer | undefined;
  to?: IPlayer | undefined;

  constructor(log: ILog, socketId?: string) {
    this.socketId = socketId;

    this.date = new Date(log.date);
    this.message = log.message;
    this.detail = log.detail;
    this.from = log.from;
    this.to = log.to;
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
}