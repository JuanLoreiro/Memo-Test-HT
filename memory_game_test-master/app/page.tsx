"use client";
import './globals.css';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

import Button from '../components/button';
import { useGame } from '../components/game-provider';

export default function GameMenu() {
  const { theme, setTheme, players, setPlayers, gridSize, setGridSize } =
    useGame();
  const router = useRouter();

  const startGame = () => {
    router.push("/game-screen");
  };

  return (
    <>
      <Head>
        <title>Memory Game</title>
      </Head>
      <div className="flex flex-col items-center justify-center bg-dark-cyan2 min-h-screen">
        <h1 className="mb-10 font-semibold text-3xl">memory</h1>
        <div className="bg-grey2 rounded-lg p-10 sm:w-full md:w-2/3 min-w-[400px] max-w-[600px]">
          <p className="text-cyan-blue text-md font-semibold mb-3">
            Select Theme
          </p>
          <div className="flex flex-row w-full justify-between pb-5">
            <Button
              active={theme === "numbers"}
              onClick={() => setTheme("numbers")}
            >
              Numbers
            </Button>
            <div className="px-2" />
            <Button
              active={theme === "icons"}
              onClick={() => setTheme("icons")}
            >
              Icons
            </Button>
          </div>
          <p className="text-cyan-blue text-md font-semibold mb-3">
            Number of Players
          </p>
          <div className="flex flex-row w-full justify-between gap-3 pb-5">
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                active={players === num}
                onClick={() => setPlayers(num)}
              >
                {num}
              </Button>
            ))}
          </div>
          <p className="text-cyan-blue text-md font-semibold mb-3">Grid Size</p>
          <div className="flex flex-row w-full justify-between mb-7">
            <Button
              active={gridSize === "4x4"}
              onClick={() => setGridSize("4x4")}
            >
              4x4
            </Button>
            <div className="px-2" />
            <Button
              active={gridSize === "6x6"}
              onClick={() => setGridSize("6x6")}
            >
              6x6
            </Button>
          </div>
          <div className="w-full flex-1">
            <Button onClick={startGame} color="yellow">
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
