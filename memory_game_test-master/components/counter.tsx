import React from 'react';

const Counter = ({ timeCount, actionCount }) => {
  const minutes = Math.floor(timeCount / 60);
  const seconds = timeCount % 60;

  // Format time string to display leading zero for seconds when needed
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div className="flex flex-row gap-5 items-center justify-center mt-10">
      <div className="flex flex-row justify-between items-center px-6 py-3 bg-grey3 rounded-lg w-52">
        <p className="text-cyan-blue font-bold text-lg mr-15">Time</p>
        <p className="text-dark-cyan text-3xl font-bold">{formattedTime}</p>
      </div>
      <div className="flex flex-row justify-between items-center px-6 py-3 bg-grey3 rounded-lg w-52">
        <p className="text-cyan-blue font-bold text-lg mr-15">Moves</p>
        <p className="text-dark-cyan text-3xl font-bold">{actionCount}</p>
      </div>
    </div>
  );
};

export default Counter;
