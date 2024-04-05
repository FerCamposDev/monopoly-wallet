export enum SocketEvents {
  CUSTOM_ERROR = 'custom-error',
  AVAILABLE_TOKENS = 'available-tokens',
  WALLET_UPDATED = 'wallet-updated',
  GAME_UPDATED = 'game-updated',
  NEW_PLAYER = 'new-player',
  PLAYER_LEFT_ROOM = 'player-left-room',
  LOG = 'log'
}

export enum SocketActions {
  CREATE_GAME = 'create_game',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  JOIN_GAME = 'join_game',
  JOIN_GAME_TO_TOKEN = 'join_game_to_token',
  LEAVE_GAME = 'leave_game',
}