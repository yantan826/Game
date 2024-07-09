import React, { useEffect, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import { useSelector, useDispatch  } from 'react-redux'; // Import useSelector

import { selectScore ,updateScore } from '../slices/scoreSlice';
const HighScoreCounter = () => {
  const newScore = useSelector(selectScore); // Use useSelector to call selectScore
  const dispatch = useDispatch(); // Use useDispatch to call updateScore
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateScore(newScore -9));
    }, 100);
    return () => clearInterval(interval);
  }
  , [newScore]);

  return (
    <div>
      <AnimatedCounter value={newScore} color="black" 
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