import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { IGameProps, IPlayer, Option, TOKEN_OPTIONS, Token } from "@monopoly-wallet/shared-types";
import { GameContextTypes } from "./types";
import GameContext from "./GameContext";

type Props = PropsWithChildren;

const GameProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<IGameProps | null>(null);
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [availableTokens, setAvailableTokens] = useState<Option<Token>[]>(TOKEN_OPTIONS);

  useEffect(() => {
    const usedTokens = game?.players
      .filter(p => Boolean(p.socketId))
      .map(p => p.token);
      
    const tokens = TOKEN_OPTIONS.filter(opt => !usedTokens?.includes(opt.value))
    setAvailableTokens(tokens);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.players.length]);

  const value = useMemo((): GameContextTypes => ({
    game,
    setGame,
    player,
    setPlayer,
    availableTokens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [game, availableTokens, player]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
};

export default GameProvider;
