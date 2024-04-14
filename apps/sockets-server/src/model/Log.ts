import { ILog } from "@monopoly-wallet/shared-types";

export class Log implements ILog {
  date: Date;
  message: string;
  detail: string;

  constructor (message: string, detail: string) {
    this.date = new Date();
    this.message = message;
    this.detail = detail;
  }
}