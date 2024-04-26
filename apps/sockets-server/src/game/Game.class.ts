import { CustomError, GameErrors, IGame, IGameProps, INewPlayer, IP2PPayment, IPaymentFromBank, IPaymentToBank, IPlayer, Token } from "@monopoly-wallet/shared-types";

export class Game implements IGame {
  public room: string;
  public players: IPlayer[];
  
  constructor(roomName: string, game?: IGameProps){
    this.room = roomName;
    this.players = game?.players || [];
  }

  addPlayer = (newPlayer: INewPlayer, socketId: string) => {
    if (this.players.some(p => p.token === newPlayer.token)) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }

    const player: IPlayer = {
      ...newPlayer,
      socketId,
      balance: 1500,
    }
  
    this.players.push(player);
  }

  removePlayerByToken = (token: Token) => {
    const index = this.players.findIndex(p => p.token === token);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  disconnectPlayerById = (playerId: string): IPlayer | null => {
    const index = this.players.findIndex(p => p.socketId === playerId);

    if (index !== -1) {
      this.players[index].socketId = '';
      return this.players[index];
    }
    return null;
  }

  connectPlayerById = (playerId: string, player: INewPlayer) => {
    const index = this.players.findIndex(p => p.token === player.token);
  
    if (this.players[index].socketId) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }
  
    if (index !== -1) {
      this.players[index].socketId = playerId;
      this.players[index].name = player.name;
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

  paymentP2P = (data: IP2PPayment) => {
    const { from, to, amount } = data;
    if (this.players.includes(from)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: from });
    }
    if (this.players.includes(to)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: to });
    }

    this.updatePlayerBalanceByToken(from.token, amount * -1);
    this.updatePlayerBalanceByToken(to.token, amount);
  }

  paymentToBank = (data: IPaymentToBank) => {
    const { from , amount } = data;
    if (this.players.includes(from)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: from });
    }

    this.updatePlayerBalanceByToken(from.token, amount * -1);
  }

  paymentToPlayer = (data: IPaymentFromBank) => {
    const { to , amount } = data;
    if (this.players.includes(to)) {
      throw new CustomError({ code: GameErrors.UnknownPlayer, data: to });
    }

    this.updatePlayerBalanceByToken(to.token, amount);
  }
}