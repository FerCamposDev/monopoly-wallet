import { GameErrors } from "./game-errors.enum";

export class CustomError {
  public code: GameErrors;
  public message?: string;
  public data?: any;
  
  constructor(values: CustomError) {
    this.code = values.code;
    this.message = values.message;
    this.data = values.data;
  }
}