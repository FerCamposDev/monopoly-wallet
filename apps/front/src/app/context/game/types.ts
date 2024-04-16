import { IGameProps, IPlayer } from "@monopoly-wallet/shared-types"
import { TokenOption } from "../../commons/interfaces";
import { SetStateAction } from "react"
import { Log } from "./Logs";

export type GameContextTypes = {
  game: IGameProps | null;
  setGame: React.Dispatch<SetStateAction<IGameProps | null>>;
  player: IPlayer | null;
  setPlayer: React.Dispatch<SetStateAction<IPlayer | null>>;
  availableTokens: TokenOption[];
  reset: VoidFunction;
  logs: Log[];
  setLogs: React.Dispatch<SetStateAction<Log[]>>;
}