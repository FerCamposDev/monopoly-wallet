import { IGameProps, Option, Token } from "@monopoly-wallet/shared-types"
import { SetStateAction } from "react"

export type GameContextTypes = {
  game: IGameProps | null;
  setGame: React.Dispatch<SetStateAction<IGameProps | null>>;
  availableTokens: Option<Token>[];
}