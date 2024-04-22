import React, {
  useEffect,
  useState,
} from 'react';

type PlayerBarProps = {
  playerNum: number;
  isCurrentPlayer: boolean;
  matchedPairs: number;
};

const PlayerBar = ({
  playerNum,
  matchedPairs,
  isCurrentPlayer,
}: PlayerBarProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const barClass = `flex justify-between items-center px-6 py-3 rounded-lg md:w-52 sm:min-w-28 ${
    isCurrentPlayer ? "current-player" : "bg-grey3"
  }`;
  const playerTextColorClass = isCurrentPlayer
    ? "text-white"
    : "text-cyan-blue";
  const pairsTextColorClass = isCurrentPlayer ? "text-white" : "text-dark-cyan";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${barClass} sm:flex-col sm:min-h-20 md:min-h-16 md:flex-row`}
      >
        <p
          className={`font-bold md:text-lg sm:text-xs ${playerTextColorClass} md:pr-16`}
        >
          {isSmallScreen ? "P" : "Player"} {playerNum}
        </p>
        <p
          className={`md:text-3xl sm:text-2xl font-bold ${pairsTextColorClass}`}
        >
          {matchedPairs}
        </p>
      </div>
      <div className="text-center mt-2 h-6 hidden sm:block">
        {isCurrentPlayer && (
          <p className="text-sm font-bold text-dark-cyan tracking-widest">
            CURRENT TURN
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerBar;
