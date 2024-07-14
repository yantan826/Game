import React, { useEffect, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
const HighScoreCounter = ({points, setPoints,name}) => {

  useEffect(() => {
    if (!name) return; // Stop if no name

    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints -193);
    }, 300);
    return () => clearInterval(interval);
  }
  , [name,setPoints]);

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