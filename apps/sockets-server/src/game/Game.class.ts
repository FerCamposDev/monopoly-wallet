import { CustomError, GameErrors, IGame, INewPlayer, IPlayer, Token } from "@monopoly-wallet/shared-types";

export class Game implements IGame {
  public room: string;
  public players: IPlayer[];
  
  constructor(roomName: string){
    this.room = roomName;
    this.players = [];
  }

  addPlayer = (newPlayer: INewPlayer, socketId: string) => {
    if (this.players.some(p => p.token === newPlayer.token)) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }

    const player: IPlayer = {
      ...newPlayer,
      socketId,
      balance: 1600,
    }
  
    this.players.push(player);
  }

  removePlayerByToken = (token: Token) => {
    const index = this.players.findIndex(p => p.token === token);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  disconnectPlayerById = (playerId: string) => {
    const index = this.players.findIndex(p => p.socketId === playerId);

    if (index !== -1) {
      this.players[index].socketId = '';
    }
  }

  connectPlayerById = (playerId: string, token: Token) => {
    const index = this.players.findIndex(p => p.token === token);
  
    if (this.players[index].socketId) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }
  
    if (index !== -1) {
      this.players[index].socketId = playerId;
    }
  }

  private updatePlayerBalanceByToken = (token: Token, payment: number) => {
    const index = this.players.findIndex(p => p.token === token);
    if (index !== -1) {
      const currentBalance = this.players[index].balance;
      const newBalance = currentBalance + payment;
      
      if (newBalance < 0) {
        throw new CustomError({ code: GameErrors.InsufficientFounds });
      }
  
      this.players[index].balance = newBalance;
    }
  }

  paymentP2P = (from: IPlayer, to: IPlayer, amount: number) => {
    if (this.players.includes(from)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: from });
    }
    if (this.players.includes(to)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: from });
    }

    this.updatePlayerBalanceByToken(from.token, amount * -1);
    this.updatePlayerBalanceByToken(to.token, amount);
  }

  paymentToBank = (from: IPlayer, amount: number) => {
    if (this.players.includes(from)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: from });
    }

    this.updatePlayerBalanceByToken(from.token, amount * -1);
  }

  paymentToPlayer = (to: IPlayer, amount: number) => {
    if (this.players.includes(to)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: to });
    }

    this.updatePlayerBalanceByToken(to.token, amount);
  }
}