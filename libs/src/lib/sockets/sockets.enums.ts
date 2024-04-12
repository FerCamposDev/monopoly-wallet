export enum SocketEvent {
  CUSTOM_ERROR = 'custom-error',
  LOG = 'log',
  // AVAILABLE_TOKENS = 'available-tokens',
  // WALLET_UPDATED = 'wallet-updated',
  GAME_UPDATED = 'game-updated',
  PLAYER_JOINED = 'player-joined',
  PLAYER_LEAVES_GAME = 'player-leaves-game',
}

export enum SocketAction {
  CREATE_GAME = 'create_game',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  JOIN_GAME = 'join_game',
  JOIN_GAME_TO_TOKEN = 'join_game_to_token',
  LEAVE_GAME = 'leave_game',
  RESTORE_GAME = 'restore_game',
  PAYMENT_P2P= 'payment_p2p',
  PAYMENT_TO_PLAYER = 'payment_to_player',
  PAYMENT_TO_BANK = 'payment_to_bank',
}

export enum PaymentReason {
  BUY_PROPERTY,
  BUILD,
  RENT,
  MORTGAGE,
  UN_MORTGAGE,
  TRADE,
  LUCK_CARD,
  ARK_CARD,
  JAIL,
}