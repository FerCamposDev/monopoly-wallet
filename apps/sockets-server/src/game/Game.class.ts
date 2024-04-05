import { CustomError, GameErrors, IGame, IPlayer, TOKEN_OPTIONS, Token } from "@monopoly-wallet/shared-types";

export class Game implements IGame {
  public room: string;
  public players: IPlayer[];
  
  constructor(roomName: string) {
    this.room = roomName;
    this.players = [];
  }

  addPlayer(player: IPlayer) {
    if (this.players.some(p => p.token === player.token)) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }
  
    this.players.push(player);
  }

  removePlayerByToken(token: Token) {
    const index = this.players.findIndex(p => p.token === token);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  disconnectPlayerById(playerId: string) {
    const index = this.players.findIndex(p => p.socketId === playerId);

    if (index !== -1) {
      this.players[index].socketId = '';
    }
  }

  connectPlayerById(playerId: string, token: Token) {
    const index = this.players.findIndex(p => p.token === token);
  
    if (this.players[index].socketId) {
      throw new CustomError({ code: GameErrors.TokenAlreadyInGame });
    }
  
    if (index !== -1) {
      this.players[index].socketId = playerId;
    }
  }

  updatePlayerBalanceByToken(token: Token, payment: number) {
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

  get availableTokens() {
    const usedTokens = this.players
      .filter(p => Boolean(p.socketId))
      .map(p => p.token);

    return TOKEN_OPTIONS.filter(opt => !usedTokens.includes(opt.value))
  }
}