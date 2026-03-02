import { createContext, useContext } from 'react';
import { useGameState } from '../hooks/useGameState';
import { getAllCharacters } from '../../data';

const GameContext = createContext(null);

const allCharacters = getAllCharacters();

export const GameProvider = ({ children }) => {
  const gameState = useGameState(allCharacters);

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
