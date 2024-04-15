import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { IGameProps, IPlayer } from "@monopoly-wallet/shared-types";
import { GameContextTypes } from "./types";
import GameContext from "./GameContext";
import { TOKEN_OPTIONS } from "../../commons/constants";
import { TokenOption } from "../../commons/interfaces";

type Props = PropsWithChildren;

const GameProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<IGameProps | null>(null);
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenOption[]>(TOKEN_OPTIONS);

  const playerSockets = game?.players.map(p => p.socketId).toString();

  const reset = () => {
    setGame(null);
    setPlayer(null);
    setAvailableTokens(TOKEN_OPTIONS);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [game, availableTokens, player]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
};

export default GameProvider;
