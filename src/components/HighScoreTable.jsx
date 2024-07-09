import { useSelector, useDispatch } from "react-redux";
import { selectHighScores } from "../slices/scoreSlice";
import { useEffect, useState } from "react";

const HighScoreTable = () => {
  const highScores = useSelector(selectHighScores);
  const [sortedScores, setSortedScores] = useState([]);
  useEffect(() => {
    const sorted = [...highScores].sort((a, b) => b.score - a.score);
    setSortedScores(sorted);
  }, [highScores]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-3 m-3 opacity-50 rounded-lg">
      <h2 className="text-4xl  font-bold">High Scores</h2>
      <div className="flex flex-col items-center">
        {sortedScores.map((score, index) => (
          <div
            key={index}
            className="flex justify-between w-96 p-2  bg-gray-800 rounded-lg"
          >
            <p className="">{score.name}</p>
            <p className="">{score.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighScoreTable;