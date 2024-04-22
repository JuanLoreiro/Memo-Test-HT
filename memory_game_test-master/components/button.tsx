import React, { useState } from 'react';

type ButtonProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  color?: "yellow" | "grey" | "default";
};

const Button = ({
  active,
  children,
  onClick,
  color = "default",
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const getButtonClassNames = () => {
    let baseClasses = "flex-1 text-lg font-bold py-2 px-4 rounded-full w-full ";
    let colorClasses = "";

    switch (color) {
      case "yellow":
        colorClasses = "bg-accent-yellow hover:bg-accent-yellow-light ";
        break;
      case "grey":
        colorClasses = "bg-grey3 text-dark-cyan hover:bg-cyan-blue ";
        break;
      default:
        colorClasses = `${active || isPressed ? "bg-dark-cyan" : "bg-grey1 "} ${
          !active && !isPressed ? "hover:bg-cyan-blue2" : ""
        } `;
        break;
    }

    return baseClasses + colorClasses;
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={getButtonClassNames()}
    >
      {children}
    </button>
  );
};

export default Button;
