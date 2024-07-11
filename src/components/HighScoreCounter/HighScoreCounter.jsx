import React, { useEffect, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import'./HighScoreCounter.css';

const HighScoreCounter = ({points, setPoints,name}) => {
  const [countdown, setCountdown] = useState(0);

  const playCountdownSound = () => {
    const audio = new Audio('/public/sounds/countdown.wav');
    audio.play();
  }

  useEffect(() => {
    if (!name) return;

    setCountdown(3);
    playCountdownSound();
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [name]);

  useEffect(() => {
    if (countdown !== null) return;

    const pointsInterval = setInterval(() => {
      setPoints((prevPoints) => prevPoints - 15);
    }, 100);

    return () => clearInterval(pointsInterval);
  }, [countdown, setPoints]);

  if (countdown > 0) {
    return <div className="countdown text-white">  {countdown}</div>;
  }


  return (
    <div>
      <AnimatedCounter value={points} color="black" 
      includeCommas={true}
      includeDecimals={false}
      digitStyles={{
        color: 'white',
        fontFamily: '"Press Start 2P", cursive', // Arcade-style font
      }}
      containerStyles={{  
        width: '200px',
        backgroundColor: 'black',
        borderRadius: '0 10px 10px 0', // Border radius on the right side only
      }}
      fontSize="30px" />
    </div>
  );
};

export default HighScoreCounter;