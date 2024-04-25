import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { IGameProps, IPlayer } from "@monopoly-wallet/shared-types";
import { GameContextTypes } from "./types";
import GameContext, { initialGameState } from "./GameContext";
import { TOKEN_OPTIONS } from "../../commons/constants";
import { IGameToRecoverData, TokenOption } from "../../commons/interfaces";
import { Log } from "./Logs";
import { LocalStorageKey } from "../../commons/enums/storage.enum";

type Props = PropsWithChildren;

const GameProvider: FC<Props> = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [game, setGame] = useState<IGameProps>(initialGameState.game);
  const [player, setPlayer] = useState<IPlayer>(initialGameState.player);
  const [availableTokens, setAvailableTokens] = useState<TokenOption[]>(TOKEN_OPTIONS);

  const playerSockets = game?.players.map(p => p.socketId).toString();

  const reset = () => {
    setGame(initialGameState.game);
    setPlayer(initialGameState.player);
    setAvailableTokens(TOKEN_OPTIONS);
    setLogs([]);
  }

  useEffect(() => {
    const tokens: TokenOption[] = [];

    TOKEN_OPTIONS.forEach((option) => {
      const used = game?.players.find(p => p.token === option.value);
      if (!used) {
        return tokens.push(option);
      }

      if (!used.socketId) {
        tokens.push({
          ...option,
          usedBy: `Used previously by: ${used.name}`,
        });
      }
    });

    setAvailableTokens(tokens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerSockets, game?.players]);

  const value = useMemo((): GameContextTypes => ({
    game,
    setGame,
    player,
    setPlayer,
    availableTokens,
    reset,
    logs,
    setLogs,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [game, availableTokens, player, logs.length]);

  // to recover game in case of accidental disconnection
  useEffect(() => {
    if (game?.room && player.token) {
      const volatileData: IGameToRecoverData = {
        game,
        player,
        logs,
        date: new Date(),
      };
  
      localStorage.setItem(LocalStorageKey.VolatileGame, JSON.stringify(volatileData))
    }
  }, [game, player, logs]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
};

export default GameProvider;
