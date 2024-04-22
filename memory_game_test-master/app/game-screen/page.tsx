"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import {
  faCrown,
  faDice,
  faDragon,
  faFish,
  faGuitar,
  faHandPeace,
  faKiwiBird,
  faLemon,
  faPaw,
  faPizzaSlice,
  faRainbow,
  faSkull,
  faSpider,
  faStarAndCrescent,
  faSun,
  faTree,
  faVolleyball,
  faYinYang,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/button';
import Card from '../../components/card';
import Counter from '../../components/counter';
import { useGame } from '../../components/game-provider';
import PlayerBar from '../../components/player-bar';
import ResultModal from '../../components/result-modal';

type CardType = {
  id: number;
  content: number | string;
  isMatched: boolean;
  isFlipped: boolean;
};

const icons = [
  faLemon,
  faSun,
  faTree,
  faFish,
  faCrown,
  faDragon,
  faDice,
  faKiwiBird,
  faYinYang,
  faVolleyball,
  faStarAndCrescent,
  faSpider,
  faSkull,
  faRainbow,
  faPizzaSlice,
  faPaw,
  faHandPeace,
  faGuitar,
];

export default function GameScreen() {
  const { theme, players, gridSize } = useGame();
  const router = useRouter();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [latestMatchedCards, setLatestMatchedCards] = useState([]);
  const [isCheckingForMatch, setIsCheckingForMatch] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [matchedPairs, setMatchedPairs] = useState(Array(players).fill(0));
  const intervalRef = useRef<number | null>(null);
  const playerNumbers = [1, 2, 3, 4];
  const isMultiplayer = players > 1;

  useEffect(() => {
    console.log(cards, theme, players, gridSize);
  }, [cards, theme, players, gridSize]);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const getIconsForGrid = (gridSize) => {
    const pairCount = gridSize === "4x4" ? 8 : 18;
    const shuffledIcons = shuffleArray([...icons]);
    const selectedIcons = shuffledIcons.slice(0, pairCount);
    return selectedIcons;
  };

  const iconsForGrid = getIconsForGrid(gridSize);

  const numbers =
    gridSize === "4x4"
      ? Array.from({ length: 8 }, (_, i) => i + 1)
      : Array.from({ length: 18 }, (_, i) => i + 1);

  const initializeCards = useCallback(
    (theme) => {
      const content = theme === "numbers" ? numbers : iconsForGrid;
      let doubledContent = [...content, ...content];
      doubledContent = shuffleArray(doubledContent);
      return doubledContent.map((value, index) => ({
        id: index,
        content: value,
        isMatched: false,
        isFlipped: false,
      }));
    },
    [numbers, iconsForGrid]
  );

  useEffect(() => {
    const initializedCards = initializeCards(theme);
    setCards(initializedCards);
  }, []);

  const flipCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCard((prevFlippedCards) => [...prevFlippedCards, index]);
  };

  useEffect(() => {
    if (players > 1) {
      setGameStarted(true);
    }
  }, [players, gameStarted]);

  const startTimer = useCallback(() => {
    setGameStarted(true);
    intervalRef.current = setInterval(() => {
      setTimeCount((prevTimeCount) => prevTimeCount + 1);
    }, 1000);
  }, []);

  const handleCardClick = useCallback(
    (card: CardType) => {
      if (isCheckingForMatch || card.isMatched || card.isFlipped) {
        return;
      }
      flipCard(card.id);

      if (players === 1 && !gameStarted) {
        startTimer();
      }
    },
    [gameStarted, isCheckingForMatch, players]
  );

  const checkForMatch = useCallback(() => {
    const [firstIndex, secondIndex] = flippedCards;

    if (cards[firstIndex].content === cards[secondIndex].content) {
      setMatchedCards((prev) => new Set([...prev, firstIndex, secondIndex]));
      setLatestMatchedCards([firstIndex, secondIndex]);

      if (players > 1) {
        setMatchedPairs((prevMatchedPairs) => {
          const updatedMatchedPairs = [...prevMatchedPairs];
          updatedMatchedPairs[currentPlayer - 1] += 1;
          return updatedMatchedPairs;
        });
      }
    } else {
      // Not a match, flip the cards back after a short delay
      setTimeout(() => {
        // Reset the cards' flipped state
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            flippedCards.includes(index) ? { ...card, isFlipped: false } : card
          )
        );
      }, 400);
    }

    setTimeout(() => {
      // Action count is relevant only in single-player mode
      if (players === 1) {
        setActionCount((prevActionCount) => prevActionCount + 1);
      }

      // Transition to the next player's turn in multiplayer mode
      if (players > 1) {
        const nextPlayer = (currentPlayer % players) + 1;
        setCurrentPlayer(nextPlayer);
      }

      // Reset logic after either match checking
      setFlippedCard([]);
      setIsCheckingForMatch(false);
    }, 400);
  }, [flippedCards, currentPlayer, players, cards]);

  useEffect(() => {
    // If two cards are flipped, initiate the match checking process
    if (flippedCards.length === 2) {
      setIsCheckingForMatch(true);
      checkForMatch();
    }
  }, [flippedCards, checkForMatch]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const restartGame = useCallback(() => {
    const initializedCards = initializeCards(theme);
    setCards(initializedCards);
    setLatestMatchedCards([]);
    setFlippedCard([]);
    setMatchedCards(new Set());
    setActionCount(0);
    setTimeCount(0);
    setGameStarted(false);
    setShowResultModal(false);
    stopTimer();
    setMatchedPairs(Array(players).fill(0));
  }, [initializeCards, theme, stopTimer, players]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  useEffect(() => {
    console.log(
      `Game Started: ${gameStarted}, Matched Cards: ${matchedCards.size}, Total Cards: ${cards.length}, Players: ${players}`
    );
    if (gameStarted && matchedCards.size === cards.length) {
      console.log("All cards matched in multiplayer, showing results...");
      setShowResultModal(true);
      if (players === 1) {
        stopTimer();
      }
    }
  }, [matchedCards, cards.length, gameStarted, players]);

  const getPlayerResults = () => {
    return Array.from({ length: players }, (v, i) => {
      return { playerNum: i + 1, matchedPairs: matchedPairs[i] };
    });
  };

  const newGame = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col bg-grey-white min-h-screen px-16 py-8 items-center">
      <div className="flex flex-row w-full flex-1 justify-between items-center">
        <h1 className="font-semibold text-3xl text-dark-cyan2">memory</h1>
        <div className="flex flex-row gap-3 items-center justify-center">
          <div className="w-28">
            <Button onClick={restartGame} color="yellow">
              Restart
            </Button>
          </div>
          <div className="w-36">
            <Button onClick={newGame} color="grey">
              New Game
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`grid ${
          gridSize === "4x4" ? "grid-cols-4 gap-4" : "grid-cols-6 gap-3 "
        } justify-center md:my-10`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            flipped={card.isFlipped}
            latestMatchedCards={latestMatchedCards}
            content={card.content}
            id={card.id}
            onClick={() => handleCardClick(card)}
            theme={theme}
            gridSize={gridSize}
          />
        ))}
      </div>
      <div>
        {players === 1 && (
          <Counter timeCount={timeCount} actionCount={actionCount} />
        )}
      </div>
      {players > 1 && (
        <div className="flex flex-row gap-4 items-center justify-center mt-10">
          {playerNumbers.slice(0, players).map((playerNum) => (
            <PlayerBar
              key={playerNum}
              playerNum={playerNum}
              matchedPairs={matchedPairs[playerNum - 1] || 0}
              isCurrentPlayer={currentPlayer === playerNum}
            />
          ))}
        </div>
      )}
      <div>
        <ResultModal
          isOpen={showResultModal}
          timeCount={timeCount}
          actionCount={actionCount}
          restart={restartGame}
          newGame={newGame}
          multiplayer={isMultiplayer}
          playerResults={getPlayerResults()}
        />
      </div>
    </div>
  );
}
