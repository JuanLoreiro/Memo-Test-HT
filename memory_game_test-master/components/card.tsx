import React, { useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CardProps = {
  flipped: boolean;
  content: IconProp | number;
  latestMatchedCards: number[];
  onClick: () => void;
  theme: string;
  id: number;
  gridSize: string;
};

const Card = ({
  flipped,
  theme,
  content,
  onClick,
  latestMatchedCards,
  id,
  gridSize,
}: CardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const isLatestMatched = latestMatchedCards.includes(id);

  const cardSizeClass =
    gridSize === "4x4"
      ? "md:w-[110px] md:h-[110px] sm:w-[75px] sm:h-[75px] 2xl:w-[130px] 2xl:h-[130px] min-h-[75px] min-w-[75px]"
      : "md:w-20 md:h-20 sm:w-16 sm:h-16 2xl:w-24 2xl:h-24 min-w-16 min-h-16";

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const renderCardContent = () => {
    let cardBaseClasses = `flex items-center justify-center rounded-full text-5xl font-bold ${cardSizeClass}`;

    if (flipped || isLatestMatched) {
      cardBaseClasses += isLatestMatched ? " bg-accent-yellow" : " bg-grey1";
    } else {
      cardBaseClasses += " bg-dark-cyan hover:bg-cyan-blue";
    }

    if (flipped || isLatestMatched) {
      // If the card is flipped or matched, show its content
      return theme === "numbers" ? (
        <div className={cardBaseClasses}>{Number(content)}</div>
      ) : (
        <div className={cardBaseClasses}>
          <FontAwesomeIcon icon={content as IconProp} />
        </div>
      );
    } else {
      // If the card is not active, show the back of the card
      return <div className={cardBaseClasses}></div>;
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`card ${flipped ? "flipped" : ""} ${
        isPressed ? "pressed" : ""
      } ${cardSizeClass}`}
    >
      {renderCardContent()}
    </button>
  );
};

export default Card;
