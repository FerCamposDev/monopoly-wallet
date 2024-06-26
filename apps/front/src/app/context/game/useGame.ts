import { useContext } from 'react';
import GameContext from './GameContext';

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('trying to use GameContext without GameProvider');
  }

  return context;
};