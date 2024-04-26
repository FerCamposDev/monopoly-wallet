export enum SocketEvent {
  CUSTOM_ERROR = 'custom-error',
  LOG = 'log',
  GAME_UPDATED = 'game-updated',
  PLAYER_JOINED = 'player-joined',
  PLAYER_LEAVES_GAME = 'player-leaves-game',
  PLAYER_UPDATED = 'player-updated',
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
  BUY_PROPERTY = 'Buy Property',
  BUILD = 'Build',
  RENT = 'Rent',
  MORTGAGE = 'Mortgage',
  UN_MORTGAGE = 'Un-mortgage',
  TRADE = 'Trade',
  LUCK_CARD = 'Luck Card',
  ARK_CARD = 'Ark Card',
  JAIL = 'Jail',
  START = 'Start',
  TAXES = 'Taxes'
}