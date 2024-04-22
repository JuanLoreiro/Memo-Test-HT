import React from 'react';

import Button from './button';

type PlayerResult = {
  playerNum: number;
  matchedPairs: number;
};

type ResultModalProps = {
  isOpen: boolean;
  timeCount: number;
  actionCount: number;
  restart: () => void;
  newGame: () => void;
  multiplayer: boolean;
  playerResults?: { playerNum: number; matchedPairs: number }[];
};

const ResultModal = ({
  isOpen,
  timeCount,
  actionCount,
  restart,
  newGame,
  multiplayer,
  playerResults = [],
}: ResultModalProps) => {
  const minutes = Math.floor(timeCount / 60);
  const seconds = timeCount % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const highestScore = playerResults.reduce(
    (max, p) => (p.matchedPairs > max ? p.matchedPairs : max),
    0
  );

  const winner =
    playerResults && playerResults.length > 0
      ? playerResults.reduce((prev, current) =>
          prev.matchedPairs > current.matchedPairs ? prev : current
        )
      : null;
  const winners = playerResults.filter((p) => p.matchedPairs === highestScore);
  const isTie = winners.length > 1;
  const sortedPlayerResults = playerResults.sort(
    (a, b) => b.matchedPairs - a.matchedPairs
  );

  const highestMatchedPairs =
    playerResults.length > 0 ? playerResults[0].matchedPairs : 0;

  const tiedWinners = playerResults.filter(
    (result) => result.matchedPairs === highestMatchedPairs
  );

  const overlayClass = isOpen ? "modal-enter-active" : "modal-enter";
  const modalContentClass = isOpen ? "modal-content-active" : "modal-content";

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${overlayClass}`}
    >
      <div
        className={`bg-grey-white p-12 rounded-2xl shadow-lg relative ${modalContentClass}`}
      >
        <h2 className="text-4xl font-bold mb-2 text-dark-cyan2 text-center">
          {multiplayer
            ? isTie
              ? "It's a Tie!"
              : `Player ${winners[0].playerNum} Wins!`
            : "You did it!"}
        </h2>
        <p className="text-cyan-blue font-semibold text-sm text-center">
          {multiplayer
            ? "Game Over! Here are the results..."
            : "Game over! Here's how you got on..."}
        </p>
        {multiplayer &&
          winner &&
          sortedPlayerResults.map((result, index) => (
            <div
              key={result.playerNum}
              className={`flex flex-row items-center justify-between mt-3 ${
                tiedWinners.some(
                  (winner) => winner.playerNum === result.playerNum
                )
                  ? "bg-dark-cyan2"
                  : "bg-grey3"
              } rounded-lg px-6 py-3`}
            >
              <p
                className={`font-bold text-lg mr-44 ${
                  tiedWinners.some(
                    (winner) => winner.playerNum === result.playerNum
                  )
                    ? "text-grey-white"
                    : "text-cyan-blue"
                }`}
              >
                Player {result.playerNum}{" "}
                {tiedWinners.some(
                  (winner) => winner.playerNum === result.playerNum
                ) && "(Winner!)"}
              </p>
              <p
                className={`text-2xl font-bold ${
                  tiedWinners.some(
                    (winner) => winner.playerNum === result.playerNum
                  )
                    ? "text-grey-white"
                    : "text-dark-cyan"
                }`}
              >
                {result.matchedPairs} Pairs
              </p>
            </div>
          ))}
        {!multiplayer && (
          <>
            <div className="flex flex-row items-center justify-between mt-5 bg-grey3 rounded-lg px-6 py-3">
              <p className="text-cyan-blue font-bold text-sm mr-44">
                Time Elapsed
              </p>
              <p className="text-dark-cyan text-2xl font-bold">
                {formattedTime}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between mt-3 bg-grey3 rounded-lg px-6 py-3">
              <p className="text-cyan-blue font-bold text-sm mr-44">
                Moves Taken
              </p>
              <p className="text-dark-cyan text-2xl font-bold">
                {actionCount} Moves
              </p>
            </div>
          </>
        )}
        <div className="flex flex-row gap-2 items-center justify-between mt-7">
          <div className="w-1/2">
            <Button onClick={restart} color="yellow">
              Restart
            </Button>
          </div>
          <div className="w-1/2">
            <Button onClick={newGame} color="grey">
              Setup New Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
