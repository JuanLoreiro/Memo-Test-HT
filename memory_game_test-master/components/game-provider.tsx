"use client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type GameContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  players: number;
  setPlayers: Dispatch<SetStateAction<number>>;
  gridSize: string;
  setGridSize: Dispatch<SetStateAction<string>>;
};

const defaultContextValue: GameContextType = {
  theme: 'numbers',
  setTheme: () => {},
  players: 1,
  setPlayers: () => {},
  gridSize: "4x4",
  setGridSize: () => {},
};

const GameContext = createContext<GameContextType>(defaultContextValue);

export const useGame = () => useContext(GameContext);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('numbers');
  const [players, setPlayers] = useState<number>(1);
  const [gridSize, setGridSize] = useState<string>("4x4");

  const value = {
    theme,
    setTheme,
    players,
    setPlayers,
    gridSize,
    setGridSize,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};