import { useSelector } from "react-redux";
import { selectHighScores } from "../slices/scoreSlice";
import { useEffect } from "react";

const GameOver = ({ points,setIsHighestScore }) => {
  const highScores = useSelector(selectHighScores);
  const isHighScore = highScores.some((score) => points > score.score);
  const isHighestScore = highScores[0].score < points;

  useEffect(() => {
    if(isHighestScore || isHighScore){
      setIsHighestScore(true);
    }
  }, [isHighestScore, setIsHighestScore]);

  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      {isHighScore && !isHighestScore && (
        <p>You made it to the high score list!</p>
      )}
      {isHighestScore && <p>Congratulations! You have the highest score!</p>}

      <p>Your score: {points}</p>
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
};

export default GameOver;
