import { IGameProps, IPlayer } from "@monopoly-wallet/shared-types"
import { TokenOption } from "../../commons/interfaces";
import { SetStateAction } from "react"
import { Log } from "./Logs";

export type GameContextTypes = {
  game: IGameProps;
  setGame: React.Dispatch<SetStateAction<IGameProps>>;
  player: IPlayer;
  setPlayer: React.Dispatch<SetStateAction<IPlayer>>;
  availableTokens: TokenOption[];
  reset: VoidFunction;
  logs: Log[];
  setLogs: React.Dispatch<SetStateAction<Log[]>>;
}