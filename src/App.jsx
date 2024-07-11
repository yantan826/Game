import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Preview } from "react-dnd-preview";
import DraggableItem from "./components/DraggableItem/DraggableItem";
import DroppableBox from "./components/DroppableBox";
import { useState,useEffect } from "react";
import foodList from "./components/constant";
import Pyramid from "./components/Pyramid/Pyramid";
import HighScoreCounter from "./components/HighScoreCounter/HighScoreCounter";
import PlayerModal from "./components/PlayerModal";
import { isMobile } from "react-device-detect";
import HighScoreTable from "./components/HighScoreTable";
import { useDispatch } from "react-redux";
import { addHighScore } from "./slices/scoreSlice";
import "./App.css";

const gameOverSound = new Audio("/sounds/gameover.wav");
export default function App() {
  const dispatch = useDispatch();
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(100000);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const backend = isMobile ? TouchBackend : HTML5Backend;

  const handleNewPlayer = () => {
    setPoints(100000);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleSubmit = (name) => {
    console.log(name);
    setName(name.toUpperCase());
    setModalOpen(false);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  useEffect(() => {
    if (gameOver) {
      dispatch(addHighScore({ name, score: points }));
      gameOverSound.play();
    }
    if (!name){
      setModalOpen(true);
    }
  
  }, [gameOver, points, name, dispatch]);

  const [items, setItems] = useState(
    foodList.map((image, index) => ({
      id: `item${index + 1}`,
      x: Math.random() * (screenWidth / 2),
      y: Math.random() * screenHeight * 0.6,
      img: image.src,
      category: image.category,
    }))
  );

  const updateItemPosition = (id, x, y) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const generatePreview = ({ itemType, item, style }) => {
    return (
      <div style={{ ...style, height: "80px", width: "80px" }}>
        <img
          src={item.img}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Game Over</h1>
        <p>Your score: {points}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  return (
    <DndProvider backend={backend} options={{ enableMouseEvents: true }}>
      <div className="h-screen w-screen flex bg-black flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold p-4 title">Food Pyramid Game</h1>
          {/* new player */}
          <div className="flex justify-end me-3  ">
            <button className="new-player-btn" onClick={handleNewPlayer}>
              <span className="arrow mt-[-8px] me-3">→</span> New Player
            </button>
            <PlayerModal
              isOpen={modalOpen}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className="flex rounded-b-lg bg-black justify-between px-4">
          <p className="bg-black  px-6 pb-3 title"> Player : {name}</p>
          <div className="flex">
            <p className="bg-black  px-6 title"> Score : </p>
            <HighScoreCounter points={points} setPoints={setPoints} name={name}/>
          </div>
        </div>
        <div className="relative w-full bg-gray-100 flex-row-reverse flex flex-grow">
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              x={item.x}
              y={item.y}
              img={item.img}
              category={item.category}
            />
          ))}
          <div className="absolute left-0 bottom-0 table">
            <HighScoreTable />
          </div>
          <div className="h-full p-8 flex w-1/2 flex-col relative">
            <h1 className="text-2xl font-bold mb-4 mt-[-30px] text-center w-full">
              Food Pyramid
            </h1>
            <div className="flex-grow h-full w-full flex ">
              <Pyramid
                updateItemPosition={updateItemPosition}
                setPoints={setPoints}
                points={points}
                onGameOver={handleGameOver}

              />
            </div>
          </div>
          {/* <div className="flex flex-col">
            {foodCategory.map((category) => (
              <DroppableBox
                key={category}
                updateItemPosition={updateItemPosition}
                boxName={category}
                setPoints={setPoints}
              />
            ))}
          </div> */}
          <Preview generator={generatePreview} />
        </div>
      </div>
    </DndProvider>
  );
}
