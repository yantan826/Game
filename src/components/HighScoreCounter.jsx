import React, { useEffect, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';

const HighScoreCounter = () => {
  const [counterValue, setCounterValue] = useState(10000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterValue((prevValue) => prevValue - 12);
    }, 100); // Increase by 100 every 1000 milliseconds (1 second)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <AnimatedCounter value={counterValue} color="black" fontSize="40px" />
    </div>
  );
};

export default HighScoreCounter;