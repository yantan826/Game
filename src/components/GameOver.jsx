import { useSelector, useDispatch } from "react-redux";
import {
  selectHighScores,
  updateHighestScorePersonDetails,
} from "../slices/scoreSlice";
import { useEffect } from "react";
import victory from "/sounds/victory.wav";
import fail from "/sounds/gameover.wav";
import Confetti from "react-confetti";

const playVictorySound = () => {
  const sound = new Audio(victory);
  sound.play();
};

const playFailSound = () => {
  const sound = new Audio(fail);
  sound.play();
};

const GameOver = ({ points, setIsHighestScore }) => {
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const highScores = useSelector(selectHighScores);
  const isHighScore = highScores.some((score) => points > score.score);
  const isHighestScore = highScores[0].score == points;

  const onSubmitHighScore = (name) => {
    dispatch(updateHighestScorePersonDetails({ name: name, score: points }));
  };

  useEffect(() => {
    if (isHighestScore || isHighScore) {
      setIsHighestScore(true);
      playVictorySound();
    } else {
      playFailSound();
    }
  }, [isHighestScore, isHighScore, setIsHighestScore]);

  return (
    <div className="game-over-screen">
      {isHighScore ? <h1>Congratulation !!! </h1> : <h1>Game Over</h1>}
      {isHighScore && !isHighestScore && (
        <>
          <p>You made it to the high score list!</p>
        </>
      )}
      {isHighestScore && (
        <>
          <p>Congratulations! You have the highest score!</p>
          <Confetti width={width} height={height} />
        </>
      )}

      <p>Your score: {points}</p>
      <button onClick={() => window.location.reload()}>Restart</button>
      {/* please your details input */}
      {isHighestScore && (
        <>
          <p className="mt-10"> Please leave your details:</p>
          <form onSubmit={onSubmitHighScore}>
            <input
              type="text"
              name="details"
              placeholder="Name/Class/Phone"
              className="p-3 border-2 border-black rounded-lg text-black bg-slate-100"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default GameOver;
