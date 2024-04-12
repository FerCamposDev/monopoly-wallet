import { IGameProps, IPlayer, Option, Token } from "@monopoly-wallet/shared-types"
import { SetStateAction } from "react"

export type GameContextTypes = {
  game: IGameProps | null;
  setGame: React.Dispatch<SetStateAction<IGameProps | null>>;
  player: IPlayer | null;
  setPlayer: React.Dispatch<SetStateAction<IPlayer | null>>;
  availableTokens: Option<Token>[];
}